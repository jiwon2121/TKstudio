import Background from './_components/Background'

function IndexLayout({ children }: LayoutProps) {
  return (
    <main>
      <Background>{children}</Background>
    </main>
  )
}

export default IndexLayout
