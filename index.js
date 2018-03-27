const path = require('path')
const fs = require('fs')
const main = require(path.resolve('./src/index'))

if (!fs.existsSync(path.resolve('./config.js'))) {
    console.log("Error in config.js file")
    process.exit(1)
}

const config = require(path.resolve('./config.js'))
main(config)
