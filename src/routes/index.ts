import { Router } from 'express'
import UserRoutes from './UserRoutes'
import AuthRoutes from './AuthRouters'
import DragRoutes from './DragRoutes'

const rootRouter = Router()
rootRouter.use('/User', UserRoutes)
rootRouter.use('/Auth', AuthRoutes)
rootRouter.use('/Drag', DragRoutes)

export default rootRouter