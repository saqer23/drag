import { Router } from 'express'
import UserRoutes from './UserRoutes'
import AuthRoutes from './AuthRouters'
import DragRoutes from './DragRoutes'
import DragEffectRoutes from './DragEffectRoutes'

const rootRouter = Router()
rootRouter.use('/User', UserRoutes)
rootRouter.use('/Auth', AuthRoutes)
rootRouter.use('/Drag', DragRoutes)
rootRouter.use('/DragEffect', DragEffectRoutes)

export default rootRouter