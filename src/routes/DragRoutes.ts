import { Router } from 'express'
import DragControllers from '../controllers/DragController'

const Routes = Router()

Routes.get(
  '/',
  DragControllers.getAllDrags
)
Routes.post(
  '/',
  DragControllers.createDrag
)
Routes.patch(
  '/:id',
  DragControllers.updateDrag
)
Routes.delete(
  '/:id',
  DragControllers.deleteDrag
)

export default Routes