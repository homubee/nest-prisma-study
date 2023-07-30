import { Injectable } from "@nestjs/common";
import { Post } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";
import { PostRequestDTO, PostRequestQueryDTO } from "./dto/request/post.request.dto";
import { Page } from "src/common/page";

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

  async getPosts(requestDTO: PostRequestQueryDTO): Promise<Page<Post>> {
    const { search, pageable } = requestDTO;
    let page: Page<Post> = new Page();
    let where = {
      title: {
        ...(search.title ? { contains: search.title } : {}),
      },
      content: {
        ...(search.content ? { contains: search.content } : {}),
      },
    };
    page.totalCnt = await this.prisma.post
      .aggregate({
        _count: {
          _all: true,
        },
        where: where,
      })
      .then((res) => res._count._all);
    page.pageSize = pageable.size;
    page.totalPages = page.getTotalPages();
    page.data = await this.prisma.post.findMany({
      skip: pageable.getSkip(),
      take: pageable.size,
      include: {
        author: true,
        board: true,
      },
      where: where,
    });
    return page;
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
