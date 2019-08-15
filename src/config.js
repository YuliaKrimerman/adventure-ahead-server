module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgres://lstenncndthnyl:5d680ef8fc125afe1854b5437d0910d2bd802bdabaa8fbfbd58acdb70f21254e@ec2-75-101-131-79.compute-1.amazonaws.com:5432/ddd831l7m7theb',
	 CLIENT_ORIGIN:process.env.CLIENT_ORIGIN || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}