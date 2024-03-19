interface Props extends LayoutProps {
  modal: React.ReactNode
}

function IndexLayout({ children, modal }: Props) {
  return (
    <main>
      {children}
      {modal}
    </main>
  )
}

export default IndexLayout
