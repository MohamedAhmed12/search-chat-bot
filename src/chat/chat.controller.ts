import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly ChatService: ChatService) {
    this.messageObserve();
  }

  async messageObserve() {
      
    // WAPI.waitNewMessages(false, async data => {
    //   for (let i = 0; i < data.length; i++) {
    //     //fetch API to send and receive response from server
    //     let message = data[i];
    //     body = {};
    //     body.text = message.body;
    //     body.type = 'message';
    //     body.user = message.chatId._serialized;
    //     //body.original = message;
    //     //  if depending on server

    //     if (intents.appconfig.webhook) {
    //       fetch(intents.appconfig.webhook, {
    //         method: 'POST',
    //         body: JSON.stringify(body),
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       })
    //         .then(resp => resp.json())
    //         .then(function(response) {
    //           //response received from server
    //           console.log(response);
    //           WAPI.sendSeen(message.chatId._serialized);
    //           //replying to the user based on response
    //           if (response && response.length > 0) {
    //             response.forEach(itemResponse => {
    //               WAPI.sendMessage2(
    //                 message.chatId._serialized,
    //                 itemResponse.text,
    //               );
    //               //sending files if there is any
    //               if (itemResponse.files && itemResponse.files.length > 0) {
    //                 itemResponse.files.forEach(itemFile => {
    //                   WAPI.sendImage(
    //                     itemFile.file,
    //                     message.chatId._serialized,
    //                     itemFile.name,
    //                   );
    //                 });
    //               }
    //             });
    //           }
    //         })
    //         .catch(function(error) {
    //           console.log(error);
    //         });
    //     }

    //     console.log(`Message from ${message.chatId.user} checking..`);

    //     if (intents.blocked.indexOf(message.chatId.user) >= 0) {
    //       console.log('number is blocked by BOT. no reply');
    //       return;
    //     }

    //     if (message.type == 'chat') {
    //       //message.isGroupMsg to check if this is a group
    //       if (
    //         message.isGroupMsg == true &&
    //         intents.appconfig.isGroupReply == false
    //       ) {
    //         console.log(
    //           'Message received in group and group reply is off. so will not take any actions.',
    //         );
    //         return;
    //       }

    //       var exactMatch = intents.bot.find(obj =>
    //         obj.exact.find(ex => ex == message.body.toLowerCase()),
    //       );
    //       var response = '';

    //       if (exactMatch != undefined) {
    //         response = await resolveSpintax(exactMatch.response);
    //         console.log(`Replying with ${response}`);
    //       } else {
    //         response = await resolveSpintax(intents.noMatch);
    //         console.log(
    //           `No exact match found. So replying with ${response} instead`,
    //         );
    //       }

    //       var PartialMatch = intents.bot.find(obj =>
    //         obj.contains.find(ex => message.body.toLowerCase().search(ex) > -1),
    //       );

    //       if (PartialMatch != undefined) {
    //         response = await resolveSpintax(PartialMatch.response);
    //         console.log(`Replying with ${response}`);
    //       } else {
    //         console.log('No partial match found');
    //       }

    //       WAPI.sendSeen(message.chatId._serialized);
    //       WAPI.sendMessage2(message.chatId._serialized, response);

    //       if (
    //         exactMatch &&
    //         PartialMatch &&
    //         (exactMatch || PartialMatch).file != undefined
    //       ) {
    //         files = await resolveSpintax((exactMatch || PartialMatch).file);
    //         window
    //           .getFile(files)
    //           .then(base64Data => {
    //             //console.log(file);
    //             WAPI.sendImage(
    //               base64Data,
    //               message.chatId._serialized,
    //               (exactMatch || PartialMatch).file,
    //             );
    //           })
    //           .catch(error => {
    //             console.log('Error in sending file\n' + error);
    //           });
    //       }
    //     }
    //   }
    // });
  }
}
