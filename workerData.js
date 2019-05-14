const { Worker, isMainThread, workerData } = require('worker_threads')

const promiseWorkerData = () => {
  return new Promise((resolve, reject) => {
    if (isMainThread) {
      new Worker(__filename, { workerData: 10 }).on('error', err => {
        reject(err)
      })
    } else {
      let testArr = []
      for (let i = 0; i < workerData; ++i) {
        testArr[i] = 0
        for (let j = i; j < workerData; ++j) {
          testArr[i] = i + j + testArr[i]
        }
      }
      resolve(testArr)
    }
  })
}

const bootstrap = async () => {
  const result = await promiseWorkerData()
  console.log('---->', result)
}

bootstrap()
