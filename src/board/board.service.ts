import { Injectable } from "@nestjs/common";
import { Board } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { BoardRequestDTO } from "./dto/request/board.request.dto";

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async getBoard(id: number): Promise<Board> {
    let board: Board = await this.prisma.board.findUnique({
      where: {
        id: id,
      },
    });
    return board;
  }

  async getBoards(): Promise<Board[]> {
    return await this.prisma.board.findMany({});
  }

  async createBoard(data: BoardRequestDTO) {
    await this.prisma.board.create({
      data: {
        name: data.name,
      },
    });
  }

  async updateBoard(id: number, data: BoardRequestDTO) {
    await this.prisma.board.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
      },
    });
  }

  async deleteBoard(id: number) {
    await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
