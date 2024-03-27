import type { Metadata } from 'next'
import StyledComponentsRegistry from './lib/registry'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: '딸깍사진관',
  description: '딸깍사진관',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko_KR">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/assets/images/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/assets/images/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/assets/images/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/images/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/images/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/images/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/images/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/images/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/images/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/images/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="referrer" content="no-referrer" />
        <meta name="msapplication-TileColor" content="#FDFFFD" />
        <meta
          name="msapplication-TileImage"
          content="/assets/images/ms-icon-70x70.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/assets/images/ms-icon-144x144.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/assets/images/ms-icon-150x150.png"
        />
        <meta
          name="msapplication-TileImage"
          content="/assets/images/ms-icon-310x310.png"
        />
        <meta name="theme-color" content="#FDFFFD" />
      </head>
      <body
        suppressHydrationWarning={true}
        style={{ margin: '0', minHeight: '100vh' }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
