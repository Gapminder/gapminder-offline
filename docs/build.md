# How to build and publish Gapminder Offline

## Expected software for build process provides:

* `git`
* `nodejs` >= 8.11.3 with related `npm` for all platforms
* `NSIS` installer creator for Windows 32 and 64 bit. It can be downloaded from [here](http://nsis.sourceforge.net).
* `signtool` from Microsoft Windows SDK 

## Preparation

* get an expected repository: `git clone https://github.com/Gapminder/gapminder-offline.git`
* `npm i`
* `cd gapminder-offline`

## MacOS

First of all, an appropriate certificate for the application signing is expected on your PC. See `--sign` option [here](https://github.com/Gapminder/gapminder-offline/blob/master/build-mac#L10) for more information.

Use `./build-mac` to run build process. You should see next files after successful build process finishing:

* `./release/Gapminder Offline-mac/Gapminder Offline-mac.zip` should be uploaded to `amazon s3 url`/gapminder-offline/`version`/.
  This file should be used by auto updater in `full update mode`.
* `./release/partial/Gapminder Offline-mac/Gapminder Offline-mac.zip` should be uploaded to `amazon s3 url`/gapminder-offline/`version`/partial.
  This file should be used by auto updater in `partial update mode`.
* `./release/Install Gapminder Offline.dmg` should be uploaded to `amazon s3 url`/gapminder-offline/`version`/.
  This is an installation file. It should be used by a customer.
  
## Windows 

First of all, you should create `./release` and put `gapminder.pfx` certificate file into it. Make sure that appropriate `signtool` is present on `PATH` environment variable.
So, you should be able to run `signtool.exe`.

### Windows 64 bit

Use `./build-win64 #password#` to run build process. You should see next files after successful build process finishing:

* `.\release\Gapminder Offline-win64.zip` This kind of file should be deployed to `amazon s3 url`/gapminder-offline/`version`/ and it will be used by auto updater in `full update mode`.
* `.\release\partial\Gapminder Offline-win64.zip`. This kind of file should be deployed to `amazon s3 url`/gapminder-offline/`version/`partial and it will be used by auto updater in `partial update mode`.
* `.\release\Install Gapminder Offline.exe`
  Rename this file to `Install Gapminder Offline-64.exe` and upload it to `amazon s3 url`/gapminder-offline/`version`/.
  This is an installation file. It should be used by customer.

### Windows 32 bit

Use `./build-win32 #password#` to run build process. First of all, ignore please errors regarding zip archiving. Windows 32 bit has some problems with automatic archiving. 

You should see next files after successful build process finishing:

* `.\release\Gapminder Offline-win32`
* `.\release\partial\Gapminder Offline-win32`
* `.\release\Install Gapminder Offline.exe`
  Rename this file to `Install Gapminder Offline-32.exe` and upload it to `amazon s3 url`/gapminder-offline/`version`/.
  This is an installation file. It should be used by a customer.

Now you should pack these two directories in manual mode to: 

* `.\release\Gapminder Offline-win32.zip` These kind of file should be deployed to `amazon s3 url`/gapminder-offline/`version`/ and it will be used by auto updater in `full update mode`.
* `.\release\partial\Gapminder Offline-win32.zip`. This kind of file should be deployed to `amazon s3 url`/gapminder-offline/`version/`partial and it will be used by auto updater in `partial update mode`.

Note: ask #password# `gapminder.pfx` certificate file owner.

## Linux

Use `./build-linux` to run build process. You should see next files after successful build process finishing:

* `./release/Gapminder Offline-linux/Gapminder Offline-linux.zip` should be uploaded to `amazon s3 url`/gapminder-offline/`version`/.
  This file should be used by auto updater in `full update mode`. Also this file should be unpacked and used by a customer as distributive.
* `./release/partial/Gapminder Offline-linux/Gapminder Offline-linux.zip` should be uploaded to `amazon s3 url`/gapminder-offline/`version`/partial.
  This file should be used by auto updater in `partial update mode`.
