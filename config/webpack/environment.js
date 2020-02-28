const { environment } = require('@rails/webpacker')

environment.loaders.delete('nodeModules')
// NOTE: Avoid the error on production environment like below:
//
//     Uncaught TypeError: r is not a function
//
// ref.
//
// - https://github.com/rails/rails/issues/35501
// - https://github.com/rails/webpacker/blob/master/docs/v4-upgrade.md#excluding-node_modules-from-being-transpiled-by-babel-loader
// - https://github.com/jellypbc/poster/pull/71/files

module.exports = environment
