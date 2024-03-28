// interface RequestOption {
//   method: 'GET' | 'POST' | undefined
//   body: any | undefined
//   headers: any |
// }

type RequestOption = any

// const requestOptions = {
//   method: 'POST',
//   body: JSON.stringify({}),
//   headers: {
//     'Content-Type': 'application/json',
// }

export async function fetchDataWithAuthorization(
  url: string,
  accessToken: string,
  refreshToken: string,
  requestOptions: RequestOption = {},
) {
  let response = await fetch(url, {
    ...requestOptions,
    headers: {
      Authorization: accessToken,
      ...(requestOptions.headers || {}),
    },
  })

  if (response.status === 401) {
    response = await fetch(url, {
      ...requestOptions,
      headers: {
        Authorization: refreshToken,
        ...(requestOptions.headers || {}),
      },
    })

    if (response.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      alert('로그인이 만료되었습니다.')
      window.location.replace(process.env.NEXT_PUBLIC_BACK_URL + '/login')
      return null
    }

    const newAccessToken = response.headers.get('accessToken')
    const newRefreshToken = response.headers.get('refreshToken')
    localStorage.setItem('accessToken', 'Bearer ' + newAccessToken)
    localStorage.setItem('refreshToken', 'Bearer ' + newRefreshToken)
  }

  return response
}
