import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PostRequestDTO } from "./dto/request/post.request.dto";
import { PostResponseDTO } from "./dto/response/post.response.dto";
import { PostService } from "./post.service";
import { CommentService } from "src/comment/comment.service";
import { Comment } from "@prisma/client";

@Controller("/api/v1/posts")
@ApiTags("게시글 API")
export class PostController {
  constructor(private postService: PostService, private commentService: CommentService) {}

  @Get(":id")
  @ApiOperation({ summary: "게시글 단건 조회 API", description: "게시글을 조회한다." })
  @ApiOkResponse({ type: PostResponseDTO })
  getPost(@Param("id") id: number): Promise<PostResponseDTO> {
    return this.postService.getPost(id);
  }

  @Get()
  @ApiOperation({ summary: "게시글 조회 API", description: "게시글을 조회한다." })
  @ApiOkResponse({ type: PostResponseDTO, isArray: true })
  getPosts(): Promise<PostResponseDTO[]> {
    return this.postService.getPosts();
  }

  @Get(":id/comments")
  @ApiOperation({ summary: "게시글 댓글 조회 API", description: "게시글의 댓글을 조회한다." })
  getCommentsByPostId(@Param("id") id: number): Promise<Comment[]> {
    return this.commentService.getCommentsByPostId(id);
  }

  @Post()
  @ApiOperation({ summary: "게시글 등록 API", description: "게시글을 등록한다." })
  createPost(@Body() requestDTO: PostRequestDTO) {
    this.postService.createPost(requestDTO);
  }

  @Put(":id")
  @ApiOperation({ summary: "게시글 수정 API", description: "게시글을 수정한다." })
  updatePost(@Param("id") id: number, @Body() requestDTO: PostRequestDTO) {
    this.postService.updatePost(id, requestDTO);
  }

  @Delete(":id")
  @ApiOperation({ summary: "게시글 삭제 API", description: "게시글을 삭제한다." })
  deletePost(@Param("id") id: number) {
    this.postService.deletePost(id);
  }
}
