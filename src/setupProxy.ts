import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/destination/*',
    createProxyMiddleware({
      target: 'http://center.logiall.com:10002/',
      changeOrigin: true,
    })
  );
};