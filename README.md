# Raifu <img src="https://gfl.matsuda.tips/uploads/__sized__/UMP45-thumbnail-512x512.png" width="200" />

[![Build Status](https://travis-ci.com/Seqi/raifu.svg?branch=master)](https://travis-ci.com/Seqi/raifu)

A web application to add and customise airsoft loadouts, to help organise your weaponry and tools. These can then be shared and assigned to upcoming events that you're attending. After all, preparation is half the battle.

## Getting Started

Create a `.env` file in root to supply your Firebase credentials. If you need to create a Firebase project, you can get started [here](https://firebase.google.com/). 

You will also need to provide a `NODE_PATH=src` insode your `.env` file to allow for absolute filepaths.

## Technologies

Outside of the functionality, the purpose of this app was to pick up a few new technologies. These were:

-   [Firebase](https://firebase.google.com/)
-   [Google Cloud Project](https://cloud.google.com/)

## Contributing

If you'd like to add a particular weapon or item, please follow the following steps (a guide on creating the image is below):

- Add the item to the file `src/firebase/database/entities/lookups/platforms.js`
- Add the appropriate image to `src/assets/outlines/[type]/[platform]/[itemname].png`

#### Styling

All images must conform to the style used throughout Raifu, being a single basic white outline with minimal to no inner detail (unless said detail is a popular characteristic of the weapon), and at a 45 degree angle, with the barrel pointing to the top right.

Weapon and gear images must be as close to **W:220px, H:235px** as possible. 

Attachment images must be as close to **W:220px, H:80px** as possible.

This ensures that no stretching distorts the image.

#### File Naming

Ensure that any spaces in your weapon name are replaced by hyphons in your filename. For example, adding `Desert Eagle`, an image named `desert-eagle.png` should be added. 

Also ensure that any periods in your weapon name are not present in your filename. For example, adding `AR .556`, an image named `ar-556.png` should be added.

#### Example

Most images were created using *Inkscape* software, a free open source vector graphics editor. From within *Inkscape*, use the following steps:

- In `File->Document Properties`, set this to **W:220px, H: 235px** or  **W:220px, H:80px** depending on the item you are creating an image for. This gives you a 'Canvas' to stay inside, which matches the aspect ratio and size of the box the image will be placed in.
- Find your base image and copy this into *Inkscape*.
- Open the `Trace Bitmap` option in `Path->Trace Bitmap`.
- Click `Live Preview` to see what you're working with.
- Click `Remove Background`
- In the `Options` tab, up the `Surpress Speckles` setting to somewhere around 100. This ensures no little details are left. 
- Modify the `Brightness Cutoff` until a vast majority of the weapon is filled black. Small white speckles are okay due to setting `Surpress Speckles` (ensure the cutoff isn't too high, as this makes the outline jagged and inaccurate).
- Click `Ok` once you're happy.
- Delete the original image.
- If there are any details within the outline that need to be deleted, use the `Edit paths by nodes` tool (press `F2`), highlight the nodes that make up the inner detail and delete them.
- Open the `Fill and Stroke` panel with `Ctrl-Shift-F`
- Use `No Paint` (the X) for Fill, and `Flat Colur` for Stroke Paint.
- Set the Stroke Paint colour to white (255,255,255).
- If necessary, rotate the image so that it's at a 45 degree angle, with the barrel pointing to the top right. This can be done in the `Transform` panel (`Ctrl-Shift-M`), in the `Rotate` tab. You can also flip the image by pressing `H` with the image selected.
- Resize the image to fit within the original canvas. This can be done using the `Transform` panel. On the `Scale` tab, make sure `Scale Proprotionally` is checked, the unit is `px`, Start with a width of *220px* and reduce it until the image fits nicely in the canvas. Depending on the aspect ratio of your rotated image, the width value may end up in the low 100s. Just keep modifying the value until the image fits in the canvas.
- Thicken the outline in `Fill and Stroke` panel, in the `Stroke Style` tab. For consistency, use a value of *0.4mm*
- That's it! Export the .png image and add it to the appropriate folder with the correct naming mentioned above.