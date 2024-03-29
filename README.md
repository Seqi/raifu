# Raifu <img src="https://gfl.matsuda.tips/uploads/__sized__/UMP45-thumbnail-512x512.png" width="200" />

[![Build Status](https://travis-ci.com/Seqi/raifu.svg?branch=master)](https://travis-ci.com/Seqi/raifu)

A web application to add and customise airsoft loadouts, to help organise your weaponry and tools. These can then be
shared and assigned to upcoming events that you're attending. After all, preparation is half the battle. Find the app at
[raif.us](https://raif.us).

## Getting Started

To run Raifu locally, you will need to follow a certain number of steps to configure all required elements.

#### Firebase

Create a `.env` file in web to supply your Firebase credentials. If you need to create a Firebase project, you can get
started [here](https://firebase.google.com/). When you create a Firebase project and add a web app, you will be provided
with a few settings. Set these in your `.env` file with the following keys:

```
VITE_FIREBASE_APIKEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_APP_ID
```

Your `.env` file should now look something like this:

```
VITE_FIREBASE_APIKEY=myapikey
VITE_FIREBASE_AUTH_DOMAIN=myauthdomain
VITE_FIREBASE_PROJECT_ID=myprojectid
VITE_FIREBASE_APP_ID=my:app:id
```

Next, install the `firebase-tools` package from npm with `npm i -g firebase-tools`. This contains the emulator to spin up a local firebase development backend. Then run `firebase login` to login
with your Google account linked to your firebase project.

Finally, replace the existing project id with your Firebase project id in `.firebaserc`.

#### Database

Raifu uses PostgreSQL for data storage and requires a connection to run. If you don't have an existing PostgreSQL
instance, it is recommended to use Docker to spin one up using the docker-compose file in root. Once configured, create a database and run the migration script in `sql/create_tables`.

#### Cloud Functions Config

With the emulator installed, and the database spun up, cloud functions need to know where the database is. To point the cloud functions to the database, create a `.runtimeconfig.json` file in the `functions` directory containing the database credentials:

```
{
    "db": {
      "user": "YOUR_DATABASE_USER",
      "password": "YOUR_DATABASE_PASSWORD",
      "name": "YOUR_DATABASE_NAME",
      "host": "YOUR_DATABASE_HOST"
    }
}
```

Finish the setup by running `npm run init` to install all required packages in both the web client and the cloud functions.

You should now be ready to run the project locally, using `npm start`. This will spin up both the React development
server and the Cloud Functions emulator.

## Troubleshooting

Sometimes the Firebase functions emulator requires admin privileges on Windows to run. If the Firebase functions are not
running, try running `npm start` in a terminal with elevated privileges.

## Contributing

To request a weapon or item, please add an issue with the `request` tag.

If you'd like to add a particular weapon or item, please follow the following steps (a guide on creating the image is
below):

-   Add the item to the file `src/firebase/database/entities/lookups/platforms.js`
-   Add the appropriate image vector to `src/assets/outlines/[type]/[platform]/[itemname].svg`

#### Styling

All images must conform to the style used throughout Raifu, being a single basic white outline with minimal to no inner
detail (unless said detail is a popular characteristic of the weapon). Weapons should be at a 45 degree angle, with the
barrel pointing to the top right, whereas gear and attachments should be upright.

Ensure that the thickness of the outline is consistent with other items.

It is recommended that a canvas of **W:220px, H:235px** is used for weapons and **W:220px, H:80px** for attachments as
this matches the card content size.

#### File Naming

Ensure that any spaces in your weapon name are replaced by hyphons in your filename. For example, adding `Desert Eagle`,
an image named `desert-eagle.svg` should be added.

Also ensure that any periods in your weapon name are not present in your filename. For example, adding `AR .556`, an
image named `ar-556.svg` should be added.

#### Example

Most images were created using [Inkscape](https://inkscape.org/), a free open source vector graphics editor. From within
_Inkscape_, use the following steps:

-   In `File->Document Properties`, set this to **W:220px, H: 235px** or **W:220px, H:80px** depending on the item you
    are creating an image for. This gives you a 'Canvas' to stay inside, which matches the aspect ratio and size of the
    box the image will be placed in.
-   Find your base image and copy this into _Inkscape_.
-   Open the `Trace Bitmap` option in `Path->Trace Bitmap`.
-   Click `Live Preview` to see what you're working with.
-   Click `Remove Background`
-   In the `Options` tab, up the `Surpress Speckles` setting to somewhere around 100. This ensures no little details are
    left.
-   Modify the `Brightness Cutoff` until a vast majority of the weapon is filled black. Small white speckles are okay
    due to setting `Surpress Speckles` (ensure the cutoff isn't too high, as this makes the outline jagged and
    inaccurate).
-   Click `Ok` once you're happy.
-   Delete the original image.
-   If there are any details within the outline that need to be deleted, use the `Edit paths by nodes` tool (press
    `F2`), highlight the nodes that make up the inner detail and delete them.
-   Open the `Fill and Stroke` panel with `Ctrl-Shift-F`
-   Use `No Paint` (the X) for Fill, and `Flat Colur` for Stroke Paint.
-   Set the Stroke Paint colour to white (255,255,255).
-   If necessary, rotate the image so that it's at a 45 degree angle, with the barrel pointing to the top right. This
    can be done in the `Transform` panel (`Ctrl-Shift-M`), in the `Rotate` tab. You can also flip the image by pressing
    `H` with the image selected.
-   Thicken the outline in `Fill and Stroke` panel, in the `Stroke Style` tab. For consistency, use a value of around
    _0.4mm_

## Technologies

Outside of the functionality, the purpose of this app was to pick up a few new technologies. These were:

-   [Firebase](https://firebase.google.com/)
-   [Google Cloud Project](https://cloud.google.com/)
