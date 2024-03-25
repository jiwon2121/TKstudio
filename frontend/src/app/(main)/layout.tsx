import Nav from './_components/Nav'
import Header from './_components/Header'

function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Nav />
    </>
  )
}

export default MainLayout
