import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Retired service pages point at the service that now covers them.
  async redirects() {
    return [
      { source: "/services/brand-identity",     destination: "/services/web-development", permanent: true },
      { source: "/services/motion-interaction", destination: "/services/web-development", permanent: true },
      { source: "/services/digital-strategy",   destination: "/services/meta-ads",        permanent: true },
    ];
  },
};

export default nextConfig;
