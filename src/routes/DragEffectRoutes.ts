import { Router } from 'express'
import DragEffectControllers from '../controllers/DragEffectController'

const Routes = Router()

Routes.get(
  '/',
  DragEffectControllers.getAllDrags
)
Routes.post(
  '/',
  DragEffectControllers.createDrag
)


export default Routes