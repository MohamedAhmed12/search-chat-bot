import { Controller } from '@nestjs/common';
import { async } from 'rxjs';
import { WhatsappService } from './whatsapp.service';

@Controller( 'whatsapp' )
export class WhatsappController
{
    constructor( private readonly WhatsappService: WhatsappService )
    {
        this.starter();       
    }

    async starter(){
        await this.WhatsappService.launchChrome();
        var isLogin =  await this.WhatsappService.checkLogin();
        if (!isLogin) {
            await this.WhatsappService.getAndShowQR()
        }
        await this.WhatsappService.appendFunctionToPage();
        await this.WhatsappService.waitNewMessage();
    }
}
