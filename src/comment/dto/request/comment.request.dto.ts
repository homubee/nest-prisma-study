import { ApiProperty } from "@nestjs/swagger";

export class CommentRequestDTO {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  content: string;
}
