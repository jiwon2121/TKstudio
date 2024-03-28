import Nav from './_components/Nav'
import Header from './_components/Header'
import ContextProvider from './_components/ContextProvider'

function MainLayout({ children }: LayoutProps) {
  return (
    <ContextProvider>
      <Header />
      {children}
      <Nav />
    </ContextProvider>
  )
}

export default MainLayout
