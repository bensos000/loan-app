import Router from 'koa-router'
import db from '../database/index.js'

const router = new Router({
	prefix: '/users'
});


router.get('/', (ctx, next) => {
    const { users } = db.data;
	ctx.body = users;
	next();
});

router.post('/new', async (ctx, next) => {
	if (
		!ctx.request.body.fullname ||
		!ctx.request.body.email ||
		!ctx.request.body.phone ||
        !ctx.request.body.fundingAmount ||
        !ctx.request.body.yearlyRevenue
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data';
	} else {
        const { users } = db.data;
		users.push({
            id: users.length + 1,
			fullname: ctx.request.body.fullname,
			email: ctx.request.body.email,
			phone: ctx.request.body.phone,
            fundingAmount: ctx.request.body.fundingAmount,
            yearlyRevenue: ctx.request.body.yearlyRevenue
		});
        await db.write();
		ctx.response.status = 201;
		ctx.body = `New User added with id: ${users.length}`;
	}
	next();
});

router.put('/:id', async (ctx, next) => {
	if (
		!ctx.params.id
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the id of the user in the request';
	} else {
        const { users } = db.data;

        let currentUser = users.find((user) => user.id === parseInt(ctx.params.id))

        if(ctx.request.body.fullname) {
            currentUser.fullname = ctx.request.body.fullname;
        }
        if(ctx.request.body.email) {
		    currentUser.email = ctx.request.body.email;
        }
        if(ctx.request.body.phone) {
		    currentUser.phone = ctx.request.body.phone;
        }
        if(ctx.request.body.yearlyRevenue) {
		    currentUser.yearlyRevenue = ctx.request.body.yearlyRevenue;
        }
        if(ctx.request.body.fundingAmount) {
            currentUser.fundingAmount = ctx.request.body.fundingAmount;
        }

        users[currentUser.id - 1] = currentUser;

        await db.write();
		ctx.response.status = 201;
		ctx.body = `Updated User with id: ${currentUser.id}`;
	}
	next();
});

export default router;