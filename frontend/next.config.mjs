/** @type {import("next").NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
})

export default withPWA({
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'ddalkkak101-bucket.s3.ap-northeast-2.amazonaws.com'
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
