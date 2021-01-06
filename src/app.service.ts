import { Injectable } from '@nestjs/common';
const path = require('path');
const fs = require('fs');
const mime = require('mime');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  externalInjection(filename): Promise<string> {
    return new Promise((resolve, reject) => {
      var filepath = path.join(process.cwd(), 'src', 'static', filename);
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  delay(ms): Promise<any> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  getFileInBase64(filename): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        filename = path.join(process.cwd(), 'src', 'assets', filename);
     
        // get the mimetype
        const fileMime = mime.getType(filename);
        var file = fs.readFileSync(filename, { encoding: 'base64' });
        resolve(`data:${fileMime};base64,${file}`);
      } catch (error) {
        reject(error);
      }
    });
  }

  LoadBotSettings(event, filename, page) {
    // Check event type
    if (event === 'change') {
      // console.log("Settings changed");

      // Load JSON settings file
      let botJson = this.externalInjection(filename);

      // Update settings
      botJson
        .then(data => {
          page.evaluate(`var intents = ${data}`);
        })
        .catch(err => {
          console.log(`there was an error ${err}`);
        });
    } else if (event === 'rename') {
      console.log('warn: filename changed');
    }
  }
}
