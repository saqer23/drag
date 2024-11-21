import { Router } from 'express'
import UserControllers from '../controllers/UserController'

const Routes = Router()

Routes.get(
  '/',
  UserControllers.getAllUsers
)
Routes.post(
  '/',
  UserControllers.createUser
)
Routes.patch(
  '/:id',
  UserControllers.updateUser
)
Routes.delete(
  '/:id',
  UserControllers.deleteUser
)

export default Routes