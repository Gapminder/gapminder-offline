# Gapminder Tools Offline  

With Gapminder Tools Offline you can show animated statistics from your own laptop!

• You can use it without internet access  
• You can visualise your own data with it or even combine it with the datasets provided (examples & instructions)  
• The software and the datasets will update automatically when connection is available  
• It’s free  

## Using the app

Download the stable version from here http://www.gapminder.org/tools-offline/

## Contributing
We use Angular 2, Electron & chrome app featuring Webpack

If you want to build the app in developer mode (simple build without creating a distributive and code signing) use the following commands:

Mac
```npm i
npm run build-mac
npm run package-mac
```

Win 64
```npm i
npm run build-win
npm run package-win
```

Win 32
```npm i
npm run build-win
npm run package-win32
```

Linux
```npm i
./build-dev
```

[Read how to build the application with code signing and stuff](https://github.com/Gapminder/gapminder-offline/blob/master/docs/build.md)  
[Read about auto-update functionality](https://github.com/Gapminder/gapminder-offline/blob/master/docs/auto-update.md)

![app screenshot](https://s3-eu-west-1.amazonaws.com/static.gapminder.org/GapminderMedia/wp-uploads/20170113171243/Gapminder-Offline-Tools.png)


## License

[MIT](http://markdalgleish.mit-license.org)
