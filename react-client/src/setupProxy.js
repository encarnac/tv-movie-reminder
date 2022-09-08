const { createProxyMiddleware } = require('http-proxy-middleware');

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware({
      target: `${BACKEND_URL}`,
      changeOrigin: true,
    })
  );

  app.use(
    '/calendar',
    createProxyMiddleware({
      target: `${BACKEND_URL}`,
      changeOrigin: true,
    })
  );
};