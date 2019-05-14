const { Worker, isMainThread, parentPort } = require('worker_threads')

const promiseParentPort = () => {
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      const worker = new Worker(__filename)
      worker.once('message', msg => {
        resolve(msg)
      })
      worker.once('error', err => {
        resolve(err)
      })
      worker.postMessage('Hello, World')
    } else {
      parentPort.once('message', msg => {
        parentPort.postMessage(msg)
      })
    }
  })
}

const bootstrap = async () => {
  const result = await promiseParentPort()
  console.log('--->', result)
}

bootstrap()
