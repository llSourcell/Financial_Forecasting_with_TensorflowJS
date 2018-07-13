// ****************************************************************
// *                                                              *
// * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API   *
// *                                                              *
// ****************************************************************

const init = {
  method: 'GET',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default'
}

const fetchWrapper = function (url) {
  return new Promise(function (resolve, reject) {
    fetch(url, init)
      .catch(function (err) {
        console.error('Error fetching data, check your internet connection. ' + err)
      })
      .then(function (success) {
        let r
        try { r = success.json() }
        catch (ex) { console.error(ex) }
        return r
      })
      .then(function (secondSuccess) {
        return resolve(secondSuccess.data)
      })
  })
}