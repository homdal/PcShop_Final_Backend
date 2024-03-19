import chalk from "chalk";

class Logger {
  static error(...messages) {
    console.error(chalk.red(messages));
  }

  static info(...messages) {
    if (process.env.NODE_ENV === "prod") return;
    console.info(chalk.yellow(messages));
  }

  static debug(...messages) {
    console.debug(chalk.blue(messages));
  }

  static verbose(...messages) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(chalk.magenta(messages));
  }

  static log(...messages) {
    if (process.env.NODE_ENV === "prod") return;
    console.log(messages);
  }
}
export default Logger;
