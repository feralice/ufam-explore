import { Injectable, Logger } from '@nestjs/common';
import { Postagem, Prisma } from '@prisma/client';
import { TagRepository } from '../../../../modules/tag/infrastructure/tag.repository';
import { PostRepository } from '../../infrastructure/repositories/post.repository';

@Injectable()
export class FilteredPostsService {
  private readonly logger = new Logger(FilteredPostsService.name);

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

    this.logger.log(
      `Received filters - Area: ${area}, Curso: ${curso}, Tempo: ${tempo}`,
    );

    const orConditions: Prisma.PostagemWhereInput[] = [];

    if (area) {
      this.logger.log(`Fetching area tag for: ${area}`);
      const areaTag = await this.tagsRepository.findByName(area);

      if (areaTag && areaTag.tipo === 'area') {
        this.logger.log(`Found area tag: ${JSON.stringify(areaTag)}`);
        const cursos = await this.tagsRepository.findCoursesByAreaId(
          areaTag.id,
        );

        const cursoIds = cursos.map((curso) => curso.id);
        this.logger.log(`Courses in area: ${JSON.stringify(cursoIds)}`);

        orConditions.push(
          { tags: { some: { id: areaTag.id } } },
          { tags: { some: { id: { in: cursoIds } } } },
        );
      } else {
        this.logger.warn(`No area tag found for: ${area}`);
      }
    }

    if (curso) {
      this.logger.log(`Fetching course tag for: ${curso}`);
      const cursoTag = await this.tagsRepository.findByName(curso);

      if (cursoTag) {
        this.logger.log(`Found course tag: ${JSON.stringify(cursoTag)}`);
        orConditions.push({ tags: { some: { id: cursoTag.id } } });
      } else {
        this.logger.warn(`No course tag found for: ${curso}`);
      }
    }

    if (tempo) {
      this.logger.log(`Applying time filter for: ${tempo}`);
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

      this.logger.log(`Time filter condition: ${dateCondition}`);

      orConditions.push({
        createdAt: {
          gte: dateCondition,
        },
      });
    }

    if (orConditions.length > 0) {
      where = { ...where, OR: orConditions };
    }

    this.logger.log(`Final query condition: ${JSON.stringify(where)}`);
    const posts = await this.postRepository.findPostsByFilter(where);
    this.logger.log(`Found ${posts.length} posts`);

    return posts;
  }
}
