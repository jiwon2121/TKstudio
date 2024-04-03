# 🎮 AI 서버

## 📌 AI 서버 기술스택
```
python 3.9.13
numpy 1.26.4

# gRPC
grpcio 1.62.0

# face swap
opencv-python  4.9.0.80
insightface 0.7.3

# segmentation & inpainting
diffusers 0.27.2
transformers 4.39.0
pillow 10.2.0
```
<br/>

## 🧨 기술 별 기능
### 1. 서버
- gRPC(proto): `request`와 `response`의 형식을 `proto`에 작성 => `buffer`를 build
- insightface: 두 이미지에서 얼굴을 인식 => swap

### 2. 로컬(옵션 데이터 생성)
> template이 되는 이미지의 옷만 바꾸기 위하여, segmentation, inpainting 기술 사용
- transformers(`SamModel`, `SamProcessor`): template 이미지의 옷 부분을 segmentation
- diffusers(`stable-diffusion`): template 이미지에서 segmentation 된 옷을 prompt의 내용으로 inpainting

<br/>

## 📜 AI 서버 역할(`gRPC` 통신)

1. `Client`(`request`) => `Back-End` => `AI`
2. 이미지 처리: `request` 들어왔을 때, 선택한 옵션의 template 이미지 얼굴을 input 이미지 얼굴로 swap (`insightface`)
3. `AI`(`response`) => `Back-End` => `Front-End`
