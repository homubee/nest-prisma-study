import { OmitType } from "@nestjs/swagger";
import { PostEntity } from "src/post/entity/post.entity";

export class PostResponseDTO extends OmitType(PostEntity, ["authorId", "boardId"]) {
  constructor(post: PostEntity) {
    super();
    this.author = post.author;
    this.board = post.board;
    this.comments = post.comments;
    this.title = post.title;
    this.content = post.content;
    this.viewCnt = post.viewCnt;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}
