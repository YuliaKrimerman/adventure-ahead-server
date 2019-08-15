const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const UsersPackService = require('./UsersPackService')
const xss = require('xss')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

const serializeUser = user => ({
    id: user.id,
    first_name: xss(user.first_name),
    last_name: xss(user.last_name),
    email: xss(user.email),
    date_created: new Date(user.date_created),
})

usersRouter
    .route('/user')
    .get((req, res, next) => {
        UsersService.getAllUsers(req.app.get('db'))
            .then(users => {
                res.json(users.map(serializeUser))
            })
            .catch(next)
    })

    .post(jsonBodyParser, (req, res, next) => {
        const { first_name, last_name, email, password } = req.body

        for (const field of ['first_name', 'last_name', 'email', 'password']) {
            if (!req.body[field]) {
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
            }
        }
        const passwordError = UsersService.validatePassword(password)

        if (passwordError) {
            return res.status(400).json({ error: passwordError })
        }

        UsersService.hasUserWithEmail(
            req.app.get('db'),
            email
        )
            .then(hasUserWithEmail => {
                if (hasUserWithEmail)
                    return res.status(400).json({ error: `Email already in use, please sign in!` })

                return UsersService.hashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            first_name,
                            last_name,
                            email,
                            password: hashedPassword,
                        }

                        return UsersService
                            .insertUser(req.app.get('db'), newUser)
                            .then(user => {
							console.log("here")
							
							const defaultPackList= [{list:'Lightweight clothing that can be layered',user_id:user.id,checked:false},
													{list:'Long-sleeved shirts',user_id:user.id,checked:false},
													{list:'Sweaters or fleece jacket',user_id:user.id,checked:false},
													{list:'T-shirts and tank tops (be respectful of the culture you are visiting)',user_id:user.id,checked:false},
													{list:'Belt – Check out this one for a ingenuitive money protection option',user_id:user.id,checked:false},
													{list:'Socks – wool socks are best for hiking',user_id:user.id,checked:false},
													{list:'Comfortable walking shoes',user_id:user.id,checked:false},
													{list:'Rain jacket, windbreaker or umbrella',user_id:user.id,checked:false},
													{list:'Pajamas/sleepwear',user_id:user.id,checked:false},
													{list:'Underwear',user_id:user.id,checked:false},
													{list:'Sunglasses and glasses case',user_id:user.id,checked:false},
													{list:'Dresses and/or skirts',user_id:user.id,checked:false},
													{list:'Jewelry – organize in a mini cube or circlet',user_id:user.id,checked:false},
													{list:'Hat or sun visor',user_id:user.id,checked:false},
													{list:'Scarf or bandana',user_id:user.id,checked:false},
													{list:'Swimsuit or swim trunks – consider a wet/dry organizer',user_id:user.id,checked:false},
													{list:'Cell phone and charger',user_id:user.id,checked:false},
													{list:'Travel speakers',user_id:user.id,checked:false},
													{list:'Electric converters and adapters',user_id:user.id,checked:false},
													{list:'Travel apps that will help with language, directions, and money conversion',user_id:user.id,checked:false},
													{list:'Sunscreen',user_id:user.id,checked:false},
													{list:'Toiletries',user_id:user.id,checked:false},
													{list:'Passport and Travel Documents',user_id:user.id,checked:false},
													{list:'Credit Card Travel Notice',user_id:user.id,checked:false},
													{list:'Travel Insurance',user_id:user.id,checked:false}
												   ]
							 return UsersPackService
                            .insertDefaultPackList(req.app.get('db'), defaultPackList)
                            .then(output => {
							console.log(output)
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(serializeUser(user))
                            })
							
					
							
					
                            })
                    })
            })
            .catch(next)
    })


usersRouter
    .route('/user/:id')
    .all((req, res, next) => {
        const { id } = req.params;
        UsersService.getById(req.app.get('db'), id)
            .then(user => {
                if (!user) {
                    logger.info(`User with id:${id} doesn't exist`);
                    return res
                        .status(404)
                        .send({ error: { message: `User doesn't exist` } })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(serializeUser(res.user))
    })
    .patch(jsonBodyParser, (req, res, next) => {
        const updatedUserInfo = { ...req.body, date_created: 'now()' }
        for (const [key, value] of Object.entries(updatedUserInfo)) {
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        }
        return UsersService.updateUserInfo(
            req.app.get('db'),
            req.params.id,
            updatedUserInfo
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        const { id } = req.params;
        UsersService.deleteUser(
            req.app.get('db'),
            id
        )
            .then(numRowsAffected => {
                logger.info(`User with id ${id} deleted`)
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = usersRouter