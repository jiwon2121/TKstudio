FROM python:3.9.18-bookworm
#LABEL authors="SSAFY"
# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일들 복사
COPY requirements.txt .
COPY image ./image
#COPY src/.env .
COPY src/proto/ ./proto/
COPY src/inswapper_128.onnx .
COPY image .
COPY src/grpc_ai_server.py .

RUN apt-get update && apt-get install -y libgl1-mesa-glx
# 필요한 Python 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# gRPC 서버 실행
CMD ["python", "grpc_ai_server.py"]