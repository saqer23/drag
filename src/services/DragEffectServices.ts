// src/services/DragEffectService.ts
import { prisma } from "../utility/prisma";
import { DatabaseError } from "../errors/DatabaseError";
import { NotFoundError } from "../errors/NotFoundError";

export class DragEffectService {
  public async getAllDrags(filterData: any) {
    try {
      const { drag1Id, drag2Id } = filterData;
    const existDrag1 = await prisma.drag.findUnique({
      where: { id: drag1Id },
    });
    if (!existDrag1) {
      throw new NotFoundError(`drag not found .`);
    }

    const existDrag2 = await prisma.drag.findUnique({
      where: { id: drag2Id },
    });
    if (!existDrag2) {
      throw new NotFoundError(`drag not found .`);
    }
    const drag = await prisma.dragEffect.findFirst({
      where: {
        OR: [
          {
            drag1Id: drag1Id,
            drag2Id: drag2Id,
          },
          {
            drag2Id: drag1Id,
            drag1Id: drag2Id,
          },
        ],
      },
      include: {
        drag1: true,
        drag2: true,
      },
    });
      return drag;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Error: ", error);
    }
  }

  public async createDrag(data: any) {
    try {
    const { drag1Id, drag2Id, status, content } = data;
    const existDrag1 = await prisma.drag.findUnique({
      where: { id: drag1Id },
    });
    if (!existDrag1) {
      throw new NotFoundError(`drag not found .`);
    }

    const existDrag2 = await prisma.drag.findUnique({
      where: { id: drag2Id },
    });
    if (!existDrag2) {
      throw new NotFoundError(`drag not found .`);
    }
    const drag = await prisma.dragEffect.create({
      data: { status: Boolean(status), content, drag1Id, drag2Id },
    });
    return drag
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Error: ", error);
    }
  }
}

export default new DragEffectService();