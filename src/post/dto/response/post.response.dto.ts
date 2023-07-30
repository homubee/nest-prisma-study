import { ApiProperty } from "@nestjs/swagger";
import { Member, Comment } from "@prisma/client";

export class PostResponseDTO {
  @ApiProperty()
  author?: Member;

  @ApiProperty()
  comments?: Comment[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  viewCnt: number;
}
