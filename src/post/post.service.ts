import { Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { PostRequestDTO } from "./dto/request/post.request.dto";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(id: number): Promise<Post> {
    let post: Post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        board: true,
      },
    });
    return post;
  }

  async getPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        author: true,
        board: true,
      },
    });
  }

  async createPost(data: PostRequestDTO) {
    await this.prisma.post.create({
      data: {
        author: {
          connect: {
            id: data.authorId,
          },
        },
        board: {
          connect: {
            id: data.boardId,
          },
        },
        title: data.title,
        content: data.content,
      },
    });
  }

  async updatePost(id: number, data: PostRequestDTO) {
    await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async deletePost(id: number) {
    await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
