import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { PostRequestDTO, PostRequestQueryDTO, PostSearch } from "./dto/request/post.request.dto";
import { PostResponseDTO } from "./dto/response/post.response.dto";
import { PostService } from "./post.service";
import { CommentService } from "src/comment/comment.service";
import { Comment } from "@prisma/client";
import { Page, Pageable } from "src/common/page";
import { ApiOkResponsePaginated } from "src/common/decorator";
import { PostEntity } from "./entity/post.entity";

@Controller("/api/v1/posts")
@ApiTags("게시글 API")
export class PostController {
  constructor(private postService: PostService, private commentService: CommentService) {}

  @Get(":id")
  @ApiOperation({ summary: "게시글 단건 조회 API", description: "게시글을 조회한다." })
  @ApiOkResponse({ type: PostResponseDTO })
  async getPost(@Param("id") id: number): Promise<PostResponseDTO> {
    return new PostResponseDTO(await this.postService.getPost(id));
  }

  @Get()
  @ApiOperation({ summary: "게시글 조회 API", description: "게시글을 조회한다." })
  @ApiOkResponsePaginated(PostResponseDTO)
  @ApiExtraModels(PostSearch, Pageable)
  @ApiQuery({
    name: "search",
    required: true,
    style: "deepObject",
    type: "object",
    schema: {
      $ref: getSchemaPath(PostSearch),
    },
  })
  @ApiQuery({
    name: "pageable",
    required: true,
    style: "deepObject",
    type: "object",
    schema: {
      $ref: getSchemaPath(Pageable),
    },
  })
  async getPosts(@Query() requestDTO: PostRequestQueryDTO): Promise<Page<PostResponseDTO>> {
    let entityPage: Page<PostEntity> = await this.postService.getPosts(requestDTO);
    let responsePage: Page<PostResponseDTO> = new Page();
    responsePage.totalCnt = entityPage.totalCnt;
    responsePage.pageSize = entityPage.pageSize;
    responsePage.totalPages = entityPage.totalPages;
    responsePage.data = entityPage.data.map((elem) => new PostResponseDTO(elem));
    return responsePage;
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
