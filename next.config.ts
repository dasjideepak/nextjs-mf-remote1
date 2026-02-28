import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote1",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./DashboardApp": "./src/components/DashboardApp",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
        },
        extraOptions: {},
      })
    );

    return config;
  },
};

export default nextConfig;