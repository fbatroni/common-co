const {series, rimraf} = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps start',
        /**
         * Starts the builded app from the dist directory.
         */
        start: {
            script: 'NODE_ENV=production node dist/app.js',
            description: 'Starts the built app',
        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            script: 'source ./.env && nodemon --watch src --watch .env',
            description:
                'Serves the current app and watches for changes to restart it',
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps clean.dist',
                'nps lint',
                'nps transpile',
                'nps copy',
                'nps clean.tmp'
            ),
            description: 'Builds the app into the dist directory',
        },
        /**
         * Runs TSLint over the project
         */
        lint: {
            script: 'gts lint',
            hiddenFromHelp: true,
        },
        /**
         * Transpile app into javascript
         */
        transpile: {
            script: 'tsc --project .',
            hiddenFromHelp: true,
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: 'nps clean.dist',
                description: 'Deletes the ./dist folder',
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true,
            },
            tmp: {
                script: rimraf('./.tmp'),
                hiddenFromHelp: true,
            },
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            script: copyDir('./.tmp/src', './dist'),
            hiddenFromHelp: true,
        },
    },
};

function copyDir(source, target) {
    return `ncp ${source} ${target}`;
}
