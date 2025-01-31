import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        hostname: 'images.cdn2.buscalibre.com'
      },
      {
        hostname: 'images.cdn1.buscalibre.com'
      },
      {
        hostname: 'images.cdn3.buscalibre.com'
      }
    ]
  }
};

export default nextConfig;
