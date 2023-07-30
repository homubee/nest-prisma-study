import { ApiProperty } from "@nestjs/swagger";

export class MemberResponseDTO {
  @ApiProperty()
  email: string;
}
