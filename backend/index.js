import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'
import users from './routes/users.js'

const app = new Koa()

app.use(koaBody())
app.use(cors())

app.use(users.routes());

app.listen(3001);