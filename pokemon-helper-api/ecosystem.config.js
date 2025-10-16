export default {
  apps: [
    {
      name: "my-ts-app",
      script: "./app.ts",
      interpreter: "node",
      interpreter_args: "--import=tsx", // для tsx
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
