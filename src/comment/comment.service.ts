import { Injectable } from "@nestjs/common";
import { Comment } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { CommentRequestDTO } from "./dto/request/comment.request.dto";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getComment(id: number): Promise<Comment> {
    let Comment: Comment = await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        post: true,
      },
    });
    return Comment;
  }

  async getComments(): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    });
  }

  async createComment(data: CommentRequestDTO) {
    await this.prisma.comment.create({
      data: {
        author: {
          connect: {
            id: data.authorId,
          },
        },
        post: {
          connect: {
            id: data.postId,
          },
        },
        content: data.content,
      },
    });
  }

  async updateComment(id: number, data: CommentRequestDTO) {
    await this.prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        content: data.content,
      },
    });
  }

  async deleteComment(id: number) {
    await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}
