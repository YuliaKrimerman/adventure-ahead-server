const packDataService = {
	getAllPack(knex) {
		return knex.select('*').from('pack_data')
		//.join('users_data',{'users_data.id':'pack_data.user_id'})
	},
	
	getUsersPack(knex) {
		return knex.select('*').from('pack_data')
		.join('users_data',{'users_data.id':'pack_data.user_id'})
	},
	
	insertPackData(knex, newData) {
		return knex
			.insert(newData)
			.into('pack_data')
			.returning('*')
			.then(rows => {
				return rows[0]
			})
	},

	getById(knex, code) {
		return knex
			.from('pack_data')
			.select('*')
			.where('code', code)

	},
	
	getByUserId(knex, user_id) {
		console.log(user_id)
		return knex
			.from('travel_data')
			.select('*')
			.where('user_id', user_id )
	},
	


	deleteUserData(knex, id) {
		return knex('pack_data')
			.where({
				id
			})
			.delete()
	},

}
module.exports = packDataService;