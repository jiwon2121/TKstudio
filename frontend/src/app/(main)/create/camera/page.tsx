'use client'

import React, { useRef, useEffect, useState } from 'react'

function CameraComponent() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  useEffect(() => {
    const accessCamera = async () => {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.log('카메라에 접근할 수 없습니다.', error)
      }
    }

    accessCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track: MediaStreamTrack) => track.stop())
      }
    }
  }, [])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight

      // 캔버스의 크기를 비디오의 크기로 설정
      canvas.width = videoWidth
      canvas.height = videoHeight

      // 비디오의 크기에 맞게 이미지를 그림
      context?.drawImage(video, 0, 0, videoWidth, videoHeight)

      // Canvas에서 이미지 데이터를 가져와서 base64 형식으로 저장
      canvas.toBlob((blob : any) => {
        // Blob URL 생성
        const blobUrl = URL.createObjectURL(blob);
        setCapturedImage(blobUrl)
        localStorage.setItem('img', blobUrl)
        // Blob URL을 사용하여 새 페이지로 이동
        window.location.href = `/main/create`;
      }, 'image/*');



    }
  }

  return (
    <>
      <h2>카메라</h2>
      {/* <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxWidth: '600px' }}
      /> */}
      {capturedImage && (
        <img
        src={capturedImage}
        alt="Captured"
        hidden />
        )}
       <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxWidth: '600px' }}
        />
      <button onClick={captureImage}>사진 찍기</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  )
}

export default CameraComponent
