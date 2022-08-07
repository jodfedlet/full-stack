module.exports = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'postgres',
            database: 'financial_manager',
            port: 5432,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: 'src/migrations',
        },
        seeds: {
            directory: 'src/seeds',
        },
    },

    prod: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'postgres',
            database: 'financial_manager_prod',
            port: 5432,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: 'src/migrations',
        },
    },
};
