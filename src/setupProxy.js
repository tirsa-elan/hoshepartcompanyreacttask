
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware({
            pathFilter: '/api',
            target: 'https://ts.idicorp.ir',
            changeOrigin: true,
            secure: true,
            cookieDomainRewrite: '',
            cookiePathRewrite: '/',
            on: {
                proxyReq: (proxyReq) => {
                    console.log('Proxy path:', proxyReq.path);
                },
                proxyRes: (proxyRes) => {
                    console.log('Proxy status:', proxyRes.statusCode);
                }
            }
        })
    );
};
