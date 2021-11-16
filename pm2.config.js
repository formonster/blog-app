module.exports = {
    apps: [{
        name: "ioc-server",
        script: "ts-node",
        args: "src/server/app.tsx",
        error_file: './log/err.log',
        out_file: './log/out.log',
        log_file: './log/combined.log',
        time: true,
        // 实例数
        // instances: 1,
        // exec_mode: "cluster",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}