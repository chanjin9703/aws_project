module.exports = {
    ORIGINAL_BUCKET_NAME: process.env.ORIGINAL_BUCKET_NAME,
    // 로컬개발환경에서실행이면 특정값으로, aws환경이면 user_pool로
    USER_POOL: process.env.IS_OFFLINE
        ? "us-east-1_pxc3h9350"
        : process.env.USER_POOL,
    USER_POOL_CLIENT: process.env.IS_OFFLINE
        ? "pglg2tlol18jvghkvuisahau7"
        : process.env.USER_POOL_CLIENT,
};