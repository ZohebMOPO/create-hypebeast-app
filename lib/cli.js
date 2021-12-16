#!/usr/bin/node

const commander = require("commander");
const chalk = require("chalk");
const json = require("./package.json");
const fs = require("fs-extra");
const path = require("path");


let projectName;


const program = new commander.Command(json.name)
  .version(json.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")}`)
  .action(name => {
    projectName = name;
  })
  .parse(process.argv);

if (typeof projectName === "undefined") {
  console.error("Please specify the project directory:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
  );
  console.log();
  console.log("For example:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("my-hypebeast-app")}`
  );

  process.exit(1);
}

if (fs.existsSync(path.join(process.cwd(), projectName))) {
  console.log(`The directory ${chalk.green(projectName)} already exists.`);
  process.exit(1);
}

fs.copySync("../cha-template", projectName);
