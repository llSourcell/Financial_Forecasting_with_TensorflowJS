'use strict'

/**
 * Public API.
 */

const express = require('express'),
  publicapi = express.Router(),
  data = require('../data/AAPL.json')

publicapi
  .get("/", async (req, res) => {
    let reponseData = await data
    return res.send({status: 200, data: reponseData});
  })

console.log(`Public API initialized`);

module.exports = publicapi;