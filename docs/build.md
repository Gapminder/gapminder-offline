# How to build and publish Gapminder Offline

## Expected software for build process provides:

* `git`
* `nodejs` >= 10.15.0 with related `npm` for all platforms
* `A valid and appropriate identity from your keychain` [for MacOS](https://github.com/electron-userland/electron-builder/issues/1046)
* `signtool` from Microsoft Windows SDK for Windows

## Preparation

* get an expected repository: `git clone https://github.com/Gapminder/gapminder-offline.git`
* `cd gapminder-offline`
* `npm i`
* synchronize the repository content with the latest related repositories versions such as Vizabi, readers, D3 etc: `npm run sync-deps`. Commit and push changes if needed.

### Preparation for Windows

* All things from the previous part
* `cd ..`
* Put `gapminder.pfx` certificate file here
* `cd gapminder-offline`
* Modify `package.json` file. Add a real password for `gapminder.pfx` instead `pass` for `WIN_CSC_KEY_PASSWORD` in `electron:windows` script section.

Notes: 
1. Ask #password# `gapminder.pfx` certificate file owner.
2. Don't commit this change in the future!

## Run build process for expected platform

`npm run electron:linux`
`npm run electron:windows`
`npm run electron:mac`

## After build

You can find the app in `app-builds` folder.

## Deploying process

You need to copy the app files to an appropriate storage (S3). Files list by platform is the following:

### Windows

* `latest.yml`
* `exe` file
* `blockmap` files
*  `zip` files

Note: `exe` files is an installer and you can install freely via it on win64 and win32 architectures.


### Mac

* `latest-mac.yml`
* `dmg` file
* `blockmap` files
*  `zip` files


### Linux

* `latest-linux.yml`
* `AppImage` file
