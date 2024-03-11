import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Black } from '@@/assets/styles/pallete'
import HomeIcon from '@@/assets/icons/home.svg'
import CreateIcon from '@@/assets/icons/aperture.svg'
import GalleryIcon from '@@/assets/icons/images.svg'
import StoreIcon from '@@/assets/icons/store.svg'

interface Props {
  to: 'home' | 'create' | 'gallery' | 'store'
}

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 25vw;
  height: 100%;
`

const Text = styled.span`
  font-size: 0.75rem;
  color: ${Black};
  text-decoration-line: none;
`

function NavLink({ to }: Props) {
  function Icon() {
    switch (to) {
      case 'home':
        return HomeIcon
      case 'create':
        return CreateIcon
      case 'gallery':
        return GalleryIcon
      case 'store':
        return StoreIcon
      default:
        return null
    }
  }

  function toName() {
    switch (to) {
      case 'home':
        return '홈'
      case 'create':
        return '사진생성'
      case 'gallery':
        return '갤러리'
      case 'store':
        return '스토어'
      default:
        return null
    }
  }

  const ImageStyle = {
    width: '2.5rem',
    height: 'auto',
  }

  return (
    <Link href={`/${to}`} style={{ textDecoration: 'none', height: '100%' }}>
      <IconWrapper>
        <Image src={Icon()} alt={`/${to}`} style={ImageStyle} />
        <Text>{toName()}</Text>
      </IconWrapper>
    </Link>
  )
}

export default NavLink
