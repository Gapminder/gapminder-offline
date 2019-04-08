# Manual test flow for the Windows platform


#### Test case for checking full uninstall 4.1.0 then update to 5.0.0 and full uninstall 5th version of the app
1\. Download the app from the following links:
     
  * [link for download GP 4.1.0 x64](http://s3-eu-west-1.amazonaws.com/gapminder-offline/4.1.0/Install%20Gapminder%20Offline-64.exe)
  * [link for download GP 4.1.0 x32](http://s3-eu-west-1.amazonaws.com/gapminder-offline/4.1.0/Install%20Gapminder%20Offline-32.exe)

2\. Start downloaded executable file by double-click

3\. install v-4.0.1 to the `C:\Program Files`  

![screen](https://raw.githubusercontent.com/Gapminder/gapminder-offline/c725d4efdba7a0033ef883af5fb28fc9261bc488/docs/manual-test-flow-screenshots/setup-programfiles.jpg)

4\. Close the app

5\. Open the "Start" menu

6\. Find and click on the "Gapminder Tools Offline" folder 

![screen](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow-screenshots/GP%20Offline%20folder%20in%20the%20Start%20menu.jpg?raw=true)

7\. Choose "Uninstall Gapminder Tools Offline" button 

8\. install 5.0.0 
      
   * [link for download GP 5.0.0](https://s3-eu-west-1.amazonaws.com/gapminder-offline/dist/Gapminder+Tools+Offline+Setup+5.0.0.exe)

9\. Close the app

10\. Open the "Start" menu

11\. Find and click on the "Gapminder Tools Offline" folder 

12\. Choose "Uninstall Gapminder Tools Offline" button 

![screen](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow-screenshots/Uninstall%205.0.jpg?raw=true)

***Expected Result:*** After uninstall GP v-5.0.0 , in the `C:\Users\IEUser\AppData\Roaming` folder, "Gapminder Tools Offline"  folder missing.




#### Test case for checking for update dataset
1\. Download the app from the following link:

   * [link for download GP 5.0.0](https://s3-eu-west-1.amazonaws.com/gapminder-offline/dist/Gapminder+Tools+Offline+Setup+5.0.0.exe)

2\. Switch off the internet

3\. Start downloaded executable file by double-click

4\. Install the app

5\. check for alert message, it should NOT be raised

6\. close the app

7\. downgrade ds on 5.0.0:

   * enter to the dataset folder (`C:\Users\IEUser\AppData\Local\Programs\Gapminder Tools Offline\resources\ddf--gapminder--systema_globalis\datapackage.json`)
   * change version in dataset datapackage.json to someone less than 1.16.1 (to 1.16.0, for example)

![screen](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow-screenshots/change-ds-version.jpg?raw=true)   

   * run the app

8\. check the dataset version (shoul be 1.16.0)

9\. switch on internet

10\. open the app

11\. click the "update now" button in the top right corner of the app

12\. update 5.0.0 to 6.0.0 (ds update message should NOT be raised)

13\. 6.0.0 should contain actual dataset itself

14\. downgrade ds on 6.0.0

   * enter to the dataset folder (`C:\Users\IEUser\AppData\Local\Programs\Gapminder Tools Offline\resources\ddf--gapminder--systema_globalis\datapackage.json`)
   * change version in dataset datapackage to someone less than 1.16.1 (to 1.16.0, for example)

15\. open the app

16\. click to the buttnos on the top right corner for update dataset 

17\. Open the "Start" menu

18\. Find and click on the "Gapminder Tools Offline" folder 

19\. Choose "Uninstall Gapminder Tools Offline" button 




### How to use auto-update the app from 5.0.0 to 6.0.0

1\. Setup the project

2\. Change in the electron-builder.json, "publish" block: 

```
"publish": [
      {
        "provider": "generic",
        "url": "http://127.0.0.1:8080/"
      }
    ],
```

> Never commit this changes!!!

3\. Change the version of the app in the "package.json" from "version": "5.0.0" to "version": "6.0.0",

![screen](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow-screenshots/change%20version%20of%20the%20app.jpg?raw=true)

4\. Build the v-6.0.0 of the app

5\. Create a folder (v-6.0.0 for example) out of the project folder

6\. Open Bash in the created folder and use `npm i -g http-server` command

7\. After that command completed, use `http-server` command 

8\. Move all files from the "app-build" folder to the "v-6.0.0" folder

9\. Downgrade the version of the app in the "package.json" from "version": "6.0.0" to "version": "5.0.0"

10\. Build the v-5.0.0 of the app

11\. Setup the "Gapminder Tools Offline Setup 5.0.0"

12\. Run the app

13\. Pay attention to the top right corner 

14\. The message "New version 6.0.0 is available!" appeared

![screen](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow-screenshots/Upload%20now.jpg?raw=true)

15\. Click to the "Update now" button

16\. The app will be updated and message "Press OK and wait — the app will restart automatically." appears

19\. Click "Ok" button and wait for reload the app

20\. After the app has reloaded his version will be changed to 6.0.0

![screen](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow-screenshots/GP%20v-6.0.0.jpg?raw=true)
