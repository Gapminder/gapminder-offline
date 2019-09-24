1. [Setup guide for Gapminder Offline](#setup-guide-for-gapminder-tools-offline)
   1. [How to build an app](#how-to-build-an-app)
      * [Tools necessary to build Gapminder Offline](#tools-necessary-to-build-gapminder-tools-offline)
   1. [Building for Windows](#building-for-windows)
      * [Clarifications for Windows build](#clarifications-for-windows-build)
      * [Application structure on Windows](#application-structure-on-windows)
         1. ["win"](#win)
         1. ["nsis"](#nsis)
   1. [Building for Linux](#building-for-linux)
      * [Application structure on Linux](#application-structure-on-linux)
   1. [Building for MacOS](#building-for-macos)
      * [Application structure on MacOS](#application-structure-on-macos)
         1. [mac](#mac)
         1. [dmg](#dmg)
      * [Parameters common for all platforms](#parameters-common-for-all-platforms)
   1. [Deploy process](#deploy-process)
      * [Windows](#windows)
      * [Mac](#mac)
      * [Linux](#linux)

# Setup guide for Gapminder Offline

## How to build an app

### Tools necessary to build Gapminder Offline

* `git`
* `nodejs` >= 10.15.0 with bundled `npm` for all platforms
* A valid identity from your keychain in MacOS. You can find more information on MacOS keychain identity & certificates in this [GitHub Electron Builder issue](https://github.com/electron-userland/electron-builder/issues/1046)
* `signtool` from Microsoft Windows SDK for Windows - [SignTool](https://docs.microsoft.com/en-us/windows/desktop/seccrypto/signtool)

## Building for Windows

* setup  `.pfx` certificate (more details below) - [Code Signing](https://www.electron.build/code-signing.html)
* `git clone https://github.com/Gapminder/gapminder-offline.git`
* `npm i`
* `npm run electron:windows`

**Steps to import `.pfx` certificate:**

1\. Double-click on the .pfx file, "Certificate Import Wizard" will open:

![Certificate Import Wizard](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-setup-the-project/docs/screenshots%20for%20instruction%20for%20.pfx%20file/Instruction%20for%20.pfx%20file%20Step%201.jpg?raw=true)

2\. Fill in the password and click the "Next" button

3\. In the opened window choose "Automatically select..." option and click on the "Next" button:

![Certificate Import Wizard step 3](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-setup-the-project/docs/screenshots%20for%20instruction%20for%20.pfx%20file/Instruction%20for%20.pfx%20file%20Step%202.jpg?raw=true)

4\. After that, window with "Completing the Certificate Import Wizard" will appear:

![Completing the Certificate Import Wizard](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-setup-the-project/docs/screenshots%20for%20instruction%20for%20.pfx%20file/Instruction%20for%20.pfx%20file%20Step%203.jpg?raw=true)

5\. Click on the "Finish" button

After successful Windows build, there should be following files and directories in build directory:

* `"app-build"` - Project folder containing all setup and update files.
* `Gapminder Offline Setup X.X.X.exe` - Installation executable for Gapminder Offline.
* `Gapminder Offline x.x.x.exe` - Gapminder Offline portable version executable.

### Clarifications for Windows build

1. There are 2 versions of an app for Windows: for x64 architecture and for x32 architecture.
1. Despite having 2 versions for different architectures, we have one Installation file.
1. Portable version of the application doesn't have auto-update functionality, each new version has to be distributed separately.
1. **add-builds** folder contains `latest.yml` file which contains information about the build.
1. It's recommended to save *.yml files with application version in their name (i.e latest.v-X.X.X.yml) so it will be possible roll back to the previous version in the future.

### Application structure on Windows

`electron-builder.json` - configuration file with "build rules"

Important parts of the *"electron-builder.json"* for Windows:

#### "win"

`win` block describes the rules for building an application for Windows:

```json
    "win": {
      "icon": "dist/app-icon.png",
      "target": [
        "nsis:x64",
        "nsis:ia32",
        "zip",
        "portable"
      ],
```

* `"icon": "dist/app-icon.png"` - path to application logo;
* `"target": ["nsis:x64", "nsis:ia32", "zip", "portable"]` - task list for Electron Builder to prepare "nsis" (Nullsoft Scriptable Install System, [nsis Wiki](https://nsis.sourceforge.io/)) for x64 and x32 versions, "zip" file for update and "portable' for portable version of an app.

#### "nsis"

`nsis` block describes how to create an installer for Windows:

```json
  "nsis": {
    "oneClick": true,
    "perMachine": false,
    "deleteAppDataOnUninstall": true,
    "include": "custom-uninstall.nsh",
    "allowElevation": false,
    "createStartMenuShortcut": false
  },
```

* `"oneClick": true` - defines installation method ([description of the nsis options](https://www.electron.build/configuration/nsis));
* `"perMachine": false` - specifies whether app should installs globally (for all users) or locally (for current user);
* `"deleteAppDataOnUninstall": true` - specifies whether all application data should be deleted after its uninstall;
* `"include": "custom-uninstall.nsh"` - script that includes rules for cleaning of the cache and defined install directory.
* `verifyUpdateCodeSignature` - needed for an update. Status 'false' because application will crash if the verifyUpdateCodeSignature will be 'true'. It is bug of the electron-updater.

## Building for Linux

* `git clone https://github.com/Gapminder/gapminder-offline.git`
* `npm i`
* `npm run electron:linux`

After successful Linux build, there should be following files and directories in build directory:

* `"app-build"` - Project folder containing AppImage and update file.
* `Gapminder Offline X.X.X.AppImage` - Universal [AppImage](https://appimage.org) container.

### Application structure on Linux

`electron-builder.json` - configuration file with "build rules"

```json
  "linux": {
    "icon": "dist/app-icon.png",
    "target": [
      "AppImage"
    ]
  },
```

Important parts of the *"electron-builder.json"* for Linux:

* "linux": target: "AppImage"

`add-builds` folder contains - latest-linux.yml file

It's recommended to save *.yml files with application version in their name (i.e latest-linux.v-X.X.X.yml) so it will be possible roll back to the previous version in the future.

## Building for MacOS

* `git clone https://github.com/Gapminder/gapminder-offline.git`
* `npm i`
* `npm run electron:mac`

After successful MacOS build, there should be following files and directories in build directory:

* `"app-build"` - Project folder containing .dmg mountable disk image and update file;
* `*.dmg` - Mountable disk image containing MacOS version of Gapminder Offline;
* `Gapminder Offline-X.X.X-mac.zip` - Update file for MacOS Gapminder Offline.

### Application structure on MacOS

`add-builds` directory contains - latest-mac.yml file

Important parts of the "electron-builder.json" for Mac platform:

#### mac

```json
  "mac": {
       "category": "public.app-category.developer-tools",
       "icon": "dist/app-icon.icns",
       "target": [
         "zip",
         "dmg"
       ]
     },
```

"mac" block describes the rules for building an application for Mac platform:

* `"category": "public.app-category.developer-tools"` - [Clarification about Apple categorize of applications](https://developer.apple.com/library/archive/releasenotes/General/SubmittingToMacAppStore/index.html)
* `"icon": "dist/app-icon.icns"` - path to application logo;
* `"target": ["zip", "dmg"]` - task list for Electron Builder to prepare ".dmg" and ".zip" files for application setup.

#### dmg

```json
   "dmg": {
        "title": "Gapminder Offline",
         "icon": "icons/gapminder_package.icns",
         "background": "icons/gapminder.png",
         "window": {
           "width": 898,
           "height": 511
         },
         "contents": [
           { "x": 635, "y": 400, "type": "link", "path": "/Applications" },
           { "x": 253, "y": 400 }
         ]
       },
```

The most important part of the `dmg` block is `"path": "/Applications"` - this parameter points to installation directory in MacOS.

It's recommended to save *.yml files with application version in their name (i.e latest-mac.v-X.X.X.yml) so it will be possible roll back to the previous version in the future.

### Parameters common for all platforms

* publish - auto-update parameter (when new version releases):
  * `"provider": "s3"` - specifies where app is stored;
  * `"bucket": "gapminder-offline"` - bucket on Amazon "S3";
  * `"path": "dist"` - directory which holds app files;
  * `fileAssociations` - status of an application, defines how to application acts after double-clicking on it;
  * `"publisherName": "COMODO RSA Code Signing CA"` - company which provided an opportunity to publish application;

## Deploy process

You need to copy application files to appropriate "S3" storage (bucket: "gapminder-offline" ; folder: "dist").

Files listed by platform are following:

### Windows

* `latest.yml`
* `Gapminder Offline-X.X.X-ia32-win.zip` file for the version with installation
* `Gapminder Offline-X.X.X-ia32-win.zip` file for portable version
* `Gapminder Offline Setup X.X.X.exe.blockmap` files
* `Gapminder Offline-X.X.X-win.zip ; Gapminder Offline-X.X.X-ia32-win.zip` files for x32 and x64 versions

### Mac

* `latest-mac.yml`
* `Gapminder Offline-X.X.X.dmg` file
* `Gapminder Offline-X.X.X.dmg.blockmap` file
* `Gapminder Offline-X.X.X-mac.zip` file

### Linux

* `latest-linux.yml`
* `Gapminder Offline X.X.X.AppImage` file
