module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL || 'postgres://vexeyxonmgpnev:04b6cafc81b063b5193de2f8949ed189d9d571c406b7e0965e29044bdec7e478@ec2-23-21-186-85.compute-1.amazonaws.com:5432/d30pnkhh3skp4r',
	CLIENT_ORIGIN:process.env.CLIENT_ORIGIN || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}