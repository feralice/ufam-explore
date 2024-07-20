import { Injectable } from '@nestjs/common';
import { Postagem, Prisma } from '@prisma/client';
import { TagRepository } from '../../../../modules/tag/infrastructure/tag.repository';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class FilteredPostsService {
  constructor(
    private readonly tagsRepository: TagRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async getFilteredPostagens(
    area?: string,
    curso?: string,
    tempo?: string,
  ): Promise<Postagem[]> {
    let where: Prisma.PostagemWhereInput = {};

    if (area) {
      const areaTag = await this.tagsRepository.findByName(area);

      if (areaTag && areaTag.tipo === 'area') {
        const cursos = await this.tagsRepository.findCoursesByAreaId(
          areaTag.id,
        );

        const cursoIds = cursos.map((curso) => curso.id);

        where = {
          ...where,
          OR: [
            { tags: { some: { id: areaTag.id } } },
            { tags: { some: { id: { in: cursoIds } } } },
          ],
        };
      }
    }

    if (curso) {
      const cursoTag = await this.tagsRepository.findByName(curso);

      if (cursoTag) {
        where = {
          ...where,
          tags: { some: { id: cursoTag.id } },
        };
      }
    }

    if (tempo) {
      let dateCondition: Date;
      const currentDate = new Date();
      switch (tempo) {
        case 'Hoje':
          dateCondition = new Date(currentDate);
          break;
        case 'Esta semana':
          dateCondition = new Date();
          dateCondition.setDate(currentDate.getDate() - 7);
          break;
        case 'Este mês':
          dateCondition = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1,
          );
          break;
        default:
          dateCondition = new Date(currentDate);
      }

      where = {
        ...where,
        createdAt: {
          gte: dateCondition,
        },
      };
    }

    return this.postRepository.findPostsByFilter(where);
  }
}
