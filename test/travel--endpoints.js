const knex = require('knex')
const app = require('../src/app')



describe('Pack List Endpoints', function() {
  let db

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


  describe(`GET /listTravel`, () => {
    context(`Given no items`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/listTravel')
          .expect(200, [])
      })
    })

    context('Given there are items in the database', () => {
        const testItems = helpers.makeItemsArray()
        const testUsers = helpers.makeUsersArray()
        beforeEach('insert items', () => {
            return db
                .into('travel_data')
                .insert(testTravel)
        })

      it('responds with 200 and all of the beverages', () => {
        const expectedItems = helpers.makeItemsArray()
        
        return supertest(app)
          .get('/listTravel')
          .expect(200, expectedItems)
      })
    })   

  describe(`GET /listTravel/:id`, () => {
    context(`Given no items`, () => {
      it(`responds with 404`, () => {
        const bevId = 123456
        return supertest(app)
          .get(`/listTravel/${:id}`)
          .expect(404, { error: { message:`Item doesn't exist` } })
      })
    })
  

    context('Given there are items in the database', () => {
        const testItems = helpers.makeItemsArray()

      beforeEach('insert items', () =>{
        return db
            .into('testTravel')
            .insert(testBeverages)
      })
    })
    })
  })

   describe(`POST /listTravel`, () => {
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
        .post('/listTravel')
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