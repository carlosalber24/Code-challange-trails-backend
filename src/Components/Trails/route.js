'use strict'

import express from 'express'
import TrailsController from './controller'

const trailsController = new TrailsController()
const router = new express.Router() // New is optional, we added it for ESLint

/**
 * Get trails list
 */
router.get('/list', trailsController.getList.bind(trailsController))

/**
 * Create new trails
 */
 router.post('/create', trailsController.create.bind(trailsController))

export default router
