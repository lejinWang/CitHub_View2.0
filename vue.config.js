module.exports = {
    devServer: {
        proxy: {
            ["/userapi"]: {
                target: 'http://localhost:2000',
                changeOrigin: true,
                pathRewrite: {
                    '^/userapi': ''
                }
            },
            ["/serviceapi"]: {
                target: 'http://localhost:1000',
                changeOrigin: true,
                pathRewrite: {
                    '^/serviceapi': ''
                }
            },
            ["/crowdsourcingapi"]: {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/crowdsourcingapi': ''
                }
            }
        }
    },
    // 解决打包白屏问题
    publicPath:"./" 
    
}
