// ***********************************
// *                                 *
// *  X-Team TensorFlow.js - Logic   *
// *                                 *
// ***********************************

/**
 *  Helpers
 */

const print = function (text) {
  let el = document.getElementsByClassName('logic')[0]
  el.append(document.createTextNode(text))
  el.append(document.createElement('br'))
  console.log(text)
}

/**
 *  Data sets
 */

const data = {
  'dyadic': [[0, 0], [1, 0], [1, 1], [0, 1]],
  'binary': [[0], [1]],

  'xor': {
    'training': [[0], [1], [0], [1]],
    'testing': [[0, 0], [1, 0], [1, 1], [0, 1]],
    'expected': [[0], [1], [0], [1]]
  },
  'or': {
    'training': [[0], [1], [1], [1]],
    'testing': [[0, 0], [1, 0], [1, 1], [0, 1]],
    'expected': [[0], [1], [1], [1]]
  },
  'and': {
    'training': [[0], [0], [1], [0]],
    'testing': [[0, 0], [1, 0], [1, 1], [0, 1]],
    'expected': [[0], [0], [1], [0]]
  },
  'implies': {
    'training': [[1], [0], [1], [1]],
    'testing': [[0, 0], [1, 0], [1, 1], [0, 1]],
    'expected': [[1], [0], [1], [1]]
  },
  'negation': {
    'training': [[1], [0]],
    'testing': [[1], [1]],
    'expected': [[0], [0]]
  }
}

/**
 * TensorFlow.js
 *
 * See: https://medium.com/tensorflow/a-gentle-introduction-to-tensorflow-js-dba2e5257702
 */

const ann = function (op, units, shape, cycles) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        const args = data[op], model = tf.sequential()
        model.add(tf.layers.dense({units: units, inputShape: shape, activation: 'tanh'}))
        model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}))
        model.compile({optimizer: 'sgd', loss: 'binaryCrossentropy', lr: 0.1})
        const xs = tf.tensor2d((units === 8) ? data.dyadic : data.binary), ys = tf.tensor2d(args['training'])
        model.fit(xs, ys, {
          batchSize: 1,
          epochs: cycles
        }).then(function() {
          print("")
          print('Running ANN for: ' + op + ' at ' + cycles + ' epochs')
          print(model.predict(tf.tensor2d(args['testing'])))
          print(args['expected'])
          resolve(print(""))
        })
      } catch (ex) {
        resolve(print(ex))
      }
    }, 5000)
  })
}

/**
 * Init
 */

print('Beginning Logic ANN tests at ' + new Date() + '... this may take a while!')
ann('xor', 8, 2, 100).then(function (a) {
  ann('or', 8, 2, 100).then(function (b) {
    ann('and', 8, 2, 100).then(function (c) {
      ann('implies', 8, 2, 100).then(function (d) {
        ann('negation', 4, 1, 100).then(function (e) {
          print('Completed tests at ' + new Date() + '... thanks for waiting!')
        })
      })
    })
  })
})