'use client'

import { useRouter } from 'next/navigation'
import Logo from '@@/assets/icons/logo-small.svg'
import LogOut from '@@/assets/icons/log-out.svg'
import styled from 'styled-components'
import AlertModal from '@/components/AlertModal'
import { useState } from 'react'
import { MainGreen, MainOrange, MainYellow } from '@@/assets/styles/pallete'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  align-items: center;
`

const LogoutButton = styled.button`
  padding: 9px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 0;
  border: none;
  background-color: transparent;
`

function Header() {
  const baseUrl = process.env.NEXT_PUBLIC_BACK_URL
  const router = useRouter()
  const [modalShow, SetModalShow] = useState<boolean>(false)

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      await fetch(baseUrl + '/api/v1/user/logout', {
        headers: {
          Authorization: refreshToken as string,
        },
      })
    } catch (err) {
      console.log(err)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/start')
    }
  }
  return (
    <>
      <HeaderWrapper>
        <Logo />
        <LogoutButton
          onClick={() => {
            // handleLogout()
            SetModalShow(true)
          }}
        >
          <LogOut />
        </LogoutButton>
      </HeaderWrapper>
      
      {modalShow &&
      <AlertModal confirm='로그아웃' handleClose={() => {SetModalShow(false)}} alertColor={MainYellow} handleConfirm={handleLogout}>
        로그아웃 하시겠습니까?
      </AlertModal>
      }
    </>
  )
}

export default Header
