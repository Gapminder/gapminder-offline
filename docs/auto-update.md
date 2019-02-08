# Auto update functionality

So, we have next kinds of `auto update`:

* Manual update
* Full update
* Partial update

### Manual update

This kind of update should be applied only for major (semver) update. For example, from 0.99.0 to 1.0.0.

In this case a popup with direct link to download will be opened and user should download and reinstall the app
according to instructions. 

### Full update

This kind of update should be applied for minor (semver) update. For example, from 0.44.10 to 0.45.0.
In this case all parts of the application should be updated. Auto update system will use next url for data getting: 

`http://s3-eu-west-1.amazonaws.com/gapminder-offline/#version#/Gapminder Offline-#type#.zip`

Where `#version#` is expected application version.

`#type#` can be:

* mac - MacOS
* win64 - Windows 64 bit
* win32 - Windows 32 bit
* linux - Linux

Parts of the application:

* V8 and electron libraries
* `gapminder offline` scripts
* Inner DDF dataset


### Partial (application) update

This kind of update should be applied for patch (semver) updates. For example, from 0.44.10 to 0.44.11. 

In this case only `gapminder offline` application data (see above) or `inner DDF dataset update` would be updated. 

Auto update system will use next url for data getting: 

`http://s3-eu-west-1.amazonaws.com/gapminder-offline/#version#/partial/Gapminder Offline-#type#.zip` 
(see ‘Build’ paragraph above)

### Inner DDF dataset update

Inner DDF dataset would be updated if semver version of current dataset less than semver version of dataset on
github (https://github.com/open-numbers/ddf--gapminder--systema_globalis) 
with existing tag (https://github.com/open-numbers/ddf--gapminder--systema_globalis/archive/1.1.0.zip , for example).
