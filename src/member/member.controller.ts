import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MemberRegisterRequestDTO } from "./dto/request/member.request.dto";
import { Member } from "@prisma/client";
import { MemberService } from "./member.service";

@Controller("/api/v1/members")
@ApiTags("회원 API")
@ApiBearerAuth("authorization")
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get(":id")
  @ApiOperation({ summary: "회원 단건 조회 API", description: "회원를 조회한다." })
  getMember(@Param("id") id: string): Promise<Member> {
    return this.memberService.getMember(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: "회원 조회 API", description: "회원를 조회한다." })
  getMembers(): Promise<Member[]> {
    return this.memberService.getMembers();
  }

  @Post()
  @ApiOperation({ summary: "회원 등록 API", description: "회원를 등록한다." })
  createMember(@Body() memberRegisterRequestDTO: MemberRegisterRequestDTO) {
    return this.memberService.createMember(memberRegisterRequestDTO);
  }
}
