# How to Use Yii2 Advanced with MyDevOp in 6 quick steps.

When you're done, access the root link `/` and `/admin` to see the magic.

## General steps

1. Once you logged in, click on the **Create New Project** Button.

(Image)

2. Type the name for your new project to identify it.

3. Select the Yii2Advanced AddOn


## For a brand new project

4. Go to the final steps

## Using your Github Code.

4. Connect your Guthub Account and Select your Yii2Advanced Repository. 

5. Add the following lines to your `backend/config/main.php` or see if you have them already...

```
<?php

return [
    'homeUrl' => '/admin',
    'components' => [
        'request' => [
            'baseUrl' => '/admin',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
        ],
    ],
];
```

And to `frontend/config/main.php`

```
<?php

return [
    'homeUrl' => '/',
    'components' => [
        'request' => [
            'baseUrl' => '',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
        ],
    ],
];
```

6. Go to final steps. 

## Final steps

1. Click on "Create Project"

2. On the Project page, click **Deploy** to see the project live on your new Staging Environment. It'll take around 3 mins to finish the setup.

3. Download your local environment. You can use our [CLI]() as well.


That's it! Go ahead throwing tons of lines of code!

Check our guide on ["Local+Stage Sync on 3 steps"]() to sync Local and Staging Envs!.


### Troublshooting.

#### Compatibility.

If you are using a custom Yii2Advanced repository, make sure to follow the [Recommended Structure for a Yii2Advanced Project]() in order to have a clean Deploy and Local Environment.

