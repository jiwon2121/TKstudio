import Animation from './_components/LandingLogo'

function IndexLayout({ children }: LayoutProps) {
  return (
    <main>
      <Animation />
      {children}
    </main>
  )
}

export default IndexLayout
