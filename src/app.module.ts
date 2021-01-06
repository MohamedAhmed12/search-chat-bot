import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappSetupModule } from './whatsapp-setup/whatsapp-setup.module';
@Module({
  imports: [WhatsappSetupModule],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]
})
export class AppModule {}
