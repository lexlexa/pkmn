export default {
  apps: [
    {
      name: "ts-app",
      script: "/root/.nvm/versions/node/v20.19.2/bin/npm",
      args: "start:prod",
      interpreter: "none", // важно: не использовать node как интерпретатор для npm
      cwd: "/var/www/pkmn/pokemon-helper-api", // текущая рабочая директория
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
