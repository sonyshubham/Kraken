
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

    notificationCenter: {
        token: 'abcd'
    },

    notifications: {
        api: 'http://localhost:9001/send-notifications'
    },

    notificationChannels: {
        email: 'shubham.soni@wingify.com',
        slack: {
            name: 'kraken',
            token: 'xoxb-144053949622-dxoySNFz1uqBhIvQBAi1tkk3',
            channel: 'dev',
            user: 'kaushik'
        },
        messenger: {
            token: 'EAAIetSpE6ZBUBAKvOdhic5ZC8ZCzj4rksIqzTXfAi4yZBKXUV243IY13i61OPRs1jF6T2I1GnZBt041mLswS44RvsKWhBXtARdz9bS2LPWg9tRKP3gv35lEXAZAMYZC5Me7pS3kC6fSTQqzuyUf8ryBzb0L4DP8K1Kx7ZCh2tafLdwZDZD'
        }
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
