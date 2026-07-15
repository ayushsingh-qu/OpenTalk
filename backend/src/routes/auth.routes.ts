import { Hono } from 'hono'
import { registerUser,loginUser,logoutUser,updateUser } from '../controllers/auth.controllers'

const AuthRouter = new Hono<{
 Bindings:{
  DATABASE_URL:string,     //c.env ke datatype ko define karenge to typr error nahi aayega
  JWT_SECRET:string
 }
}>()

AuthRouter.post('/signup' , registerUser)
AuthRouter.post('/signin' , loginUser)
AuthRouter.get('/logout' , logoutUser)
AuthRouter.put('/me' , updateUser)




export default AuthRouter