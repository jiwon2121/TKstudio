### KAKAO 로그인

![kakaologin_sequence](/uploads/4bcd41d4046141add0adf996d3e0f139/kakaologin_sequence.png)

### MySQL 한글 설정

- C:\ProgramData\MySQL\MySQL Server 5.7\my.ini 에 아래 코드 추가

```text
[client]
default-character-set=utf8

[mysqld]
character-set-client-handshake = FALSE
init_connect="SET collation_connection = utf8_general_ci"
init_connect="SET NAMES utf8"
character-set-server = utf8

[mysql]
default-character-set=utf8

[mysqldump]
default-character-set = utf8
```

### 로그인 flow

![login_flow](/uploads/43e424386cff33cdace146c760a80e51/image.png)

1. 카카오 로그인을 통해서 회원가입 및 로그인 처리
2. 로그인 후 JWT 토큰 발행
3. 이후 요청에서 JWT 토큰 유효성 검증
4. Access 토큰이 유효한데 Refresh 토큰으로 요청 시 예외처리

### 배포 절차

- Redis 설치

```shell
docker network create redis-net

docker pull redis

docker run --name redis-server -p 6379:6379 --network redis-net -d redis redis-server --appendonly yes --requirepass a101rds

docker run -it --network redis-net --rm redis redis-cli -h redis-server

# 레디스 접속
docker exec -it redis-server redis-cli -a "a101rds"
```

- MariaDB 설치

```shell
sudo docker pull mariadb:latest

docker run -d --restart always -p 3306:3306 -e MYSQL_ROOT_PASSWORD=a101mdb -e TZ=Asia/Seoul -v /var/lib/mysql:/var/lib/mysql --name mariadb mariadb

# MariaDB 접속
docker exec -it mariadb bin/bash
```

- 자바 환경변수 설정

```shell
vi /etc/profile

# 가장 아래 쪽에 해당 내용 추가
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=$JAVA_HOME/jre/lib:$JAVA_HOME/lib/tools.jar

# 변경내용 적용하기
source /etc/profile
```

- 도커 환경변수 설정하기

```shell
vi .env

# 아래 내용 작성
KAKAO_CLIENT_ID=2c2312493369c3c1b5937c1528806eb9
KAKAO_CLINET_SECRET=gnKAC2CPk1oImOKq4dJptGsgukJYfaMZ
KAKAO_REDIRECT_URI=http://localhost:3000/api/v1/user/login/kakao

MYSQL_URL=jdbc:mysql://j10a101.p.ssafy.io:3306/gallery
MYSQL_USERNAME=root
MYSQL_PASSWORD=1234

REDIS_HOST=j10a101.p.ssafy.io
REDIS_PORT=6379
```

```shell
# 기존 이미지 삭제
docker rmi -f {이미지 ID}

# 프로젝트 빌드
chmod +x ./gradlew
./gradlew wrapper --gradle-version=8.5 --distribution-type=bin
./gradlew clean bootJar

# 프로젝트 이미지 생성
docker build -t gallery:latest .

# 프로젝트 이미지 실행
docker run -i -t -p 8081:8081 --env-file .env -d --name gallery -e TZ=Asia/Seoul gallery:latest

# 도커 컨테이너 삭제
docker rm $(docker ps -a -q --filter "ancestor=이미지이름")

```

- Nginx 설정 파일
```shell
sudo vim /etc/nginx/sites-available/service.conf

# 아래 내용 작성
server {
  listen 80;
  server_name j10a101;

  location /api/v1 {
    proxy_pass http://j10a101.p.ssafy.io:8081;
  }

  location / {
    proxy_pass http://j10a101.p.ssafy.io:3000;
  }
}

# service.conf를 적용하기 위해선 default를 먼저 지워야함
sudo ln -s /etc/nginx/sites-available/service.conf /etc/nginx/sites-enabled/service.conf

sudo service nginx reload
```

- Nginx로 https 적용하기 (webroot 방식)
```shell
sudo vim /etc/nginx/sites-available/service.conf

# 아래 내용 추가
location ^~ /.well-known/acme-challenge/ {
  default_type "text/plain";
  root /var/www/letsencrypt;
}

# 폴더 생성
sudo mkdir -p /var/www/letsencrypt
cd /var/www/letsencrypt
sudo mkdir -p .well-known/acme-challenge

# 인증서 발급
sudo certbot certonly --webroot
# 도메인과 root(/var/www/letsencrypt)를 입력해준다

# conf 파일을 다시 수정해준다
sudo vim /etc/nginx/sites-available/service.conf

server {
  listen 80;
  return 301 https://$host$request_uri;
}

server{
  listen 443;
  server_name j10a101;

  ssl on;
  ssl_certificate /etc/letsencrypt/live/j10a101.p.ssafy.io/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/j10a101.p.ssafy.io/privkey.pem;

  location /api/v1 {
    proxy_pass http://j10a101.p.ssafy.io:8081;
  }

  location / {
    proxy_pass http://j10a101.p.ssafy.io:3000;
  }

  location ^~ /.well-known/acme-challenge/ {
    default_type "text/plain";
    root /var/www/letsencrypt;
  }
}
```

- 카카오 결제 흐름
```text
1. Front에서 Back으로 결제요청(POST)
2. Back에서 Kakao로 결제준비(POST) 요청 -> Response에 url 있음
3. 2에서 받은 url을 Front로 return -> Front는 페이지 redirect
4. redirect된 페이지에서 결제를 완료하면 Back으로 정보가 return 된다.
5. Back에서 Kakao로 결제승인(POST) 요청 -> 성공, 실패 Response
6. 성공 시 DB에 기록하고 Front로 return
```

- 옵션 스토어 SQL 쿼리
```sql
INSERT INTO option_store (option_id, category_id, cost, option_name, options3url, created_time, gender)
VALUES
    (1, 1, 20000, '기본', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/0_original.jpg', now(), 'FEMALE'),
    (2, 1, 20000, '트위드 블랙', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/1_tweed_black.jpg', now(), 'FEMALE'),
    (3, 1, 20000, '러스티 블랙', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/2_rusty_black.jpg', now(), 'FEMALE'),
    (4, 1, 20000, '블랙 스네이크', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/3_black_snake.jpg', now(), 'FEMALE'),
    (5, 1, 20000, '네이비 골지자켓', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/4_Ribbed_navy.jpg', now(), 'FEMALE'),
    (6, 1, 20000, '퍼시픽 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/5_pacific_navy.jpg', now(), 'FEMALE'),
    (7, 1, 20000, '깔끔 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/6_neat_navy.jpg', now(), 'FEMALE'),
    (8, 1, 20000, '네이비 코트', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/7_navy_coat.jpg', now(), 'FEMALE'),
    (9, 1, 20000, '네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/8_navy.jpg', now(), 'FEMALE'),
    (10, 1, 20000, '그랭구아르', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/9_gringoire.jpg', now(), 'FEMALE'),
    (11, 1, 20000, '다크 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/10_dark_navy.jpg', now(), 'FEMALE'),
    (12, 1, 20000, '네이비 코듀로이', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/11_corduroy_navy.jpg', now(), 'FEMALE'),
    (13, 1, 20000, '브러쉬드 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/12_brushed_navy.jpg', now(), 'FEMALE'),
    (14, 1, 20000, '수직 스트라이프', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/13_vertical_stripe.jpg', now(), 'FEMALE'),
    (15, 1, 20000, '수평 스트라이프', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/14_horizontal_stripe.jpg', now(), 'FEMALE'),
    (16, 1, 20000, '봄버 재킷', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/15_bomber_jacket.jpg', now(), 'FEMALE'),
    (17, 1, 20000, '버건디', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/16_burgundy.jpg', now(), 'FEMALE'),
    (18, 1, 20000, '데님 재킷', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/17_denim_jaacket.jpg', now(), 'FEMALE'),
    (19, 1, 20000, '레더 재킷', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/18_leather_jacket.jpg', now(), 'FEMALE'),
    (20, 1, 20000, '트로트 블루', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/female/19_trot_blue.jpg', now(), 'FEMALE'),

    (21, 1, 20000, '기본', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/20_original.jpg', now(), 'MALE'),
    (22, 1, 20000, '웜 차콜', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/21_warm_charcoal.jpg', now(), 'MALE'),
    (23, 1, 20000, '이브의 유혹', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/22_temptation_of_eve.jpg', now(), 'MALE'),
    (24, 1, 20000, '미디엄 그레이', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/23_medium_grey.jpg', now(), 'MALE'),
    (25, 1, 20000, '은갈치', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/24_eungalichi.jpg', now(), 'MALE'),
    (26, 1, 20000, '아수라 그레이', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/25_asura_grey.jpg', now(), 'MALE'),
    (27, 1, 20000, '포인트 블루', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/26_blue_point.jpg', now(), 'MALE'),
    (28, 1, 20000, '차콜 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/27_charcoal_navy.jpg', now(), 'MALE'),
    (29, 1, 20000, '브라이트 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/28_bright_navy.jpg', now(), 'MALE'),
    (30, 1, 20000, '나이브 블루', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/29_naive_blue.jpg', now(), 'MALE'),
    (31, 1, 20000, '블루 체크', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/30_blue_check.jpg', now(), 'MALE'),
    (32, 1, 20000, '네이비 체크', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/31_navy_check.jpg', now(), 'MALE'),
    (33, 1, 20000, '앤티크 네이비', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/32_antique_navy.jpg', now(), 'MALE'),
    (34, 1, 20000, '딥 브라운', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/33_deep_brown.jpg', now(), 'MALE'),
    (35, 1, 20000, '버건디', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/34_burgundy.jpg', now(), 'MALE'),
    (36, 1, 20000, '다크 베이지', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/35_dark_beige.jpg', now(), 'MALE'),
    (37, 1, 20000, '리치 브라운', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/36_rich_brown.jpg', now(), 'MALE'),
    (38, 1, 20000, '브라운 체크', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/37_brown_check.jpg', now(), 'MALE'),
    (39, 1, 20000, '꽃을 단 남자', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/38_flower_point.jpg', now(), 'MALE'),
    (40, 1, 20000, '체크 후리스', 'https://ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com/options/male/39_check_fleece.jpg', now(), 'MALE');
```

- 옵션 카테고리 SQL 쿼리
```sql
INSERT INTO option_category (category_id, category_name)
VALUES
    (1, '정장'),
    (2, '배경')
```

- Redis에 캐싱된 키 지우기
```redis
EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 option*
```