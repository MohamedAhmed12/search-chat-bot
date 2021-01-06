import { Module } from '@nestjs/common';
import { WhatsappSetupService } from './whatsapp-setup.service';
import { WhatsappSetupController } from './whatsapp-setup.controller';

import { AppService } from '../app.service';
import { Spinner } from '../plugins/ora';

@Module({
  providers: [WhatsappSetupService, AppService, Spinner],
  controllers: [WhatsappSetupController],
  imports: [AppService],
})
export class WhatsappSetupModule {}
