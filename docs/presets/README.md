# Presets

## Usage

Choose `Presets` option in the main menu.

The main goal is to manipulate and store different `Vizabi` configurations.

You can find all following functionality under `Presets` dialog.
By default `Gapminder Offline` has only two presets at the moment: `Default` and `Alternative`. These presets are read only. You can clone and later edit any of these presets using following instructions:

`1.` Select a base preset:
 
![Select a base preset](01.png)

`2.` Enter a new preset's name:

![Enter a new preset's name](02.png)

`3.` Press a `Close... as...` button:

![Press a `Close ... as ...` button](03.png)

Now your current preset becomes a new preset, and you can freely edit it. When you done editing the model (config) press `Save model for preset...` button.

![New preset](04.png)

Let's switch places of, for example, `axis_x` and `axis_y`. After pressing the buttin, you will see following message:

![Prepare model-config](05.png)

Press the `Export` button to save our changes to disk.

### Note: all changes regarding presets will be saved to `presets.json` file in `Gapminder Offline` root directory.

![Export](06.png)

Presets will begin to export now.

You can now close the application.

![Exported and app should be closed](07.png)

Run the application again and open `Presets` dialog. Now you can see only default presets. Press `Import` button.

![Run and Import](08.png)

Now you can see previously saved presets.

![Trt new model](09.png)

Let's try to apply it: run `Custom DDF folder` option and choose new preset. Results will be as follows:

![Result](10.png)
