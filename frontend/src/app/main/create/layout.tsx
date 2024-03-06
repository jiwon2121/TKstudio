interface Props {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <>
      <header>해더</header>
      {children}
      <nav>네비게이션 바</nav>
    </>
  )
}
