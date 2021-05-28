'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/admin',
        handler: (request, h) => {
            return '<html><body><h1>MP admin</h1></body></html>';
        }
    });

    server.route({
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: (request, h) => {
            return h.response('<html><body><h1>404 in MP</h1></body></html>').code(404);
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();