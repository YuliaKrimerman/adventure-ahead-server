const express = require('express');
const xss = require('xss');
const path = require('path');
const travelDataService = require('./travel-data-service')
const travelRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require('../middleware/basic-auth')

const authRouter  = express.Router();

const serializeBookmark = bookmark => ({
    id: bookmark.id,
    name: bookmark.name,
	snippet: bookmark.snippet

})


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
					.json(newTravelData)
			})
			.catch(next)
	});
						 
						 
travelRouter
  .route('/listTravel/:user_id')
    .all((req, res, next) => {
        travelDataService.getByUserId(
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
	
travelRouter
  .route('/listTravel/:user_id/:id')
	.all((req, res, next) => {
        const {
            id
        } = req.params
        travelDataService.getById(req.app.get('db'), id)
            .then(bookmark => {
                if (!bookmark) {
                    //logger.error(`Bookmark with id ${bookmark_id} not found.`)
                    return res.status(404).json({
                        error: {
                            message: `Bookmark Not Found`
                        }
                    })
                }
                res.bookmark = bookmark
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(serializeBookmark(res.bookmark))
    })
    .delete((req, res, next) => {
        const {
            id
        } = req.params
        travelDataService.deleteData(
                req.app.get('db'),
               id
            )
            .then(numRowsAffected => {
              //  logger.info(`Bookmark with id ${bookmark_id} deleted.`)
                res.status(204).end()
            })
            .catch(next)
    })

			
	travelRouter
	.route('/listTravel/:user_id/')
	.get((req, res, next) => {
		const knexInstance = req.app.get('db');
		travelDataService.getLatestId(knexInstance)
			.then(id => {
				res.json(id)
			})
			.catch(err => {
				next(err);
			});
	})
			
			
	.post(requireAuth,jsonParser,(req, res, next) => {
		const knexInstance = req.app.get('db');
		const {snippet,name,user_id} = req.body
		travelDataService.getLatestId(req.app.get('db') )
			.then(latestIdValue => {
			console.log(latestIdValue[0].id)
			const newData = {snippet,name,user_id,id:(latestIdValue[0].id+1)}
			console.log(newData)
			 	travelDataService.insertData(req.app.get('db'), newData)
			.then(newTravelData => {
				res
					.status(201)
					.json(newTravelData)
			})
			.catch(next) 
			
			
			
				//res
					//.status(201)
					//.json(latestIdValue)
			})
			.catch(next)
		
		
	});
						 


module.exports = travelRouter;