import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BoardService } from "./board.service";
import { Board } from "@prisma/client";
import { BoardRequestDTO } from "./dto/request/board.request.dto";

@Controller("/api/v1/board")
@ApiTags("게시판 API")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(":id")
  @ApiOperation({ summary: "게시판 단건 조회 API", description: "게시판을 조회한다." })
  getBoard(@Param("id") id: number): Promise<Board> {
    return this.boardService.getBoard(id);
  }

  @Get()
  @ApiOperation({ summary: "게시판 조회 API", description: "게시판을 조회한다." })
  getBoards(): Promise<Board[]> {
    return this.boardService.getBoards();
  }

  @Post()
  @ApiOperation({ summary: "게시판 등록 API", description: "게시판을 등록한다." })
  createBoard(@Body() requestDTO: BoardRequestDTO) {
    this.boardService.createBoard(requestDTO);
  }

  @Put(":id")
  @ApiOperation({ summary: "게시판 수정 API", description: "게시판을 수정한다." })
  updateBoard(@Param("id") id: number, @Body() requestDTO: BoardRequestDTO) {
    this.boardService.updateBoard(id, requestDTO);
  }

  @Delete(":id")
  @ApiOperation({ summary: "게시판 삭제 API", description: "게시판을 삭제한다." })
  deleteBoard(@Param("id") id: number) {
    this.boardService.deleteBoard(id);
  }
}
