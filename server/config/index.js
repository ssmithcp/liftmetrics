process.env['NODE_CONFIG_DIR'] = 'server/config'
console.log('node config is', process.env.NODE_CONFIG)
module.exports = require('config')