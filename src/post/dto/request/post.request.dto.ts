import { ApiProperty } from "@nestjs/swagger";

export class PostRequestDTO {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  boardId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
