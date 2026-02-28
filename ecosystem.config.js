module.exports = {
  apps: [
    {
      name: "masakcook-nextjs",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
