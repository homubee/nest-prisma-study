import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class Page<T> {
  @ApiProperty()
  totalCnt: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  data: T[];

  getTotalPages() {
    return this.totalCnt > 0 ? Math.ceil(this.totalCnt / this.pageSize) : 0;
  }
}

export class Pageable {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  size: number;

  getSkip() {
    return (this.page - 1) * this.size;
  }
}
