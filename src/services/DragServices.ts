// src/services/dragService.ts
import { prisma } from "../utility/prisma";
import { DatabaseError } from "../errors/DatabaseError";
import { NotFoundError } from "../errors/NotFoundError";
import convertEqualsToInt from "../utility/convertToInt";
import convertTopLevelStringBooleans from "../utility/convertTopLevelStringBooleans";
import { hashPassword } from "../passport-config";

export class dragService {
  public async getAllDrags(filterData: any) {
    try {
      const { page, pageSize } = filterData;
      const { orderBy } = filterData;
      let { include } = filterData;
      delete filterData.orderBy;
      delete filterData.page;
      delete filterData.pageSize;
      delete filterData.include;
      if (include) {
        const convertTopLevel = convertTopLevelStringBooleans(include);
        include = convertTopLevel;
      } else {
        include = [];
      }
      const convertString = convertEqualsToInt(filterData);
      filterData = convertString;
      if (page && pageSize) {
        const skip = (+page - 1) * +pageSize;
        const take = +pageSize;
        const drags = await prisma.drag.findMany({
          where: { ...filterData },

          skip: +skip,
          take: +take,
          orderBy,
        });
        const total = await prisma.drag.count({
          where: { ...filterData },
        });

        return {
          info: drags,
          total,
          page,
          pageSize,
        };
      }

      const drags = await prisma.drag.findMany({
        where: { ...filterData },
      });
      return drags;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Error: ", error);
    }
  }

  public async createDrag(data: any) {
    try {
      return await prisma.drag.create({
        data: {
          name: data.name,
          type: data.type,
          company: data.company,
        },
      });
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Error: ", error);
    }
  }

  public async updateDrag(id: string, data: any) {
    try {
      const dragExist = await prisma.drag.findFirst({
        where: {
          id: id,
        },
        
      });
      if (!dragExist) {
        throw new NotFoundError("drag not found");
      }
      const drag = await prisma.drag.update({
        where: {
          id: id,
        },
        data: {
          name: data.name ? data.name : dragExist.name,
          type: data.type ? data.type : dragExist.type,
          company: data.company ? data.company : dragExist.company,
        },
      });
      return drag;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Error: ", error);
    }
  }

  public async deleteDrag(id: string): Promise<string | null> {
    try {
      const drag = await prisma.drag.findUnique({ where: { id } });
      if (!drag) {
        throw new NotFoundError(`drag with id ${id} not found.`);
      }
      const dragName = drag.name;
      await prisma.drag.delete({
        where: { id },
      });
      return dragName;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new DatabaseError("Error deleting drag.", error);
    }
  }

}

export default new dragService();