define(['handlebars', 'moment'], function(Handlebars, moment) {

    // Description: Output variable values
    // Usage: {{debug}} or {{debug someValue}}
    // https://github.com/hp-mobile/Handlebars.js-helpers-collection#debug-helper
    Handlebars.registerHelper('debug', function(optionalValue) {
        console.log("\nCurrent Context");
        console.log('====================');
        console.log(this);

        if (arguments.length > 1) {
            console.log('Value');
            console.log('====================');
            console.log(optionalValue);
        }
    });


    // Description: Loop through array/object, exposing index/key value
    // Usage:   {{#each_with_key people}}
    //              <div>{{key}} - {{name}}</div>
    //          {{/each_with_key}}
    // https://github.com/dsuket/handlebars-helpers
    Handlebars.registerHelper('each_with_key', function(context, options) {
        var ret = '';
        var start = Number(options.hash['start'] || 0);

        if (typeof context === 'array') {

            for (var i=0, j=context.length; i<j; i++) {
                context[i].key = start;
                ret = ret + options.fn(context[i], i);
                start++;
            }

        } else if (typeof context === 'object') {

            for (property in context) {
                context[property].key = property;
                ret = ret + options.fn(context[property]);
            }

        }

        return ret;
    });


    // Description: Format date using Moment.js formats
    // Usage: {{dateFormat creation_date format="MMMM YYYY"}}
    // https://github.com/hp-mobile/Handlebars.js-helpers-collection#formatDate
    Handlebars.registerHelper('dateFormat', function(context, options) {
        if (window.moment) {
            var f = options.hash.format || "MMM Do, YYYY";
            return moment(context).format(f);
        } else {
            //  moment plugin not available. return data as is.
            return context;
        };
    });


    // Descr: URI encode item
    // Usage: {{uri page_id}}
    // https://github.com/hp-mobile/Handlebars.js-helpers-collection#encode
    Handlebars.registerHelper('uri', function (str) {
        return encodeURIComponent(str);
    });


    // Descr: Create template inheritance
    // Template Inheritance
    // http://thejohnfreeman.com/blog/2012/03/23/template-inheritance-for-handlebars.html
    Handlebars.loadPartial = function (name) {
        var partial = Handlebars.partials[name];
        if (typeof partial === 'string') {
            partial = Handlebars.compile(partial);
            Handlebars.partials[name] = partial;
        }
        return partial;
    };

    Handlebars.registerHelper('block',
        function(name, options) {
            /* Look for partial by name. */
            var partial = Handlebars.loadPartial(name) || options.fn;
            return partial(this, { data : options.hash });
        }
    );

    Handlebars.registerHelper('partial',
        function(name, options) {
            Handlebars.registerPartial(name, options.fn);
        }
    );


    // Descr: If Equals
    // Usage: if_eq this compare=that
    // https://github.com/hp-mobile/Handlebars-Helpers#equals
    Handlebars.registerHelper('if_eq', function(context, options) {
        if (context == options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });

    // Descr: Unless Equals
    // Usage: {{#unless_eq this compare=that}} ... {{/unless_eq}}
    Handlebars.registerHelper('unless_eq', function(context, options) {
        if (context == options.hash.compare)
            return options.inverse(this);
        return options.fn(this);
    });


    // Descr: If Greater Than
    // Usage: {{#if_gt this compare=that}} ... {{/if_gt}}
    // https://github.com/hp-mobile/Handlebars-Helpers#greater-than
    Handlebars.registerHelper('if_gt', function(context, options) {
        if (context > options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });

    // Descr: Unless Greater Than
    // Usage: {{#unless_gt this compare=that}} ... {{/unless_gt}}
    Handlebars.registerHelper('unless_gt', function(context, options) {
        if (context > options.hash.compare)
            return options.inverse(this);
        return options.fn(this);
    });


    // Descr: If Less Than
    // Usage: {{#if_lt this compare=that}} ... {{/if_lt}}
    // https://github.com/hp-mobile/Handlebars-Helpers#less-than
    Handlebars.registerHelper('if_lt', function(context, options) {
        if (context < options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });

    // Descr: Unless Less Than
    // Usage: {{#unless_lt this compare=that}} ... {{/unless_lt}}
    Handlebars.registerHelper('unless_lt', function(context, options) {
        if (context < options.hash.compare)
            return options.inverse(this);
        return options.fn(this);
    });


    // Descr: If Greater Than or Equal To
    // Usage: {{#if_gteq this compare=that}} ... {{/if_gteq}}
    // https://github.com/hp-mobile/Handlebars-Helpers#greater-than-or-equal-to
    Handlebars.registerHelper('if_gteq', function(context, options) {
        if (context >= options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });

    // Descr: Unless Greater Than or Equal To
    // Usage: {{#unless_gteq this compare=that}} ... {{/unless_gteq}}
    Handlebars.registerHelper('unless_gteq', function(context, options) {
        if (context >= options.hash.compare)
            return options.inverse(this);
        return options.fn(this);
    });


    // Descr: If Less Than or Equal To
    // Usage: {{#if_lteq this compare=that}} ... {{/if_lteq}}
    // https://github.com/hp-mobile/Handlebars-Helpers#less-than-or-equal-to
    Handlebars.registerHelper('if_lteq', function(context, options) {
        if (context <= options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });

    // Descr: Unless Less Than or Equal To
    // Usage: {{#unless_lteq this compare=that}} ... {{/unless_lteq}}
    Handlebars.registerHelper('unless_lteq', function(context, options) {
        if (context <= options.hash.compare)
            return options.inverse(this);
        return options.fn(this);
    });


    // Descr: If empty
    // Usage: {{#if_empty value}} ... {{/if_empty}}
    Handlebars.registerHelper('if_empty', function(context, options) {
        if (typeof context === 'undefined' || !context)
            return options.fn(this);
        return options.inverse(this);
    });

    // Descr: If empty
    // Usage: {{#if_empty value}} ... {{/if_empty}}
    Handlebars.registerHelper('unless_empty', function(context, options) {
        if (typeof context === 'undefined' || !context)
            return options.inverse(this);
        return options.fn(this);
    });

});