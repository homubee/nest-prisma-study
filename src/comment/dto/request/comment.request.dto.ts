import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class CommentCreateRequestDTO {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  parentCommentId?: number;

  @ApiProperty()
  content: string;
}

export class CommentUpdateRequestDTO extends PartialType(
  OmitType(CommentCreateRequestDTO, ["authorId", "postId", "parentCommentId"])
) {}
