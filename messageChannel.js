const { Worker, isMainThread, MessageChannel, parentPort } = require('worker_threads')

// const testMC = () => {
//   const { port1, port2 } = new MessageChannel()
//   port1.on('message', (message) => console.log(message))
//   const circularData = {}
//   circularData.foo = circularData
//   port2.postMessage(circularData)
// }

// testMC()

if (isMainThread) {
  const worker = new Worker(__filename)
  const subChannel = new MessageChannel()
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1])
  subChannel.port2.on('message', msg => {
    console.log('received:', msg)
  })
} else {
  parentPort.once('message', value => {
    let testArr = []
    for (let i = 0; i < 10; ++i) {
      testArr[i] = 0
      for (let j = i; j < 10; ++j) {
        testArr[i] = i + j + testArr[i]
      }
    }
    value.hereIsYourPort.postMessage(testArr)
    value.hereIsYourPort.close()
  })
}
