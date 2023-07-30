import { Injectable } from "@nestjs/common";
import { Comment } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { CommentCreateRequestDTO, CommentUpdateRequestDTO } from "./dto/request/comment.request.dto";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getComment(id: number): Promise<Comment> {
    let comment: Comment = await this.prisma.comment.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        post: true,
        childComments: true,
      },
    });
    return comment;
  }

  async getComments(): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    });
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    let comments: Comment[] = await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        author: true,
        post: true,
        childComments: true,
      },
    });
    return comments;
  }

  async createComment(data: CommentCreateRequestDTO) {
    await this.prisma.comment.create({
      data: {
        authorId: data.authorId,
        postId: data.postId,
        parentCommentId: data.parentCommentId ? data.parentCommentId : null,
        content: data.content,
      },
    });
  }

  async updateComment(id: number, data: CommentUpdateRequestDTO) {
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
