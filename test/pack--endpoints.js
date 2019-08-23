    
const knex = require('knex')
const app = require('../src/app')



describe('Travel Endpoints', function() {
  let db

  const testUsers = helpers.makeUsersArray()
  const testTravel = helpers.makeTravelArray()

  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.email,
      algorithm: 'HS256',
    })
    return `bearer ${token}`
  }

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  beforeEach('insert users', () => {
      return db.into('users_data').insert(testUsers)
  })
  beforeEach('insert beverages', () => {
    return db.into('useres_pack_data').insert(testTravel)
  })

  describe(`GET /packData`, () => {
   context(`Given no items`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/packData')
          .expect(200, [])
      })
    })

    context('Given there are items in the database', () => {
        const testItems = helpers.makeItemsArray()
        const testUsers = helpers.makeUsersArray()
        beforeEach('insert items', () => {
            return db
                .into('users_pack_data')
                .insert(testTravel)
        })

      it('responds with 200 and all of the beverages', () => {
        const expectedItems = helpers.makeItemsArray()
        
        return supertest(app)
          .get('/packData')
          .expect(200, expectedItems)
      })
    })   

  describe(`GET /packData/:id`, () => {
    context(`Given no items`, () => {
      it(`responds with 404`, () => {
        const itemId = 123456
        return supertest(app)
          .get(`/listTravel/${:id}`)
          .expect(404, { error: { message:`Item doesn't exist` } })
      })
    })
  

    context('Given there are items in the database', () => {
        const testItems = helpers.makeItemsArray()

      beforeEach('insert items', () =>{
        return db
            .into('testPack')
            .insert(testItems)
      })
    })
    })
  })

   describe(`POST /packData`, () => {
    context(`Given no items`, () => {
      it(`responds with 404`, () => {
        const bevId = 123456
        return supertest(app)
          .get(`/listTravel/${:id}`)
          .expect(404, { error: { message:`Item doesn't exist` } })
      })
    })

     it(`creates an item responding with 201 and the new item`, () =>{
       const newItem = {
          id: 1,
          item_type: 'Item Type 1',
          item_bame: 'Test Bev 1',
          description: 'Test description 1',
        
       }

       return supertest(app)
        .post('/packData')
        .send(newItem)
        .expect(201)
        .expect(res => {
          expect(res.body.item_type).to.eql(newBeverage.item_type)
          expect(res.body.item_bame).to.eql(newBeverage.item_bame)
          expect(res.body.description).to.eql(newBeverage.description)

        })
        .then(res =>
          supertest(app)
            .get(`/listItem/${res.body.id}`)
            .expect(res.body)
        )
     })

   })
})