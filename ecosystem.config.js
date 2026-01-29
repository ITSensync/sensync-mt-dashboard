module.exports = {
  apps: [
    {
      name: "sensync-maintenance",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 5007",
      cwd: "/var/www/maintenance.getsensync.com",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
