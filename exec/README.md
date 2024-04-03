### Redis에 캐싱된 키 지우기

```redis
EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 option*
```

### 옵션 스토어 SQL

```sql
INSERT INTO option_store (option_id, cost, option_name, options3url, created_time, gender)
VALUES (1, 20000, '기본', 'options/female/0_original.jpg', now(), 'FEMALE'),
       (2, 500, '트위드 블랙', 'options/female/1_tweed_black.jpg', now(), 'FEMALE'),
       (3, 500, '러스티 블랙', 'options/female/2_rusty_black.jpg', now(), 'FEMALE'),
       (4, 500, '블랙 스네이크', 'options/female/3_black_snake.jpg', now(), 'FEMALE'),
       (5, 500, '네이비 골지자켓', 'options/female/4_Ribbed_navy.jpg', now(), 'FEMALE'),
       (6, 5000, '퍼시픽 네이비', 'options/female/5_pacific_navy.jpg', now(), 'FEMALE'),
       (7, 5000, '깔끔 네이비', 'options/female/6_neat_navy.jpg', now(), 'FEMALE'),
       (8, 5000, '네이비 코트', 'options/female/7_navy_coat.jpg', now(), 'FEMALE'),
       (9, 500, '네이비', 'options/female/8_navy.jpg', now(), 'FEMALE'),
       (10, 500, '그랭구아르', 'options/female/9_gringoire.jpg', now(), 'FEMALE'),
       (11, 5000, '다크 네이비', 'options/female/10_dark_navy.jpg', now(), 'FEMALE'),
       (12, 5000, '네이비 코듀로이', 'options/female/11_corduroy_navy.jpg', now(), 'FEMALE'),
       (13, 5000, '브러쉬드 네이비', 'options/female/12_brushed_navy.jpg', now(), 'FEMALE'),
       (14, 10000, '수직 스트라이프', 'options/female/13_vertical_stripe.jpg', now(), 'FEMALE'),
       (15, 10000, '수평 스트라이프', 'options/female/14_horizontal_stripe.jpg', now(), 'FEMALE'),
       (16, 50000, '봄버 재킷', 'options/female/15_bomber_jacket.jpg', now(), 'FEMALE'),
       (17, 777000, '버건디', 'options/female/16_burgundy.jpg', now(), 'FEMALE'),
       (18, 20000, '데님 재킷', 'options/female/17_denim_jaacket.jpg', now(), 'FEMALE'),
       (19, 50000, '레더 재킷', 'options/female/18_leather_jacket.jpg', now(), 'FEMALE'),
       (20, 123000, '트로트 블루', 'options/female/19_trot_blue.jpg', now(), 'FEMALE'),

       (21, 20000, '기본', 'options/male/20_original.jpg', now(), 'MALE'),
       (22, 500, '웜 차콜', 'options/male/21_warm_charcoal.jpg', now(), 'MALE'),
       (23, 500, '이브의 유혹', 'options/male/22_temptation_of_eve.jpg', now(), 'MALE'),
       (24, 500, '미디엄 그레이', 'options/male/23_medium_grey.jpg', now(), 'MALE'),
       (25, 5000, '은갈치', 'options/male/24_eungalichi.jpg', now(), 'MALE'),
       (26, 500, '아수라 그레이', 'options/male/25_asura_grey.jpg', now(), 'MALE'),
       (27, 500, '포인트 블루', 'options/male/26_blue_point.jpg', now(), 'MALE'),
       (28, 500, '차콜 네이비', 'options/male/27_charcoal_navy.jpg', now(), 'MALE'),
       (29, 500, '브라이트 네이비', 'options/male/28_bright_navy.jpg', now(), 'MALE'),
       (30, 5000, '나이브 블루', 'options/male/29_naive_blue.jpg', now(), 'MALE'),
       (31, 5000, '블루 체크', 'options/male/30_blue_check.jpg', now(), 'MALE'),
       (32, 5000, '네이비 체크', 'options/male/31_navy_check.jpg', now(), 'MALE'),
       (33, 5000, '앤티크 네이비', 'options/male/32_antique_navy.jpg', now(), 'MALE'),
       (34, 5000, '딥 브라운', 'options/male/33_deep_brown.jpg', now(), 'MALE'),
       (35, 50000, '버건디', 'options/male/34_burgundy.jpg', now(), 'MALE'),
       (36, 50000, '다크 베이지', 'options/male/35_dark_beige.jpg', now(), 'MALE'),
       (37, 678000, '리치 브라운', 'options/male/36_rich_brown.jpg', now(), 'MALE'),
       (38, 50000, '브라운 체크', 'options/male/37_brown_check.jpg', now(), 'MALE'),
       (39, 222000, '꽃을 단 남자', 'options/male/38_flower_point.jpg', now(), 'MALE'),
       (40, 50000, '체크 후리스', 'options/male/39_check_fleece.jpg', now(), 'MALE');
```

### 환경변수

- 프론트엔드 환경변수

```shell
# ~/env/fronted/.env
NEXT_PUBLIC_BACK_URL=

NEXT_PUBLIC_KAKAO_REST_KEY=
NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI=

NEXT_PUBLIC_NAVER_CLIENT_ID=
NEXT_PUBLIC_NAVER_REDIRECT_URI=
NEXT_PUBLIC_NAVER_STATE=

NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=
```

- 백엔드 환경변수

```shell
# ~/env/backend/.env
KAKAO_CLIENT_ID=
KAKAO_CLINET_SECRET=
KAKAO_REDIRECT_URI=

NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
NAVER_REDIRECT_URI=
NAVER_STATE=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

KAKAOPAY_SECRET_KEY=

AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
AWS_S3_BUCKET=

MYSQL_URL=
MYSQL_USERNAME=
MYSQL_PASSWORD=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=

AI_URL=
```

- AI 환경변수

```shell
# ~/env/AI/.env
PORT_NUM=

BUCKET_NAME=
REGION_NAME=
S3_ACCESS_KEY=
S3_SECRET_ACCESS_KEY=
```

### 젠킨스 파이프라인

- 프론트엔드

```shell
pipeline {
    agent any
    
    stages {
        stage('start') {
            steps{
                mattermostSend channel: 'A101-ALERT', endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', message: ':toshim_hi_bounce: Frontend Release Start :toshim_hi_bounce:'
            }
        }
        
        stage('git clone') {
            steps {
                git branch: 'FE/dev', credentialsId: 'gardengo', url: 'https://lab.ssafy.com/s10-ai-image-sub2/S10P22A101.git'
            }
        }
        
        stage('create env') {
            steps {
                sh'''
                    cp /home/ubuntu/env/frontend/.env /var/lib/jenkins/workspace/FrontendPipeline/frontend
                '''
            }
        }
        
        stage('stop & rm container') {
            steps {
                dir('frontend'){
                    sh'''
                        # 컨테이너가 실행 중인지 확인
                        if docker ps -a --filter "name=gallery-frontend" --format '{{.Names}}' 2>/dev/null | grep -q gallery-frontend; then
                            echo "컨테이너 'gallery-frontend'가 실행 중입니다."
                            docker stop gallery-frontend
                            docker rm gallery-frontend
                        else
                            echo "컨테이너 'gallery-frontend'가 실행 중이 아닙니다."
                        fi
                        
                        # 이미지가 존재하는지 확인
                        if docker images -a --format '{{.Repository}}:{{.Tag}}' | grep -q gallery-frontend; then
                            echo "이미지 'gallery-frontend'가 존재합니다."
                            docker rmi gallery-frontend
                        else
                            echo "이미지 'gallery-frontend'가 존재하지 않습니다."
                        fi
                    '''
                }
            }
        }
        
        stage('deploy') {
            steps {
                dir('frontend'){
                    sh'''
                        docker build -t gallery-frontend:latest .
                        docker run -i -t -p 3000:3000 --env-file .env -d --name gallery-frontend -e TZ=Asia/Seoul gallery-frontend:latest
                    '''
                }
            }
        }
    }
    
    post {
        success {
        	script {
                mattermostSend (color: 'good', 
                message: ":toshim_thumb_zoom-close: Frontend Realease Complete :toshim_thumb_zoom-close:", 
                endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', 
                channel: 'A101-ALERT'
                )
            }
        }
        failure {
        	script {
                mattermostSend (color: 'danger', 
                message: ":toshim_where_zoom-close: Frontend Realease Fail :toshim_where_zoom-close:", 
                endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', 
                channel: 'A101-ALERT'
                )
            }
        }
    }
}
```

- 백엔드

```shell
pipeline {
    agent any

    stages {
        stage('start') {
            steps{
                mattermostSend channel: 'A101-ALERT', endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', message: ':hi_manggom: Backend Release Start :hi_manggom:'
            }
        }
        
        stage('git clone') {
            steps {
                git branch: 'BE/dev', credentialsId: 'gardengo', url: 'https://lab.ssafy.com/s10-ai-image-sub2/S10P22A101.git'
            }
        }
        
        stage('create env') {
            steps {
                sh'''
                    cp /home/ubuntu/env/backend/.env /var/lib/jenkins/workspace/BackendPipeline/backend
                '''
            }
        }
        
        stage('build') {
            steps {
                dir('backend'){
                    sh'''
                        chmod +x ./gradlew
                        ./gradlew wrapper --gradle-version=7.5 --distribution-type=bin
                        ./gradlew clean bootJar
                    '''
                }
            }
        }
        
        stage('stop & rm container') {
            steps {
                dir('backend'){
                    sh'''
                        # 컨테이너가 실행 중인지 확인
                        if docker ps -a --filter "name=gallery-backend" --format '{{.Names}}' 2>/dev/null | grep -q gallery-backend; then
                            echo "컨테이너 'gallery-backend'가 실행 중입니다."
                            docker stop gallery-backend
                            docker rm gallery-backend
                        else
                            echo "컨테이너 'gallery-backend'가 실행 중이 아닙니다."
                        fi
                        
                        # 이미지가 존재하는지 확인
                        if docker images -a --format '{{.Repository}}:{{.Tag}}' | grep -q gallery-backend; then
                            echo "이미지 'gallery-backend'가 존재합니다."
                            docker rmi gallery-backend
                        else
                            echo "이미지 'gallery-backend'가 존재하지 않습니다."
                        fi
                    '''
                }
            }
        }
        
        stage('deploy') {
            steps {
                dir('backend'){
                    sh'''
                        docker build -t gallery-backend:latest .
                        docker run -i -t -p 8081:8081 --env-file .env -d --name gallery-backend -e TZ=Asia/Seoul gallery-backend:latest
                    '''
                }
            }
        }
    }
    
    post {
        success {
        	script {
                mattermostSend (color: 'good', 
                message: ":manggom_3: Backend Realease Complete :manggom_3:", 
                endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', 
                channel: 'A101-ALERT'
                )
            }
        }
        failure {
        	script {
                mattermostSend (color: 'danger', 
                message: ":manggom_2: Backend Realease Fail :manggom_2:", 
                endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', 
                channel: 'A101-ALERT'
                )
            }
        }
    }
}
```

- AI

```shell
pipeline {
    agent any
    
    
    stages {
        stage('start') {
            steps{
                mattermostSend channel: 'A101-ALERT', endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', message: ':potatomoong_fool_zoom-close: AI Release Start :potatomoong_fool_zoom-close:'
            }
        }
        
        stage('git clone') {
            steps {
                git branch: 'AI/dev', credentialsId: 'gardengo', url: 'https://lab.ssafy.com/s10-ai-image-sub2/S10P22A101.git'
            }
        }
        
        stage('create env') {
            steps {
                sh'''
                    cp /home/ubuntu/env/ai/.env /var/lib/jenkins/workspace/AIPipeline/ai_backend
                '''
            }
        }
        
        stage('Build') {
            steps {
                dir('ai_backend') {
                    sh 'docker build -t gallery-ai .'
                    sh 'docker save gallery-ai > image.tar'
                    archiveArtifacts artifacts: 'image.tar', fingerprint: true
                    
                }
            }
        }
        
        stage('stop & rm container') {
            steps {
                dir('ai_backend'){
                    sh'''
                        # 컨테이너가 실행 중인지 확인
                        if docker ps -a --filter "name=gallery-ai" --format '{{.Names}}' 2>/dev/null | grep -q gallery-ai; then
                            echo "컨테이너 'gallery-ai'가 실행 중입니다."
                            docker stop gallery-ai
                            docker rm gallery-ai
                        else
                            echo "컨테이너 'gallery-ai'가 실행 중이 아닙니다."
                        fi
                        
                        # 이미지가 존재하는지 확인
                        if docker images -a --format '{{.Repository}}:{{.Tag}}' | grep -q gallery-ai; then
                            echo "이미지 'gallery-ai'가 존재합니다."
                            docker rmi gallery-ai
                        else
                            echo "이미지 'gallery-ai'가 존재하지 않습니다."
                        fi
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                dir('ai_backend'){
                    sh 'docker load < image.tar'
                    sh "docker run -i -t -d -p 9090:9090 --env-file .env --name gallery-ai -e TZ=Asia/Seoul gallery-ai:latest"
                }
                    
            }
        }
    }
    post {
        success {
        	script {
                mattermostSend (color: 'good', 
                message: ":potatomoong_mygoomi_zoom-in: AI Realease Complete :potatomoong_mygoomi_zoom-in:", 
                endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', 
                channel: 'A101-ALERT'
                )
            }
        }
        failure {
        	script {
                mattermostSend (color: 'danger', 
                message: ":potatomoong_no_shake: AI Realease Fail :potatomoong_no_shake:", 
                endpoint: 'https://meeting.ssafy.com/hooks/qcocmm3rutr6mecy7tcqae6w4e', 
                channel: 'A101-ALERT'
                )
            }
        }
    }
}
```