
/**
 * Development config
 */

module.exports = {

    // db uri to connect. Name of the database is notifications, please change it to your liking
    mongodb: {
        kraken: {
            // uri: 'mongodb://188.166.179.153:27009/shelfjoy_production'
            uri: 'mongodb://localhost:27017/krakenDB'
            // uri: 'mongodb://188.166.179.153:27009/shelfjoy_production'
        },
        broker: {
            uri: 'mongodb://localhost:27017/bot_broker_development'
        },

        options: {
            // user: 'super',
            // pass: 'ShelfJoySuperAdmin@411014',
            // auth: { authdb: 'admin'}
        }
    },

    redis: {
        port: '6009',
        host: '127.0.0.1'
    },

    appId: '5763fcdded385de6d1a80800',

    booksLimitPerDay: 100,

    iframely: {
        domain: 'http://localhost:3000/admin'
    },

    app: {
        api: 'http://localhost:3000',
        postUrl: 'http://localhost:3000/webhooks/bot',
        protocol: 'http'
    },

    email: {
        adminEmail: 'kaushik.thirthappa@wingify.com',
        from: 'kaushik.thirthappa@wingify.com',
        cc: ['kaushik.thirthappa@wingify.com']
    },

    server: {
        port: 3000 // port to run your express server
    },

    aws: {
        bucket: 'dev.shelfjoy'
    }
};
