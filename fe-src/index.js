import './index.less'

// ES2015 module style:
// import console from 'websocket-log-server/client'
// console.init('192.168.133.96', '9998')

// CommonJs module style:
const console = require('websocket-log-server/client').init('192.168.133.96', '9998')

console.log("Hello!")

document.body.addEventListener('click', function(e){
    console.log("You have clicked body: ", {x: e.clientX, y: e.clientY})
})

document.getElementById('sendLog').addEventListener('click', function(e){
    let $inputLog = document.getElementById('inputLog')
    console.log($inputLog.value)
    $inputLog.value = ''
})

