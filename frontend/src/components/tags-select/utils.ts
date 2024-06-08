import { Tag } from "../../store/post/types";

export const combineTags = (tagsForNewPost: Tag[], localTags: string[]) => {
  return Array.from(
    new Set([...tagsForNewPost.map((tag) => tag.nome), ...localTags])
  );
};

export const createTagObjects = (localTags: string[], allTags: Tag[]) => {
  return localTags.map((tagName) => {
    const existingTag = allTags.find((t) => t.nome === tagName);
    if (existingTag) {
      return existingTag;
    } else {
      return { id: Date.now().toString(), nome: tagName };
    }
  });
};
