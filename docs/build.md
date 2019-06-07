# How to build and publish `Gapminder Offline`

## Expected software for build process provides:

* `git`
* `nodejs` >= 10.16.0 with related `npm` for all platforms
* `A valid and appropriate identity from your keychain` [for MacOS](https://github.com/electron-userland/electron-builder/issues/1046)
* `signtool` from Microsoft Windows SDK for Windows
* A valid installed certificate for Windows (`pfx` file)

## Basic preparation

* get an expected repository: `git clone https://github.com/Gapminder/gapminder-offline.git`
* `cd gapminder-offline`
* `npm i`

### Windows features

First of all, the certificate mentioned above should be imported into to the system. More info you can see [here](https://www.geocerts.com/support/how-to-export-import-ssl-certificate-between-windows-servers).

All that you need know regarding installed certificate that are `Name of publisher` and `Subject Name` of this certificate. This information is applied in [electron-builder.json](https://raw.githubusercontent.com/Gapminder/gapminder-offline/development/electron-builder.json) in `win` section.

To install the certificate get the pfx file and double click on it. It sould be `Certificate Import Wizard` opended. Please, follow its instructions. Also, you should enter a `certificate password` during the importing process.

Important notes:
1. if you have no the certificate file or password, please ask Project Owner.
2. Windows installation constains code for both platforms: `Win64` and `Win32`
3. Also Windows version contains portable version.

## Run build process for expected platform

It's quite easy :)

* `npm run electron:linux` for Linux
* `npm run electron:windows` for Windows
* `npm run electron:mac` for MacOS

## After build

You will find the app in `app-builds` folder on each OS.

## Deploying process

You need to copy the app files to an appropriate storage (probable S3; see `publish` section in [electron-builder.json](https://raw.githubusercontent.com/Gapminder/gapminder-offline/development/electron-builder.json)). Files list by platform is the following:

### Windows

* `latest.yml`
* `exe` files (`Gapminder Tools Offline Setup x.x.x.exe` and `Gapminder Tools Offline x.x.x.exe`. Last one is a portable version of the app)
* all `blockmap` files
*  `zip` files (`Gapminder Tools Offline x.x.x.exe` and `Gapminder Tools Offline-x.x.x-ia32-win.zip`)

### Mac

* `latest-mac.yml`
* `dmg` file (`Gapminder Tools Offline-x.x.x.dmg `)
* all `blockmap` files
*  `zip` file (`Gapminder Tools Offline-x.x.x-mac.zip`)


### Linux

* `latest-linux.yml`
* `AppImage` file (`Gapminder Tools Offline x.x.x.AppImage`). More info: [AppImage specific](https://appimage.org/).

Important note. If you want to rollback new app version in future, please keep existing latest-x.yml files and replace them after that to the new.

For example,

* `latest.yml` -> `latest-5.0.0.yml`
* `latest-mac.yml` -> `latest-mac-5.0.0.yml`
* `latest-linux.yml` -> `latest-linux-5.0.0.yml`

In case of rollback you should remove existing `latest`-files and rename saved:

* `latest-5.0.0.yml` -> `latest.yml`
* `latest-mac-5.0.0.yml` -> `latest-mac.yml`
* `latest-linux-5.0.0.yml` -> `latest-linux.yml`
