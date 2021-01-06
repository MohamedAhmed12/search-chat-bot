import { Controller } from '@nestjs/common';
import { WhatsappSetupService } from "./whatsapp-setup.service";

@Controller('whatsapp-setup')
export class WhatsappSetupController {
  constructor(private readonly WhatsappSetupService: WhatsappSetupService) {
    this.starter();
  }

  async starter() {
    await this.WhatsappSetupService.launchChrome();
    var isLogin = await this.WhatsappSetupService.checkLogin();
    if (!isLogin) {
      await this.WhatsappSetupService.getAndShowQR();
    }
    await this.WhatsappSetupService.appendFunctionToPage();
  }
}
