'use strict'

/**
 * Main view controller - for single page app.
 */

const express = require('express'),
  view = express.Router()

view
  .get('/', (req, res) => res.render('logic.ejs'))
  .get('/aapl', (req, res) => res.render('aapl.ejs'))
  .get('/logic', (req, res) => res.render('logic.ejs'))

console.log(`View controller initialized!`)

module.exports = view