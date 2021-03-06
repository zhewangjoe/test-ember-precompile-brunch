// Generated by CoffeeScript 1.11.1
(function() {
  var EmberPrecompiler, fs, jsdom;

  fs = require('fs');

  jsdom = require('jsdom');

  module.exports = EmberPrecompiler = (function() {
    EmberPrecompiler.prototype.brunchPlugin = true;

    EmberPrecompiler.prototype.type = 'template';

    EmberPrecompiler.prototype.extension = 'hbs';

    EmberPrecompiler.prototype.precompile = true;

    EmberPrecompiler.prototype.setup = function(config) {
      this.config = config;
      this.window = jsdom.jsdom().defaultView;
      this.window["eval"](fs.readFileSync(this.config.files.templates.paths.jquery, 'utf8'));
      this.window["eval"](fs.readFileSync(this.config.files.templates.paths.handlebars, 'utf8'));
      return this.window["eval"](fs.readFileSync(this.config.files.templates.paths.ember, 'utf8'));
    };

    function EmberPrecompiler(config) {
      var ref;
      this.config = config;
      if (((ref = this.config.files.templates) != null ? ref.paths : void 0) != null) {
        this.setup(this.config);
      }
      null;
    }

    EmberPrecompiler.prototype.compile = function(data, path, callback) {
      var content, e, error, result;
      if (this.window == null) {
        return callback("files.templates.paths must be set in your config", {});
      }
      try {
        content = this.precompileEmber(data.toString());
        return result = "Ember.TEMPLATES[module.id] = Ember.Handlebars.template(" + content + ");\nmodule.exports = module.id;";
      } catch (error1) {
        e = error1;
        return error = e;
      } finally {
        callback(error, result);
      }
    };

    EmberPrecompiler.prototype.precompileEmber = function(data) {
      return this.window.Ember.Handlebars.precompile(data.toString()).toString();
    };

    return EmberPrecompiler;

  })();

}).call(this);
