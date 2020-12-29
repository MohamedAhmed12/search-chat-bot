const ora = require('ora');

export class Spinner{
  private spinner: any ;
  
  start(text): void {
    this.spinner = ora({
      spinner: 'dots2',
      text:text
    }).start()
  };

  update(text): void{
    this.spinner.text = text;
  }

  info(text) {
    this.spinner.info(text);
  }

  stop(text) {
    this.spinner.succeed(text);
  }
}