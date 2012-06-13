var yaml = require('js-yaml');
var azure = require('azure');
 
var extend = function(dest, from) {
  var props = Object.getOwnPropertyNames(from);
  props.forEach(function(name) {
    if (name in dest && typeof dest[name] == 'object') {
      extend(dest[name], from[name]);
    } else {
      var destination = Object.getOwnPropertyDescriptor(from, name);
      Object.defineProperty(dest, name, destination);
    }
  });
};

var load = function(config_file, container, env, callback) {
  if (!env) {
    env = process.env.NODE_ENV || 'development';
  }

  try {
    var blob = azure.createBlobService();
    blob.getBlobToText(container, config_file, function(error, text) {

      var config = yaml.load(text);

      var settings = config['default'] || {};
      var settings_env = config[env] || {};

      extend(settings, settings_env);

      callback(null, settings);
    });
    
  } catch(e) {
    callback(e, null);
  }
}

module.exports.load = load;