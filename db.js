const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
	'telega_bot',
	'postgres',
	'1',
	{
		dialect: 'postgres',
		host: 15,
		port: 1,
	},
);
