module.exports = function(grunt) {

    var templates = ['../templates/**/*.hbs'];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: templates,
                tasks: ['handlebars','uglify']
            }
        },
        handlebars: {
            compile: {
                options: {
                    amd: true,
                    processName: function(filepath) {
                        return filepath.replace('../templates/','').replace('.hbs','');
                    }
                },
                files: {
                    '../public/js/app/templates.js': templates
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */' + "\n"
            },
            my_target: {
                files: {
                    '../public/js/app/templates.js': '../public/js/app/templates.js'
                }
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s)
    grunt.registerTask('default', ['watch']);

};