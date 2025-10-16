export default {
  apps: [
    {
      name: "ts-app",
      script: "/var/www/pkmn/pokemon-helper-api/app.ts",
      interpreter: "node",
      interpreter_args: "--import=tsx",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
