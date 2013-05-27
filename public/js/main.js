require.config({
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['underscore','jquery']
        }
    },
    paths: {
        'app': 'app/app',
        'templates': 'app/templates',

        'backbone': 'vendor/backbone-min',
        'bootstrap.min': 'vendor/bootstrap.min',
        'domready': 'vendor/domReady',
        'handlebars': 'vendor/handlebars.runtime',
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
            'vendor/jquery-2.0.1.min'
        ],
        'moment': 'vendor/moment.min',
        'underscore': 'vendor/underscore-min',
    }
});


require(['domready', 'app'], function(domReady, App) {

    domReady(function() {
        new App();
    });
});