const travelDataService = {
	getAllTravel(knex) {
		return knex.select('*').from('travel_data')
		.join('users_data',{'users_data.id':'travel_data.user_id'})
	},

	insertData(knex, newData) {
		return knex
			.insert(newData)
			.into('travel_data')
			.returning('*')
			.then(rows => {
				return rows[0]
			})
	},

	getByUserId(knex, user_id) {
		return knex
			.from('travel_data')
			.select('*')
			.where('user_id', user_id )
	},
	
		getById(knex, id) {
		return knex
			.from('travel_data')
			.select('*')
			.where('id', id)
			.first()
	},

  getLatestId(knex,id){
	  return knex
	  .from('travel_data')
	  .select('id')
	  .orderBy('id', 'desc')
	  .limit(1)
  },
	deleteData(knex, id) {
		return knex('travel_data')
			.where({
				id
			})
			.delete()
	},

	updateData(knex, id, newDataFields) {
		return knex('travel_data')
			.where({
				id
			})
			.update(newFolderFields)
	},
}

module.exports = travelDataService;
