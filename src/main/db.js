import Datastore from 'nedb'
import fs from 'fs'
import path from 'path'

const DEFAULT_ATTR = [
  'ETType',
  'Execution Time',
  'Object Id'
]

const createDB = (currentMilliseconds) => {
  return new Promise((resolve, reject) => {
    // TODO: 나중에 user.home 내의 application 폴더로 변경.
    const dbFileName = './db/et' + currentMilliseconds + '.db'
    const db = new Datastore({ filename: dbFileName })
    db.loadDatabase((error) => {
      if (error) {
        reject(error)
      } else {
        db.ensureIndex({ fieldName: 'Execution Time' })
        db.ensureIndex({ fieldName: 'ETType' })
        db.ensureIndex({ fieldName: 'processKey' })
        resolve(db)
      }
    })
  })
}

const retrieveExecutionTrace = (ettypeList, execList) => {
  return new Promise((resolve) => {
    const ettypeDef = ettypeList.reduce((accumulator, ettype) => {
      const { typeName, attributeList } = ettype

      accumulator[typeName] = attributeList.map(attr => attr.attributeName)
      return accumulator
    }, {})

    const executionTraceSet = execList.reduce((accumulator, exec) => {
      const { processKey, outputPath, outputFile } = exec
      const executionTrace = fs.readFileSync(path.join(outputPath, outputFile))
        .toString()
        .split('\n')

      accumulator[processKey] = executionTrace
      return accumulator
    }, {})

    resolve({ ettypeDef, executionTraceSet })
  })
}

// ettypeDef = {
//   "ettypeName": ['attrName1', 'attrName2', ...]
// }
const saveExecutionTraces = (executionTraceSet, ettypeDef, db) => {
  return new Promise((resolve, reject) => {
    let outerCount = 0
    let outerMaximum = Object.keys(executionTraceSet).length
    Object.keys(executionTraceSet).forEach(processKey => {
      const executionTraceList = executionTraceSet[processKey]
      let count = 0

      executionTraceList.forEach(executionTrace => {
        const attributeList = executionTrace.split(',')
        const ettypeName = attributeList[1]

        if (ettypeName) {
          let executionTraceObj = { processKey: processKey }

          let index = 1
          DEFAULT_ATTR.forEach(attrName => {
            let attrValue = attributeList[(index++)]

            if (attrName === 'Execution Time') {
              attrValue = Number(attrValue)
            }

            executionTraceObj[attrName] = attrValue
          })

          ettypeDef[ettypeName].forEach(attrName => {
            executionTraceObj[attrName] = attributeList[(index++)]
          })

          db.insert(executionTraceObj, (error, saved) => {
            if (error) {
              reject(error)
            }

            if ((++count) === executionTraceList.length) {
              if ((++outerCount) === outerMaximum) {
                resolve(db)
              }
            }
          })
        } else {
          if ((++count) === executionTraceList.length) {
            if ((++outerCount) === outerMaximum) {
              resolve(db)
            }
          }
        }
      })
    })
  })
}

export const buildExecutionTraceDB = (ettypeList, execList) => {
  return new Promise((resolve, reject) => {
    Promise.all([createDB(Date.now()), retrieveExecutionTrace(ettypeList, execList)]).then(values => {
      let db = values[0]
      let { ettypeDef, executionTraceSet } = values[1]

      saveExecutionTraces(executionTraceSet, ettypeDef, db).then(db => {
        resolve(db)
      }).catch(error => {
        reject(error)
      })
    })
  })
}
