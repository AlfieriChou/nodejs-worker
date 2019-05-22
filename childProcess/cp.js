const cp = require('child_process')
const path = require('path')
const n = cp.fork(path.resolve(__dirname, './sub.js'))

n.on('message', m => {
  console.log('PARENT got message: ', m)
})

n.send({
  hello: 'world'
})
