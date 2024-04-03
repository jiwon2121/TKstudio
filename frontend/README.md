# 딸깍사진관 Frontend

## 프로젝트 소개

이 프로젝트는 Next.js를 사용한 프론트엔드 웹 애플리케이션입니다. 해당 README는 프로젝트에 대한 기본 정보와 시작 방법, 사용된 기술 스택에 관한 정보를 포함하고 있습니다.

## 요구사항

```txt
Node - 20.10.0 LTS
```

## 시작하기

### 1. yarn 설치

```bash
npm install --global yarn
```

### 2. 의존성 설치

```bash
yarn
```

### 3. 개발 서버 실행

[Port No. 3000](<(http://localhost:3000)>)

```bash
yarn dev
```

## 사용된 기술 스택

```txt
NEXT.js - 14.1.1
React - ^18.0.0
typescript - 5.2.3
yarn - 4.1.1
node - 20.10.0 LTS
next-pwa - 10.2.5
storybook - 7.6.17
styled-components - 6.1.8
```
## 디렉토리 구조
<details>
<summary>펼치기</summary>
&emsp;📦frontend<br>
&emsp; ┣ 📂.next<br>
&emsp; ┣ 📂.storybook<br>
&emsp; ┣ 📂.yarn<br>
&emsp; ┣ 📂node_modules<br>
&emsp; ┣ 📂public<br>
&emsp; ┃ ┗ 📂assets<br>
&emsp; ┃   ┣ 📂fonts<br>
&emsp; ┃   ┣ 📂icons<br>
&emsp; ┃   ┣ 📂images<br>
&emsp; ┃   ┣ 📂lottie<br>
&emsp; ┃   ┗ 📂styles<br>
&emsp; ┗ 📂src<br>
&emsp;   ┣ 📂app<br>
&emsp;   ┃ ┣ 📂(landing)<br>
&emsp;   ┃ ┃ ┣ 📂start<br>
&emsp;   ┃ ┃ ┗ 📂_components<br>
&emsp;   ┃ ┣ 📂(main)<br>
&emsp;   ┃ ┃ ┣ 📂create<br>
&emsp;   ┃ ┃ ┃ ┣ 📂result<br>
&emsp;   ┃ ┃ ┃ ┗ 📂_components<br>
&emsp;   ┃ ┃ ┣ 📂gallery<br>
&emsp;   ┃ ┃ ┃ ┣ 📂detail<br>
&emsp;   ┃ ┃ ┃ ┃ ┗ 📂[id]<br>
&emsp;   ┃ ┃ ┃ ┃  ┗ 📂[date]<br>
&emsp;   ┃ ┃ ┃ ┃    ┗ 📂[[...options]]<br>
&emsp;   ┃ ┃ ┃ ┃       ┗ 📂_components<br>
&emsp;   ┃ ┃ ┃ ┗ 📂_components<br>
&emsp;   ┃ ┃ ┣ 📂home<br>
&emsp;   ┃ ┃ ┃ ┗ 📂_component<br>
&emsp;   ┃ ┃ ┃   ┗ 📂_atom<br>
&emsp;   ┃ ┃ ┣ 📂store<br>
&emsp;   ┃ ┃ ┃ ┗ 📂_components<br>
&emsp;   ┃ ┃ ┗ 📂_components<br>
&emsp;   ┃ ┃   ┗ 📂_molecules<br>
&emsp;   ┃ ┣ 📂lib<br>
&emsp;   ┃ ┗ 📂login<br>
&emsp;   ┃   ┗ 📂[site]<br>
&emsp;   ┣ 📂components<br>
&emsp;   ┣ 📂stories<br>
&emsp;   ┣ 📂types<br>
&emsp;   ┗ 📂utils<br>
</details>

