import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { AppService } from '../app.service';
import { Spinner } from "../plugins/ora";

@Module({
  providers: [WhatsappService, AppService, Spinner],
  controllers: [WhatsappController],
  imports:[AppService]

})
export class WhatsappModule {}
