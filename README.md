yaml-config-azure
=================

Manage your configuration based on NODE_ENV, all configuration defined with yaml and stored in Windows Azure storage. Shared configuration can be put under `default` key, different settings under each enviroment name.

### Why you would want to store your configuration in Windows Azure storage?
Let's say you have your code in a public repo in github. You don't want to push a config file with all your keys and sensitive configurations. You can "gitignore" it but then devs working on the project will have to create the config file on each environment. By using a centralized cloud storage like Windows Azure storage you have the best of both worlds. You don't have to put sensitive data on your repo and devs can use a centralized configuration.
This module will play well [git-azure](https://github.com/tjanczuk/git-azure).

Based on <https://github.com/rjyo/yaml-config-node>

## Installation

    $ npm install yaml-config-azure

## Usage

Create a blob inside a container on azure blob storage

```yaml
default:
  redis:
    port: 6379                # redis server port
    host: '127.0.0.1'         # redis host
    password: ''              # to use with AUTH
    db: 1                     # the test db
    options: {}
test:
  redis:
    db: 12
production:
  redis:
    db: 0
  new_prop:
    hello: 'world'
```

In your source code

```javascript
var config = require('yaml-config-azure');
var settings;
config.load('myappconfig.yml', 'mycontainer', null, function(error, result) {
  settings = result;
});

console.log(settings.redis.db); // if NODE_ENV is development, prints 1
```

The `readConfig()` function takes a second parameter as enviroment name, for example

```javascript
config.load('myappconfig.yml', 'mycontainer', 'test', function(error, result) {
  settings = result;
});

console.log(settings.redis.db); // prints 12
```

Since the library uses Windows Azure blob storage through the 'azure' package, it will expect that process.env.AZURE_STORAGE_ACCOUNT and process.env.AZURE_STORAGE_ACCESS_KEY be set.

## License

(The MIT License)

Copyright (c) 2012 Matias Woloski &lt;matiasw@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.