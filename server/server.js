const express = require('express')
const fs = require('fs')
const path = require('path')
const opn = require('opn')
const glob = require('glob')


const app = express()

const log = console.log.bind(console)

const HOST = process.argv[2] || '0.0.0.0'
const PORT = process.argv[3] || 8080
const autoOpenBrowser = !process.argv[4]

const FE_DIST = path.join(__dirname, '../fe-dist')

app.get('/', function(req, res){
    fs.readFile(path.join(FE_DIST, 'index.html'), 'utf8', function(err, data){
        log(`${req.method} ${req.url}`)
        if (err){
            res.send("Error: " + err.message)
        } else {
            res.send(data)        
        }
    })
})

app.use(express.static(FE_DIST, {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['.js', '.css', '.jpg', '.png', '.ico', '.json'],
    index: false,
    maxAge: '365d',
    lastModified: true,
    redirect: false
}))


app.listen(PORT, HOST, function () {
    log(`listening on ${HOST}:${PORT}`)
    log(`you can visit it via http://${HOST}:${PORT}`)
    if (autoOpenBrowser){
        opn(`http://${HOST === '0.0.0.0' ? '127.0.0.1' : HOST}:${PORT}`)
    }
})

