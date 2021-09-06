'use strict'

import _ from 'lodash';
import TrailsModel from '../../models/Trails';
const Utils = require("../../Utils/helpers");

export default class TrailsController {

  async create(req, res) {
    try {
      const data = req.body.data;
      if (!Utils.isEmpty(data) || !Utils.validateTrailData(data)) { throw 'Error data validation'; }

      const Trails =  new TrailsModel();
      Trails.name = data.name;
      Trails.description = data.description;
      Trails.location.coordinates = [data.latitude.trim(), data.longitude.trim()]
      Trails.difficulty = data.difficulty;
      Trails.length = data.lengthRate;
      Trails.rating = data.rating;
      Trails.save();

      Utils.apiSendData({
        'status': true, 
        'message': 'Trail saved successfully',
        'data': null,
        'error': ''
      }, res);

    } catch (e) {
      Utils.apiSendData({
        'status': false, 
        'message': '',
        'data': null,
        'error': e
      }, res);
    }
  }

  async getList(req, res) {
    try {
      const coordinates = req.query.defaultLocation.split(",")
      const params = {};

      if (req.query.difficulty) params.difficulty = req.query.difficulty;

      if (req.query.lengthRate) params.length = req.query.lengthRate;

      if (req.query.rating) params.rating = req.query.rating;

      if (coordinates[0] === '0' && coordinates[1] === '0') params.sort = "rating";

      if (coordinates[0] !== '0' && coordinates[1] !== '0') {
        params.location = {
          $near: {
            $geometry: {
               type: "Point" ,
               coordinates: [ coordinates[0] , coordinates[1] ]
            },
          }
        };
      }

      const Trails =  await TrailsModel.find(params).exec();
      const data = [];
      for(const trail of Trails) {
        data.push({
          name: trail.name,
          description: trail.description,
          latitude: trail.location.coordinates[0],
          longitude: trail.location.coordinates[1],
          difficulty: trail.difficulty,
          lengthRate: trail.length,
          rating: trail.rating
        })
      }

      Utils.apiSendData({
        'status': true, 
        'message': '',
        'data': data,
        'error': ''
      }, res);

    } catch (e) {
      Utils.apiSendData({
        'status': false, 
        'message': '',
        'data': null,
        'error': e
      }, res);
    }
  }
}
