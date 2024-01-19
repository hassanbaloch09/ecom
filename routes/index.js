
const users = require('./user.routes'),
	category= require('./category.routes'),
	subCategory= require('./subCategory.routes'),
	product= require('./product.routes')
	checkout= require('./checkout.routes'),
	payment= require('./payment.routes'),
	chat= require('./chat.routes'),

module.exports = [
	...users,
	...category,
	...subCategory,
	...product,
	...checkout,
	...payment,
	...chat
];
