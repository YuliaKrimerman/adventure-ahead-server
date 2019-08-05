const usersPackService = {
	getAllTravel(knex) {
		return knex.select('*').from('users_pack_data')
		.join('users_data',{'users_data.id':'users_pack_data.user_id'})
	},

	insertDefaultPackList(knex, defaultPackList) {
		return knex
			.insert(defaultPackList)
			.into('users_pack_data')
			.returning('*')
			.then(rows => {
				return rows[0]
			})
	},
	
	getByUserId(knex, user_id) {
		console.log(user_id)
		return knex
			.from('users_pack_data')
			.select('*')
			.where('user_id', user_id )
	},
	


	deleteData(knex, id) {
		return knex('users_pack_data')
			.where({
				id
			})
			.delete()
	},

	updateData(knex, id, checked) {
		return knex('users_pack_data')
			.where({
				 id
			})
			.update(checked)
	},
}

module.exports = usersPackService;