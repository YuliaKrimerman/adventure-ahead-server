const express = require('express');
const xss = require('xss');
const path = require('path');
const packDataService = require('./pack-data-service')
const usersPackService = require ('../usersData/UsersPackService') 
const packRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require('../middleware/basic-auth')

const authRouter  = express.Router();


const serializeUserData = newData => ({
	id: newData.id,
	comments: xss(newData.comments),
	rating: xss(newData.rating)
})

packRouter
	.route('/packData/:user_id')
	.get((req, res, next) => {
		const knexInstance = req.app.get('db');
		usersPackService.getByUserId(
            req.app.get('db'),
            req.params.user_id
        )
			.then(allData => {
				res.json(allData.map(allData => ({
					...allData,
				})))
			})
			.catch(err => {
				next(err);
			});
	})

						 
						 
						 

module.exports = packRouter