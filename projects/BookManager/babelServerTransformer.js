const log = require('debug')('projects:bookmanager:jestConfig:babelTransformer');
const babelJest = require('babel-jest');

log('server transformer');

module.exports = babelJest.createTransformer({
    ...require('./babel.config'),
    rootMode: 'upward'
});
