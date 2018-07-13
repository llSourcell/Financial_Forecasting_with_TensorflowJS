
// Step 1 - build Convolutional network
const buildCnn = function (data) {
  //A promise represents the eventual result of an asynchronous 
  //operation. It is a placeholder into which the successful 
  //result value or reason for failure will materialize.
  return new Promise(function (resolve, reject) {
    //Linear stack of layers.
    const model = tf.sequential()

    //This layer creates a convolution kernel 
    // that is convolved (actually cross-correlated) 
    // with the layer input to produce a tensor of outputs. 

  //kernel size - An integer or tuple/list of a single integer, 
  // specifying the length of the 1D convolution window.
  //filters - Integer, the dimensionality of the output space 
  // (i.e. the number of filters in the convolution).
  //stride- An integer or tuple/list of a single integer, 
  // specifying the stride length of the convolution. 
  //activation- nonlinearity
  // kernel-init - An initializer for the bias vector.
  //variance scaling - the weights initialization technique that tries to make the variance of the outputs 
  //of a layer to be equal to the variance of its inputs
    model.add(tf.layers.conv1d({
      inputShape: [data.dates.length, 1],
      kernelSize: 100,
      filters: 8,
      strides: 2,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }))

//poolsize - An integer or tuple/list of a single integer, 
//representing the size of the pooling window.
//strides: An integer or tuple/list of a single integer, 
//specifying the strides of the pooling operation.
    model.add(tf.layers.maxPooling1d({
      poolSize: [500],
      strides: [2]
    }))

    model.add(tf.layers.conv1d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }))

    model.add(tf.layers.maxPooling1d({
      poolSize: [100],
      strides: [2]
    }))

//dense (also known as a fully connected layer), 
//which will perform the final classification. 
// Flattening the output of a convolution+pooling layer pair before a dense layer is another common pattern in neural networks:
    model.add(tf.layers.dense({
      units: 10,
      kernelInitializer: 'VarianceScaling',
      activation: 'softmax'
    }))
//The Promise.resolve(value) method returns a 
//Promise object that is resolved with the given value. 
    return resolve({
      'model': model,
      'data': data
    })
  })
}


//Step 2 Train Model
const cnn = function (model, data, cycles) {
  const tdates = tf.tensor1d(data.dates),
    thighs = tf.tensor1d(data.highs),
    test = tf.tensor1d(d.test_times),
    out = model.getLayer('dense_Dense1')

  //console.log(tdates)
  //console.log(thighs)

  modelHelper(model)

  //console.log(tdates.reshape([1, 1960, 1]))
  //console.log(thighs.reshape([1, 1960, 1]))

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        model.compile({optimizer: 'sgd', loss: 'binaryCrossentropy', lr: 0.1})
         model.fit(
         tdates.reshape([1, 1960, 1]),
         thighs.reshape([1, 1960, 1]), {
            batchSize: 3,
            epochs: cycles
          }).then(function () {
          print('')
          print('Running CNN for AAPL at ' + cycles + ' epochs')
          print(model.predict(test))
          print(d.test_highs)
          resolve(print(''))
        })
      } catch (ex) {
        resolve(print(ex))
      }
    }, 5000)
  })
}

// Step 3 - Execute! 
print('Beginning AAPL CNN tests at ' + new Date() + '... this may take a while!')
fetchWrapper('http://localhost:5555/api/').then(function (data) {
  prep(data).then(function (result) {
    buildCnn(result).then(function (built) {
      cnn(built.model, built.data, 100).then(function (e) {
        print('Completed tests at ' + new Date() + '... thanks for waiting!')
      })
    })
  })
})
