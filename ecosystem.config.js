module.exports = {
  apps: [
    {
      name: 'angular-task-manager',
      script: './server/server.js',
      watch: true,
      env: {
        PORT: 8080,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 8002,
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['149.28.11.92'],
      ref: 'origin/master',
      repo: 'https://github.com/wyyx/angular-task-manager.git',
      path: '/www/angular-task-manager-website/production',
      'post-deploy': 'yarn start && pm2 startOrRestart ecosystem.json --env production'
    }
  }
}
