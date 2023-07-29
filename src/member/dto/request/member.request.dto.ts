import { ApiProperty } from "@nestjs/swagger";

export class MemberRegisterRequestDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
