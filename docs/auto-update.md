# Auto update functionality

So, we have following kinds of `auto update`:

* Whole application update
* Inner DDF dataset update


## Whole application update

This kind of functionality is built-in into the app. All that you need to know are settings that include type of provider and a place that should contain new version.

Let's look at the `publish` section in [electron-builder.json](https://raw.githubusercontent.com/Gapminder/gapminder-offline/development/electron-builder.json)

```
"publish": [
  {
    "provider": "s3",
    "bucket": "gapminder-offline",
    "path": "dist"
  }
],
```

It means that new version will be picked up automatically from AWS S3 storage on `gapminder-offline` bucket in `dist` folder during automatic update (ie `http://s3-eu-west-1.amazonaws.com/gapminder-offline/dist/`, for example).

If you want to know more about this feature, please read `How to use test auto-update functionality locally (without AWS S3 storage)` [here](https://github.com/Gapminder/gapminder-offline/blob/feat-docs-manual-test-flow/docs/manual-test-flow.md)

## Inner DDF dataset update

Inner DDF dataset would be updated if semver version of current dataset less than semver version of dataset on
github (https://github.com/open-numbers/ddf--gapminder--systema_globalis)
with existing tag (https://github.com/open-numbers/ddf--gapminder--systema_globalis/archive/1.1.0.zip , for example).

No need to full reload for the app in this case.
