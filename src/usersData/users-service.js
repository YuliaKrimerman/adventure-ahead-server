const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/

const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users_data')
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password needs to be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain 1 upper case, lower case, number and special character'
        }
        return null
    },
    hasUserWithEmail(db, email) {
        return db('users_data')
            .where({ email })
            .first()
            .then(user => !!user)
    },
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('users_data')
            .returning('*')
            .then(([user]) => user)
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    deleteUser(knex, id) {
        return knex('users_data')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex.from('users_data').select('*').where('id', id).first()
    },
    updateUserInfo(knex, id, newUserFields) {
        return knex('users_data')
            .where({ id })
            .update(newUserFields)
    },


}

module.exports = UsersService