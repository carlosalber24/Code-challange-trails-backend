'use strict'

const routes = app => {
  app.use('/v1/trails/', require('../Components/Trails').routes)
}

module.exports = routes
