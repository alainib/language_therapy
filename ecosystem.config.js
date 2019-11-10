module.exports = {
    apps: [{
            "name": "web",
            "script": "./web/node_modules/react-scripts/scripts/start.js",
            "instances": 1,
            "exec_mode": "cluster",
            "error_file": 'err.log',
            "out_file": 'out.log',
            "log_file": 'combined.log',
            "watch": ["src"],
            "ignore_watch": ["node_modules", ".git"],
            "env": {
                "NODE_ENV": "development",
                "PORT": "1112"
            }
        }, {
            name: 'api',
            script: './express-api/app.js',
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                "PORT": "1111"
            },
            env_production: {
                NODE_ENV: 'production',
                "PORT": "1111"
            }
        }
    ]
};
