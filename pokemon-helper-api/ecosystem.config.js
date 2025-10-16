module.exports = {
  apps: [
    {
      name: "my-ts-app",
      script: "./app.ts",
      interpreter: "node",
      interpreter_args: "--import=tsx", // для tsx
      instances: 1,
      cwd: "/var/www/pkmn/pokemon-helper-api",
      exec_mode: "fork",
      error_file: "./logs/error.log",
      out_file: "./logs/output.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
