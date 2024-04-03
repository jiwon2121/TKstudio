<div align="center" >
    <img src="./frontend/public/assets/icons/logo-big.svg" alt="logo" width="600" height="200" style="background-color: #FDFFFD" />
</div>
<div align="center">

### 내 손 안에 사진관 딸깍사진관

</div>
<div align="center">

![NGINX](https://img.shields.io/badge/NGINX-1.25.3-green)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-brightgreen)
![Ubuntu](https://img.shields.io/badge/Ubuntu-20.04.6%20LTS-orange)
![Node.js](https://img.shields.io/badge/Node.js-20.10.0%20LTS-brightgreen)
![Yarn](https://img.shields.io/badge/Yarn-4.1.1-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14.1.1-black)
![JVM](https://img.shields.io/badge/JVM-Docker%20image%20openjdk:17--slim-blue)

</div>

📢 본 프로젝트는 2024 Samsung Software Academy For Youth 10기 공통 프로젝트 일환으로 진행되었습니다.

## 개발 기간
2024.02.26 ~ 2024.04.04 (6주)

## Features

### 어플리케이션 접속 화면

![landing](./gif/랜딩페이지.gif)

- 첫 접속 화면
- 딸깍사진관을 전체적으로 소개
- 시작하기 버튼을 통해 서비스를 시작

---

![login](./gif/로그인.gif)

- 소셜 로그인을 통해 간단하게 가입, 로그인
- 소셜 로그인은 카카오, 네이버, 구글 로그인을 지원

---

![home](./gif/홈화면.gif)

- Carousel을 통해 서비스 이용 방법과 사진 촬영 팁을 알려줌

---

![create](./gif/생성.gif)

- '사진 추가' 버튼을 눌러 갤러리 또는 카메라를 이용하여 사진을 불러올 수 있음
- 옵션을 선택하여 원하는 스타일을 고를 수 있음
- '딸깍' 버튼을 클릭 시 AI 모델을 사용하여 증명 사진을 생성

---

![gallery](./gif/갤러리.gif)

- 갤러리에서는 지금까지 생성한 증명사진을 확인 가능
- 사진을 클릭하여 상세 페이지로 이동
- 상세 페이지에서는 원본 사진과 생성된 사진을 비교할 수 있음
- 다운로드 버튼으로 원하는 사이즈의 사진으로 다운로드 가능
- 공유 버튼으로 다른 어플로 공유 가능
- 삭제 버튼으로 사진 삭제 가능

---

![store](./gif/스토어.gif)

- 스토어에서 원하는 스타일의 옵션 구매 가능
- 구매는 카카오페이 API를 통해 구현
- 상단의 필터를 통해 전체 / 남성 / 여성 으로 필터링 가능
- 구매한 상품 탭에서 내가 구매한 상품을 확인

### Directory Structure
<h3> 
<details>
<summary>frontend</summary>
<div markdown="1">

```shell
📦src
├─📂@types
│  └─📂global
├─📂assets
│  ├─📂icons
│  ├─📂images
│  └─📂styles
│     └─📂font
├─📂components
│  ├─📂calendar
│  ├─📂caregiver
│  ├─📂chart
│  ├─📂common
│  ├─📂family
│  ├─📂familyHome
│  ├─📂gallery
│  ├─📂message
│  ├─📂report
│  └─📂visit
├─📂pages
│  ├─📂caregiver
│  │  └─📂CareGiverSendMessage
│  ├─📂family
│  │  └─📂FamilyProfile
│  ├─📂Login
│  └─📂SignUp
├─📂services
│  ├─📂connect
│  ├─📂gallery
│  ├─📂health
│  ├─📂message
│  ├─📂report
│  ├─📂user
│  └─📂visit
└─📂stores
```
</div>
</details>

<h3> 
<details>
<summary>backend</summary>
<div markdown="1">

```shell
📦backend
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┣ 📂logs
 ┃ ┗ 📂error
 ┗ 📂src
   ┣ 📂main
   ┃ ┣ 📂java
   ┃ ┃ ┗ 📂com
   ┃ ┃   ┗ 📂ssafy
   ┃ ┃     ┗ 📂gallery
   ┃ ┃       ┣ 📂common
   ┃ ┃       ┃ ┣ 📂exception
   ┃ ┃       ┃ ┗ 📂response
   ┃ ┃       ┣ 📂config
   ┃ ┃       ┣ 📂example
   ┃ ┃       ┃ ┣ 📂controller
   ┃ ┃       ┃ ┣ 📂model
   ┃ ┃       ┃ ┣ 📂repository
   ┃ ┃       ┃ ┗ 📂service
   ┃ ┃       ┗ 📂user
   ┃ ┃         ┣ 📂controller
   ┃ ┃         ┣ 📂model
   ┃ ┃         ┣ 📂repository
   ┃ ┃         ┗ 📂service
   ┃ ┗ 📂resources
   ┃   ┗ 📂static
   ┗ 📂test
     ┗ 📂java
       ┗ 📂com
         ┗ 📂ssafy
           ┗ 📂gallery
```

</div>
</details>

<h3> 
<details>
<summary>AI</summary>
<div markdown="1">

```shell
📦ai_backend
 ┣ 📜.gitignore
 ┣ 📜main.py
 ┗ 📜requirements.txt
```
</div>
</details>