const getExpeditiousCache = require('express-expeditious');

export const cacheInit = getExpeditiousCache({
  namespace: 'evaacache',
  defaultTtl: '4 hour',
  engine: require('expeditious-engine-redis')({
    host: 'redis.acme.com',
    port: 6379
  })
});

export const cacheFaster = getExpeditiousCache({
    namespace: 'evaacache',
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      host: 'redis.acme.com',
      port: 6379
    })
});
