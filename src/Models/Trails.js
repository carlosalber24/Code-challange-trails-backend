'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var TrailsSchema = new Schema({
	name: {
		type: String,
		required: true
	},
  description: {
		type: String,
		required: true
	},
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    }
  },
  difficulty: {
		type: String,
		required: true
	},
  length: {
		type: String,
		required: true
	},
  rating: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

TrailsSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Trails', TrailsSchema);