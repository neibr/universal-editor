# Universal editor

Universal editor to edit the entities from RESTful service.

## Building

Recommendation: running console with Administrator permissions. Address http://universal-editor.dev is including into host file and open in browser.
If don't running console this way, have to enter http://universal-editor.dev in host file manually as new line like this

127.0.0.1 universal-editor.dev

For testing the application you need to install `karma-cli` globally with command

`npm install -g karma-cli`

Install dependences:

1. `npm install`
1. `bower install`

Run build:

* `npm run dev`: build and watch sources, create web server. 
* `npm run dev --prod`: build minified version and watch sources, create web server.
* `npm run build`: build to `./dist` directory.
* `npm run test`: run unit-tests of the application. (before executing of the command run `npm run build`)

## Documentation

* [По-русски](docs/ru/README.md).
