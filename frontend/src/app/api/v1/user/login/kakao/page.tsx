"use client"

import { useSearchParams, useRouter } from "next/navigation"

import { useCallback, useEffect, useState } from "react"

interface ResponseType {
    ok: boolean;
    error?: any;
  }

  const Redirect = function () {
    const params = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [result , setResult] = useState('');

    const loginHandler = useCallback(
        async (code : any) => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/user/login/kakao', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        authCode: code,
                    }),
                });

                const responseData = await response.json();

                if (response.ok) {
                    // 성공적으로 응답을 받은 경우
                    const authToken = response.headers.get('Authorization'); // 'Authorization' 헤더에서 토큰 값 가져오기
                    console.log('Authorization Header:', authToken);

                    // 쿠키에 저장하거나 필요한 작업 수행
                    // router.push('/');
                } else {
                    // 실패한 경우에 대한 처리
                    console.error('Request failed:', responseData.error);
                    // 에러 페이지로 리다이렉트
                    // router.push('/notifications/authentication-failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        [router]
    );
    
    useEffect(() => {
        const code = params.get('code');
        console.log('Auth Code:', code);
        setResult(String(code));
        if (code) {
            loginHandler(code);
        }
    }, []);

    console.log('Result:', result);

    return (
        <div>
            { result ? "로그인중입니다" : '다시 시도해주세요' } 
        </div>
    );
};

export default Redirect;
