# instagram-saved-downloader

Download your Instagram Saved Images to a local machine

## How to run the script locally:

> Requires chrome version 55+ (es6 support 97%).

1. Navigate to Instagram (web)
2. Navigate to your profile, and click the "Saved Images" button.
3. Download the index.js file to your local machine.
4. Open up the Developer Console (`CMD + ALT + i` on macOS) (`F12` on Win).
5. Click the "Sources" tab
6. On the left side, (click the two arrows if on small screen) select `Snippets`
7. Under the "Snippets" tab, create a new snippet.
8. Copy and paste the contents from the index.js file to the worksapce of the newly created snippet, and save.
9. right click the name of the script you created and click `Run`

## Instructions:

> The module offers 2 approaches, the first is a slow time based fetching, scrolling the window every 5 seconds (configurable), the second is a recursive approach offering speedy downloads

1. After following the examples above, open your console (`esc` key or `console` tab).
2. Type in the following: `instaDownloader.init()`
3. A. To start a fast recursive download: `instaDownloader.startFastDownload()`

   B. To start a slow timed download: `instaDownloader.startSlowDownload()`

4. Thats it ! sit back and let it download.

Author: Nox G. <mailto:nokkygoren@gmail.com> Feel free to contirbute with a PR.
