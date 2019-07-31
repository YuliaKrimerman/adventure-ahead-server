const express = require('express');
const xss = require('xss');
const path = require('path');
const travelDataService = require('./travel-data-service')
const travelRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require('../middleware/basic-auth')
const authRouter  = express.Router();




travelRouter
	.route('/listTravel/')
	.get((req, res, next) => {
		const knexInstance = req.app.get('db');
		travelDataService.getAllTravel(knexInstance)
			.then(wines => {
				res.json(wines.map(wines => ({
					...wines,
				})))
			})
			.catch(err => {
				next(err);
			});
	})
	.post(requireAuth,jsonParser,(req, res, next) => {
		const knexInstance = req.app.get('db');
		
	
		const {poi_id,snippet,name,user_id} = req.body
		const newData = {poi_id,snippet,name,user_id}

	
		travelDataService.insertData(req.app.get('db'), newData)
			.then(newTravelData => {
				res
					.status(201)
			//.location('/listTravel/${user_id}`')
					.json(newTravelData)
			})
		
			
			.catch(next)
	});
						 
travelRouter
  .route('/listTravel/:user_id')
    .all((req, res, next) => {
        travelDataService.getById(
            req.app.get('db'),
            req.params.user_id
        )
            .then(note => {
                if (!note) {
                    return res.status(404).json({
                        error: { message: `note doesn't exist` }
                    })
                }
             res.note = note // save the note for the next middleware
              next() // don't forget to call next so the next middleware happens!
            })
            .catch(next)
    })


   .get((req, res, next) => {
        res.json(res.note)
    })



module.exports = travelRouter;