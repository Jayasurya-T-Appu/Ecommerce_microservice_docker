const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'user-redis',
  port: process.env.REDIS_PORT || 6379,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  }
})

redisClient.on("connect", () => {
  console.log("🔗 Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

module.exports = redisClient;