import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Pageable } from "src/common/page";
import { Type } from "class-transformer";
import { PostEntity } from "src/post/entity/post.entity";

export class PostSearch extends PartialType(PickType(PostEntity, ["title", "content"])) {}

export class PostRequestDTO extends PickType(PostEntity, ["authorId", "boardId", "title", "content"]) {}

export class PostRequestQueryDTO {
  @ApiProperty()
  search?: PostSearch;

  @ApiProperty()
  @Type(() => Pageable)
  pageable: Pageable;
}
