interface Props extends LayoutProps {
  modal: React.ReactNode
}

function DetailLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

export default DetailLayout
