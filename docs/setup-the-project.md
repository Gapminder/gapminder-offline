# Setup instruction for Gapminder Tools Offline  

## How to build the app

### Expected software for build process provides

* `git`
* `nodejs` >= 10.15.0 with related `npm` for all platforms
* `A valid and appropriate identity from your keychain` [for MacOS](https://github.com/electron-userland/electron-builder/issues/1046)
* `signtool` from Microsoft Windows SDK for Windows - [SignTool](https://docs.microsoft.com/en-us/windows/desktop/seccrypto/signtool)

### For Windows platform 
* setup  `.pfx` certificate (more details below)  - [Code Signing](https://www.electron.build/code-signing.html)
* `git clone https://github.com/Gapminder/gapminder-offline.git`  
* `npm i`
* `npm run electron:windows`

***Steps to import `.pfx` certificate:***

1.  After you double-clicked on the .pfx file, "Certificate import wizard" opens:

![Image](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-setup-the-project/docs/screenshots%20for%20instruction%20for%20.pfx%20file/Instruction%20for%20.pfx%20file%20Step%201.jpg?raw=true)

2\. Input the password and click the "Next" button

3\. In the following window choose "Automatically select..." option and click the "Next" button

![Image](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-setup-the-project/docs/screenshots%20for%20instruction%20for%20.pfx%20file/Instruction%20for%20.pfx%20file%20Step%202.jpg?raw=true)

4\. After that next window with "Completing the Certificate Import Wizard" appears:

![Image](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-setup-the-project/docs/screenshots%20for%20instruction%20for%20.pfx%20file/Instruction%20for%20.pfx%20file%20Step%203.jpg?raw=true)

5\. Click the "Finish" button

Expected result for the successful installation should be :
* `"app-build"` - after the application build, this folder will appear in the project folder
* `Gapminder Tools Offline Setup X.X.X.exe` - this file appears in the "app-build" folder after the app was build
* `Gapminder Tools Offline-X.X.X-win.zip` -  file which needed for update on x64
* `Gapminder Tools Offline-X.X.X-ia32-win.zip` - file which needed for update on x32
* `Gapminder Tools Offline x.x.x.exe` - this is a file for launch the portable version, it appears in the "app-build" folder after app was build
 
### Clarifications for Win build

1) We have 2 version of the Windows app: x64 & x32
2) For x64 and x32 application has one Installation file
3) We have a Portable version of the application (only .exe file, auto-update functionality turned of)
4) **add-builds** folder contains - latest.yml file which contains information about the build
5) Recommended to save *.yml files with version of app in the name (latest.v-X.X.X.yml)to be able to can roll back to the previous version for the future

> Name of the portable version of the app "Gapminder+Tools+Offline+X.X.X.exe"

### Details of the application structure on the Windows platform

`electron-builder.json` - file  with "rules for build"

Important parts of the *"electron-builder.json"* :

**"win"** 

Win block describes the rules for building an application for Windows platform:
```
    "win": {
      "icon": "dist/app-icon.png",
      "target": [
        "nsis:x64",
        "nsis:ia32",
        "zip",
        "portable"
      ],
```
 * `"icon": "dist/app-icon.png"` - path where the picture is stored
 * `"target": ["nsis:x64", "nsis:ia32", "zip", "portable"]` -  task list for electron builder to prepare "nsis" for x64 and x32 versions, "zip" file for update and "portable' version of the app

**"nsis"** 

[nsis Wiki](https://nsis.sourceforge.io/)
This block describes how to create an installer of the application on Windows platform: 

```
  "nsis": {
    "oneClick": true,
    "perMachine": false,
    "deleteAppDataOnUninstall": true,
    "include": "custom-uninstall.nsh",
    "allowElevation": false,
    "createStartMenuShortcut": false
  },
```
  * `"oneClick": true` - installation method (without custom setup way)
  * `"perMachine": false` - installation for user. Not globally on the machine (all users)
  * `"deleteAppDataOnUninstall": true` - delete all data of the app
  * `"include": "custom-uninstall.nsh"` - the script including additional rules cleaning of the cache and defined install directory


* `verifyUpdateCodeSignature` - needed for update. Status 'false' because application will crash if the 
  verifyUpdateCodeSignature will be 'true'. It is bug of the electron-updater. 
  

### For Linux platform

* `git clone https://github.com/Gapminder/gapminder-offline.git`  
* `npm i`
* `npm run electron:linux`

*Expected result for the successful installation should be:*
* `"app-build"` folder appears in the project folder
* `Gapminder Tools Offline X.X.X.AppImage` file in the "app-build" folder
* `Gapminder Tools Offline-X.X.X-win.zip` file which needed for update

### Details of the application structure on the Linux platform

`electron-builder.json` - file  with "rules for build"

```$xslt
  "linux": {
    "icon": "dist/app-icon.png",
    "target": [
      "AppImage"
    ]
  },
```

Important parts of the *"electron-builder.json"* for linux platform:
* "linux": target: "AppImage" 


add-builds folder contains - latest-linux.yml file

Recommended to save *.yml files with version of app in the name (latest-linux.v-X.X.X.yml)to be able to can roll back to the previous version for the future


### For Mac platform

* `git clone https://github.com/Gapminder/gapminder-offline.git`  
* `npm i`
* `npm run electron:mac`

Expected result for the successful installation should be :
* `"app-build"` - folder appears in the project folder
* `*.dmg` - file in the "app-build" folder
* `Gapminder Tools Offline-X.X.X-mac.zip` - file which needed for update

### Details of the application structure on the Mac platform

add-builds folder contains - latest-mac.yml file

Important parts of the "electron-builder.json" for Mac platform:

**mac**

```
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
* `"icon": "dist/app-icon.icns"` - path where the picture is stored
* `"target": ["zip", "dmg"]` - task list for electron builder to prepare "dmg" and "zip" files for setup the app

**dmg**

```
   "dmg": {
        "title": "Gapminder Tools Offline",
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

The most important part of the dmg block is `"path": "/Applications"` - this is the rule for the installation way to Applications folder


Recommended to save *.yml files with version of app in the name (latest-mac.v-X.X.X.yml)to be able to can roll back to the previous version for the future

### For all platforms

* publish - for auto-update (where is released versions). Include:
  * `"provider": "s3"` - where is the app hold
  * `"bucket": "gapminder-offline"` - bucket on "s3"
  * `"path": "dist"` - the folder which holds the app files
  
* `fileAssociations` - status of the app, how to start the app from double-click 
* `"publisherName": "COMODO RSA Code Signing CA"` - company which provided the opportunity to publish the application


## Deploying process

You need to copy the app files to appropriate storage "S3" (bucket: "gapminder-offline" ; folder: "dist").

Files list by the platform is the following:

### Windows

* `latest.yml`
* `Gapminder Tools Offline-X.X.X-ia32-win.zip` file for the version with installation
* `Gapminder Tools Offline-X.X.X-ia32-win.zip` file for portable version
* `Gapminder Tools Offline Setup X.X.X.exe.blockmap` files
* `Gapminder Tools Offline-X.X.X-win.zip ; Gapminder Tools Offline-X.X.X-ia32-win.zip` files for x32 and x64 versions

>Note: `.exe` file is an installer and you can install freely via it on win64 and win32 architectures.


### Mac

* `latest-mac.yml`
* `Gapminder Tools Offline-X.X.X.dmg` file
* `Gapminder Tools Offline-X.X.X.dmg.blockmap` file
* `Gapminder Tools Offline-X.X.X-mac.zip` file


### Linux

* `latest-linux.yml`
* `Gapminder Tools Offline X.X.X.AppImage` file


