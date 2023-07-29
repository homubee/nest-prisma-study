import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PostRequestDTO } from "./dto/request/post.request.dto";
import { PostResponseDTO } from "./dto/response/post.response.dto";
import { PostService } from "./post.service";

@Controller("/api/v1/posts")
@ApiTags("게시글 API")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(":id")
  @ApiOperation({ summary: "게시글 단건 조회 API", description: "게시글을 조회한다." })
  getPost(@Param("id") id: string): Promise<PostResponseDTO> {
    return this.postService.getPost(parseInt(id));
  }

  @Get()
  @ApiOperation({ summary: "게시글 조회 API", description: "게시글을 조회한다." })
  getPosts(): Promise<PostResponseDTO[]> {
    return this.postService.getPosts();
  }

  @Post()
  @ApiOperation({ summary: "게시글 등록 API", description: "게시글을 등록한다." })
  createPost(@Body() postRequestDTO: PostRequestDTO) {
    this.postService.createPost(postRequestDTO);
  }

  @Put(":id")
  @ApiOperation({ summary: "게시글 수정 API", description: "게시글을 수정한다." })
  updatePost(@Param("id") id: string, @Body() postRequestDTO: PostRequestDTO) {
    this.postService.updatePost(parseInt(id), postRequestDTO);
  }

  @Delete(":id")
  @ApiOperation({ summary: "게시글 삭제 API", description: "게시글을 삭제한다." })
  deletePost(@Param("id") id: string) {
    this.postService.deletePost(parseInt(id));
  }
}
