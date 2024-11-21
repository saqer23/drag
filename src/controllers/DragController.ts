import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ValidationError } from '../errors/ValidationError'
import DragService from '../services/DragServices'

class DragController {
  public async getAllDrags(req: Request, res: Response): Promise<void> {
    try {
      const filterData = req.query
      const drags = await DragService.getAllDrags(filterData)
      res.status(200).json(drags)
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        statusCode: error.statusCode || 500,
        message: error.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Optionally include stack trace in development
        originalError: error.originalError
          ? error.originalError.message
          : undefined,
      })
    }
  }

  public async createDrag(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body
      const drags = await DragService.createDrag(data)
      res.status(201).json(drags)
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        statusCode: error.statusCode || 500,
        message: error.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Optionally include stack trace in development
        originalError: error.originalError
          ? error.originalError.message
          : undefined,
      })
    }
  }

  public async updateDrag(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id
      const data = req.body
      
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(new ValidationError('Validation Failed', errors.array()))
      }
      const drags = await DragService.updateDrag(id, data)
      res.status(200).json(drags)
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        statusCode: error.statusCode || 500,
        message: error.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Optionally include stack trace in development
        originalError: error.originalError
          ? error.originalError.message
          : undefined,
      })
    }
  }

  public async deleteDrag(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id
      const deletedDragName = await DragService.deleteDrag(id)
      res.status(200).json({
        message: `The Drag '${deletedDragName}' has been successfully deleted`,
      })
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        statusCode: error.statusCode || 500,
        message: error.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Optionally include stack trace in development
        originalError: error.originalError
          ? error.originalError.message
          : undefined,
      })
    }
  }
}

export default new DragController()
