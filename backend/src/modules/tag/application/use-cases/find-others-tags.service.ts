import { Tag } from "@prisma/client";
import { TagRepository } from "../../domain/tag.repository";

export class FindOthersTagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getOthersTags(): Promise<Tag[]> {
    return this.tagRepository.getOtherTags();
  }
}