import styled from 'styled-components'
import OptionDetail from './OptionDetail'
import { useEffect, useState } from 'react'
import { GenderCategory } from '../page'
import { useRouter } from 'next/navigation'
import { fetchDataWithAuthorization } from '@/utils/api'

const OptionListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
export interface Option {
  optionId: number
  optionName: string
  cost: number
  optionS3Url: string
  description: string
  purchased: boolean
  categoryId: number
  createdTime: string
  gender: 'MALE' | 'FEMALE'
}

interface OptionListProp {
  categorySort: GenderCategory
  showMine: boolean
}

function OptionList({ categorySort, showMine }: OptionListProp) {
  const [showList, setShowList] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function getOptionList() {
    const accessToken = localStorage.getItem('accessToken') as string
    const refreshToken = localStorage.getItem('refreshToken') as string
    // let optionListResponse = await fetch(
    //   process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/list',
    //   {
    //     headers: { Authorization: accessToken },
    //   },
    // )

    // if (optionListResponse.status == 401) {
    //   optionListResponse = await fetch(
    //     process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/list',
    //     {
    //       headers: { Authorization: refreshToken },
    //     },
    //   )
    //   if (optionListResponse.status == 401) {
    //     localStorage.removeItem('accessToken')
    //     localStorage.removeItem('refreshToken')
    //     alert('로그인이 만료되었습니다.')
    //     router.push('/login')
    //     return
    //   }
    //   alert('refreshToken Update')
    //   localStorage.setItem(
    //     'accessToken',
    //     'Bearer ' + optionListResponse.headers.get('accessToken')!,
    //   )
    //   localStorage.setItem(
    //     'refreshToken',
    //     'Bearer ' + optionListResponse.headers.get('refreshToken')!,
    //   )
    // }

    // async function fetchDataWithAuthorization(
    //   url: string,
    //   accessToken: string,
    //   refreshToken: string,
    //   requestOptions: any = {},
    // ) {
    //   let response = await fetch(url, {
    //     ...requestOptions,
    //     headers: {
    //       Authorization: accessToken,
    //       ...(requestOptions.headers || {}),
    //     },
    //   })

    //   if (response.status === 401) {
    //     response = await fetch(url, {
    //       ...requestOptions,
    //       headers: {
    //         Authorization: refreshToken,
    //         ...(requestOptions.headers || {}),
    //       },
    //     })

    //     if (response.status === 401) {
    //       localStorage.removeItem('accessToken')
    //       localStorage.removeItem('refreshToken')
    //       alert('로그인이 만료되었습니다.')
    //       router.push('/login')
    //       return null
    //     }

    //     alert('refreshToken Update')
    //     const newAccessToken = response.headers.get('accessToken')
    //     const newRefreshToken = response.headers.get('refreshToken')
    //     localStorage.setItem('accessToken', 'Bearer ' + newAccessToken)
    //     localStorage.setItem('refreshToken', 'Bearer ' + newRefreshToken)
    //   }

    //   return response
    // }
    const url = process.env.NEXT_PUBLIC_BACK_URL + '/api/v1/option/list'

    const requestOptions = {}

    const optionListResponse = await fetchDataWithAuthorization(
      url,
      accessToken,
      refreshToken,
      requestOptions,
    )

    const optionListJson = await optionListResponse?.json()

    const optionList: Option[] = optionListJson.data

    let temp_list

    if (categorySort == 'ALL') {
      temp_list = [...optionList]
    } else {
      temp_list = optionList?.filter(
        (option: Option) => option.gender == categorySort,
      )
    }
    if (showMine) {
      setShowList(temp_list?.filter((option) => option.purchased))
    } else {
      setShowList(temp_list)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getOptionList()
  }, [categorySort, showMine])

  return (
    <OptionListContainer>
      {isLoading && <h1>옵션 리스트 로딩중입니다.</h1>}
      {showList?.length > 0 &&
        showList?.map((option: Option) => (
          <OptionDetail key={option.optionId} {...option} />
        ))}
      {!isLoading && showList?.length == 0 && (
        <h1>해당 조건의 상품이 없습니다.</h1>
      )}
    </OptionListContainer>
  )
}

export default OptionList
