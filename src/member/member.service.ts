import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { MemberRegisterRequestDTO } from "./dto/request/member.request.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async getMember(id: number): Promise<Member> {
    return await this.prisma.member.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMembers(): Promise<Member[]> {
    return await this.prisma.member.findMany({});
  }

  async createMember(data: MemberRegisterRequestDTO): Promise<Member> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    return await this.prisma.member.create({
      data,
    });
  }

  async deleteMember(id: number): Promise<Member> {
    return await this.prisma.member.delete({
      where: {
        id: id,
      },
    });
  }
}
