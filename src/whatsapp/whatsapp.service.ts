import { Injectable } from '@nestjs/common';
import * as Constants from '../constants';
import { AppService } from '../app.service';
import { Spinner } from '../plugins/ora';
const puppeteer = require( 'puppeteer' );
const path = require( 'path' );
const fs = require( 'fs' );
const spintax = require('mel-spintax')
const qrcode = require('qrcode-terminal')

@Injectable()
export class WhatsappService
{
    private browser: any;
    private page: any;
    private botFile: string;
    private botFileParsed: any;

    constructor( private readonly AppService: AppService, private Spinner:Spinner )
    {
    }

    async DownloadChrome(): Promise<any>
    {

        console.log( "Downloading chrome\n" );

        //  const browserFetcher = puppeteer.createBrowserFetcher({
        //      path: process.cwd()
        //  });
        //  const revInfo = await browserFetcher.download();

    }

    async launchChrome(): Promise<any>
    {
		this.Spinner.start('Launching Chrome')        

        var pptrArgv = [];
        // if (argv.proxyURI) {
        //     pptrArgv.push('--proxy-server=' + argv.proxyURI);
        // }
        
        this.botFile = await this.AppService.externalInjection("bot.json");
        this.botFileParsed = JSON.parse( this.botFile )

        let appconfig: object = this.botFileParsed.appconfig;
        let botJson: object = this.botFileParsed.botJson;
        const extraArguments = Object.assign( {} );

        extraArguments.userDataDir = Constants.DEFAULT_DATA_DIR;
        // launching chrome with defining whatsapp as the url 
        this.browser = await puppeteer.launch( {
            defaultViewport: null,
            headless: appconfig['headless'],
            userDataDir: path.join( process.cwd(), "ChromeSession" ),
            devtools: false,
            args: [...Constants.DEFAULT_CHROMIUM_ARGS, ...pptrArgv], ...extraArguments
        } );
        this.Spinner.stop("Launching Chrome ... done!" );
    }

    async appendFunctionToPage(): Promise<void> {
        await this.page.evaluate(`var intents = ${this.botFile}`)

        // Register a filesystem watcher
        fs.watch(path.join(process.cwd(), 'src',Constants.BOT_SETTINGS_FILE), (event, filename) => {
            setTimeout(() => {
                this.AppService.LoadBotSettings(event, filename, this.page)
            }, 500)
        })

        this.page.exposeFunction('getFile', this.AppService.getFileInBase64)
        this.page.exposeFunction('resolveSpintax', spintax.unspin)
    }

    async checkLogin()
    {
        console.log(await this.getPage());
        this.Spinner.start( 'Page is loading' )

        await this.AppService.delay(10000)

        var output =  await this.page.evaluate("localStorage['last-wid']")
        
        // console.log("\n" + output);
        
        if ( output )
        {
            let isLoggedIn = await this.injectScripts( )
            
            while (!isLoggedIn) {
                //console.log("this.page is loading");
                //TODO: avoid using delay and make it in a way that it would react to the event.
                await this.AppService.delay(300)
                isLoggedIn = await this.injectScripts()
            }

            this.Spinner.stop( 'Looks like you are already logged in' )
        } else {
            this.Spinner.info( 'You are not logged in. Please scan the QR below' )
        }

        return output
    }

    getPage(): string{
        return this.browser.pages()
        .then(pages => {
            if ( pages.length > 0 )
            {
                this.page = pages[0]
            }
            return "Opening Whatsapp ... done!";
        })
        .catch(e => e)
    }

    async getAndShowQR() {
        var scanMe = "img[alt='Scan me!'],canvas"
        await this.page.waitForSelector(scanMe);

        var imageData = await this.page.evaluate(
			`document.querySelector("${scanMe}").parentElement.getAttribute("data-ref")`
        )
        
        qrcode.generate(imageData, { small: true })
	    this.Spinner.start(
			'Waiting for scan \nKeep in mind that it will expire after few seconds'
        )
        
        var isLoggedIn = await this.injectScripts()

		while (!isLoggedIn) {
			//console.log("this.page is loading");
			//TODO: avoid using delay and make it in a way that it would react to the event.
			await this.AppService.delay(300)
			isLoggedIn = await this.injectScripts()
		}
		if (isLoggedIn) {
			this.Spinner.stop('Looks like you are logged in now')
			//console.log("Welcome, WBOT is up and running");
		}
    }

    async  injectScripts() {
		return await this.page
			.waitForSelector('[data-icon=laptop]')
			.then(async () => {
                var filepath = path.join(process.cwd(), 'src', 'whatsapp', 'WAPI.js')
                await this.page.addScriptTag({ path: require.resolve(filepath) })
                
				filepath = path.join(process.cwd(), 'src', 'whatsapp', 'inject.js')
                await this.page.addScriptTag({ path: require.resolve(filepath) })
                
				return true
			})
			.catch((e) => {
                console.log(e);
                
				console.log('User is not logged in. Waited 30 seconds.')
				return false
			})
    }
    
    async waitNewMessage() {

        // await this.page.evaluate(
        //     () => window['WAPI'].waitNewMessages(
        //         false,
        //         (data) => console.log(data)
        //     )
        // );
      
        // WAPI.waitNewMessages(false, async (data) => {
        //     return console.log(data);
            
        //     // for (let i = 0; i < data.length; i++) {
        //     //     //fetch API to send and receive response from server
        //     //     let message = data[i];
        //     //     const body = {
        //     //         text: message.body,
        //     //         type: 'message',
        //     //         user: message.chatId._serialized
        //     //     };
        //     //     //body.original = message;
        //     //     if (this.botFileParsed.appconfig.webhook) {
        //     //         fetch(this.botFileParsed.appconfig.webhook, {
        //     //             method: "POST",
        //     //             body: JSON.stringify(body),
        //     //             headers: {
        //     //                 'Content-Type': 'application/json'
        //     //             }
        //     //         }).then((resp) => resp.json()).then(function (response) {
        //     //             //response received from server
        //     //             console.log(response);
        //     //             WAPI.sendSeen(message.chatId._serialized);
        //     //             //replying to the user based on response
        //     //             if (response && response.length > 0) {
        //     //                 response.forEach(itemResponse => {
        //     //                     WAPI.sendMessage2(message.chatId._serialized, itemResponse.text);
        //     //                     //sending files if there is any 
        //     //                     if (itemResponse.files && itemResponse.files.length > 0) {
        //     //                         itemResponse.files.forEach((itemFile) => {
        //     //                             WAPI.sendImage(itemFile.file, message.chatId._serialized, itemFile.name);
        //     //                         })
        //     //                     }
        //     //                 });
        //     //             }
        //     //         }).catch(function (error) {
        //     //             console.log(error);
        //     //         });
        //     //     }
        //     //     window.log(`Message from ${message.chatId.user} checking..`);
        //     //     if (this.botFileParsed.blocked.indexOf(message.chatId.user) >= 0) {
        //     //         window.log("number is blocked by BOT. no reply");
        //     //         return;
        //     //     }
        //     //     if (message.type == "chat") {
        //     //         //message.isGroupMsg to check if this is a group
        //     //         if (message.isGroupMsg == true && this.botFileParsed.appconfig.isGroupReply == false) {
        //     //             window.log("Message received in group and group reply is off. so will not take any actions.");
        //     //             return;
        //     //         }
        //     //         var exactMatch = this.botFileParsed.bot.find(obj => obj.exact.find(ex => ex == message.body.toLowerCase()));
        //     //         var response = "";
        //     //         if (exactMatch != undefined) {
        //     //             response = await resolveSpintax(exactMatch.response);
        //     //             window.log(`Replying with ${response}`);
        //     //         } else {
        //     //             response = await resolveSpintax(this.botFileParsed.noMatch);
        //     //             window.log(`No exact match found. So replying with ${response} instead`);
        //     //         }
        //     //         var PartialMatch = this.botFileParsed.bot.find(obj => obj.contains.find(ex => message.body.toLowerCase().search(ex) > -1));
        //     //         if (PartialMatch != undefined) {
        //     //             response = await resolveSpintax(PartialMatch.response);
        //     //             window.log(`Replying with ${response}`);
        //     //         } else {
        //     //             console.log("No partial match found");
        //     //         }
        //     //         WAPI.sendSeen(message.chatId._serialized);
        //     //         WAPI.sendMessage2(message.chatId._serialized, response);
        //     //         console.log();
        //     //         if ((exactMatch || PartialMatch).file != undefined) {
        //     //             files = await resolveSpintax((exactMatch || PartialMatch).file);
        //     //             window.getFile(files).then((base64Data) => {
        //     //                 //console.log(file);
        //     //                 WAPI.sendImage(base64Data, message.chatId._serialized, (exactMatch || PartialMatch).file);
        //     //             }).catch((error) => {
        //     //                 window.log("Error in sending file\n" + error);
        //     //             })
        //     //         }
        //     //     }
        //     // }
        // });
    }
}
