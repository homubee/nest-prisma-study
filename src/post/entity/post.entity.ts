import { ApiProperty } from "@nestjs/swagger";
import { Board, Comment, Member } from "@prisma/client";

export class PostEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  author?: Member;

  @ApiProperty()
  boardId: number;

  @ApiProperty()
  board?: Board;

  @ApiProperty()
  comments?: Comment[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  viewCnt: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
