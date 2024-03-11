import Nav from './_components/Nav'
import Header from './_components/Header'

interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Nav />
    </>
  )
}

export default MainLayout
