import { ApiProperty } from "@nestjs/swagger";
import { Pageable } from "src/common/page";
import { Type } from "class-transformer";

export class PostSearch {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

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

export class PostRequestQueryDTO {
  @ApiProperty()
  search?: PostSearch;

  @ApiProperty()
  @Type(() => Pageable)
  pageable: Pageable;
}
