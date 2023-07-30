import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CommentCreateRequestDTO, CommentUpdateRequestDTO } from "./dto/request/comment.request.dto";
import { CommentService } from "./comment.service";
import { Comment } from "@prisma/client";

@Controller("/api/v1/comments")
@ApiTags("댓글 API")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(":id")
  @ApiOperation({ summary: "댓글 단건 조회 API", description: "댓글을 조회한다." })
  getComment(@Param("id") id: number): Promise<Comment> {
    return this.commentService.getComment(id);
  }

  @Get()
  @ApiOperation({ summary: "댓글 조회 API", description: "댓글을 조회한다." })
  getComments(): Promise<Comment[]> {
    return this.commentService.getComments();
  }

  @Post()
  @ApiOperation({ summary: "댓글 등록 API", description: "댓글을 등록한다." })
  createComment(@Body() requestDTO: CommentCreateRequestDTO) {
    this.commentService.createComment(requestDTO);
  }

  @Put(":id")
  @ApiOperation({ summary: "댓글 수정 API", description: "댓글을 수정한다." })
  updateComment(@Param("id") id: number, @Body() requestDTO: CommentUpdateRequestDTO) {
    this.commentService.updateComment(id, requestDTO);
  }

  @Delete(":id")
  @ApiOperation({ summary: "댓글 삭제 API", description: "댓글을 삭제한다." })
  deleteComment(@Param("id") id: number) {
    this.commentService.deleteComment(id);
  }
}
