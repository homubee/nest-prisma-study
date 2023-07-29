import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MemberModule } from "./member/member.module";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { AuthModule } from "./auth/auth.module";
import { CommonModule } from "./common/common.module";
import { BoardModule } from './board/board.module';

@Module({
  imports: [CommonModule, MemberModule, PostModule, CommentModule, AuthModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
