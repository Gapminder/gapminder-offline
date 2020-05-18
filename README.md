# Gapminder Offline  

With Gapminder Offline you can show animated statistics from your own laptop!

• You can use it without internet access  
• You can visualise your own data with it or even combine it with the datasets provided (examples & instructions)  
• The software and the datasets will update automatically when connection is available  
• It’s free  

![app screenshot](https://s3-eu-west-1.amazonaws.com/static.gapminder.org/GapminderMedia/wp-uploads/20170113171243/Gapminder-Offline-Tools.png)

## Using the app

Download the stable version from here http://www.gapminder.org/tools-offline/

## Release routines
1. `npm run changelog` - generates content for `CHANGELOG.md` file with changes that have happened since last release
2. `npm version` - this one is a bit more complicated. Let's start with what it needs in order to run.
  - `CONVENTIONAL_GITHUB_RELEASER_TOKEN` environment variable should be set up for this command:

    Example: `CONVENTIONAL_GITHUB_RELEASER_TOKEN=aaaaaaaaaabbbbbbbbbbccccccccccffffffffff npm version minor`

  - this command understands following parameters:
    - `major` (having initially version **0.0.0** by applying this option it will be changed to **1.0.0**).

        Example:
        ```
          CONVENTIONAL_GITHUB_RELEASER_TOKEN=aaaaaaaaaabbbbbbbbbbccccccccccffffffffff npm version major
        ```

    - `minor` (having initially version **0.0.0** by applying this option it will be changed to **0.1.0**)

        Example:
        ```
          CONVENTIONAL_GITHUB_RELEASER_TOKEN=aaaaaaaaaabbbbbbbbbbccccccccccffffffffff npm version minor
        ```

    - `patch` (having initially version **0.0.0** by applying this option it will be changed to **0.0.1**)

        Example:
        ```
          CONVENTIONAL_GITHUB_RELEASER_TOKEN=aaaaaaaaaabbbbbbbbbbccccccccccffffffffff npm version patch
        ```

    During the release process two files will be changed and pushed to github:
      1. CHANGELOG.md - because of added history.
      2. package.json - because of bumped version.

    **Note:** `aaaaaaaaaabbbbbbbbbbccccccccccffffffffff` - is the fake token. In order to generate proper one you need to do following: [github tutorial](https://help.github.com/articles/creating-an-access-token-for-command-line-use)

    **Important note:** you should merge `development` branch into `master` and **performing `npm verison` on `master`** branch according to our [gitflow](https://github.com/valor-software/valor-style-guides/tree/master/gitflow)

    **Even more important note:** while generating token (using tutorial given above) you need to choose which permissions should be granted to it. For our *release purposes* you need to choose all permissions under the section `repo`

## Contributing
We use Angular 6, Electron & chrome app featuring Webpack

If you want to build the app in developer mode (simple build without creating a distributive and code signing) use the following commands:

Mac
```
npm i
npm run electron:mac
```

Win 64 *(should be done under Win 64 environment)*
```
npm i
electron:windows
```

Win 32 *(should be done under Win 32 environment)*
```
npm i
npm run electron:windows32
```

Linux
```
npm i
./build-dev
```

Run the app with debugger open
`"./Gapminder Offline" dev`
Example on Mac, since apps are really folder on Mac:
`./Gapminder\ Offline.app/Contents/MacOS/Gapminder\ Offline dev`

Important note! The main goal of building the app in developer mode is testing only, 
because `auto update` functionality will be unavailable in this case. 

[Read how to build the application with code signing and stuff](https://github.com/Gapminder/gapminder-offline/blob/master/docs/build.md)  

[Read about auto-update functionality](https://github.com/Gapminder/gapminder-offline/blob/master/docs/auto-update.md)



## License

[MIT](http://markdalgleish.mit-license.org)
