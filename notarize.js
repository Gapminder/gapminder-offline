/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const { spawn } = require("node:child_process");
const os = require("os");

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context; 
    const appPath = `${appOutDir}/${context.packager.appInfo.productFilename}`;

    if (os.platform() !== "darwin" || electronPlatformName !== 'darwin') 
        return console.log("Skipped notarizing app because not running on MacOS or not running the correct npm script.");

    if (!process.env.NOTARIZE) 
        return console.log("Skipped notarizing app to save traffic. Run electron:mac-notarized instead.");

    await exec("open " + appOutDir);
    await waitForUserInput("A finder window should have opened. Right click and choose to compress the file " + context.packager.appInfo.productFilename + ".app, check the size of zip, it should be around 200 MB, then press any key here in terminal when done");
  
    console.log("Notarizing app...");
    const content = await exec(`xcrun notarytool submit ${appPath.replace(" ", "\\ ")}.zip --keychain-profile "Gapminder offline notarization" --wait`);
    const uuid = content.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g)[0];
    await exec(`xcrun notarytool log ${uuid} --keychain-profile "Gapminder offline notarization"`);
    await exec(`xcrun stapler staple ${appPath.replace(" ", "\\ ")}.app`);

    console.log("App notarization process finished");
};


function waitForUserInput(text){
    return new Promise((resolve, reject) => {
        process.stdin.resume()
        process.stdout.write(text)
        process.stdin.once('data', data => resolve(data.toString().trim()))
        process.stdin.once('error', reject)
      })
}

function exec(cmd) {
    return new Promise((resolve, reject) => {
        console.log(cmd);
        const proc = spawn(cmd, [], { shell: true });

        const chunks = [];
        proc.stdout.on("data", (data) => {
            console.log(data.toString());
            chunks.push(data);
        });
        proc.stderr.on("data", (data) => {
            console.error(data.toString());
            chunks.push(data);
        });
        proc.on("close", (code) => {
            console.log(`Process exited with code ${code}.`);
            resolve(Buffer.concat(chunks).toString("utf8"));
        });
    });
}