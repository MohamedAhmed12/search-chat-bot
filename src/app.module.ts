import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]
})
export class AppModule {}
