# DocumentCSS Starter Kit

## in progress, almost ready!

## Getting Started
1. Clone this repo.
2. Run `npm install`
3. Install gulp globally if you never have - `npm install -g gulp`. Optionally you can install documentjs globally so you can run the `documentjs` build command - `npm install -g documentjs`.
4. Run `gulp dev` to run a live reloading local server at `http://localhost:4200/` (you can change this port number in gulpfile.js). Note that live reload may create a js tab when viewing previews on the localhost.

### How this is structured.
Make your base patterns here. Import styles.css into your apps. Your apps will have app specific style overrides and stuffs too.

### Notes on Less
The styles are compiled with an autoprefixer and minification. The final output you'll want to use in your apps is `dist/styles.css`.

### Making your own repo
You'll need to make a repo for your pattern library.

## How to do stuff...
1. Adding your less files and documenting them as you go.
2. Adding demos.
3. Customizing the style guide site. -- note, the browser should live reload after everything is done recompiling, generally takes about 5 seconds, you'll probably spam `cmd+shift+r` anyway. :)
4. Deploying to gh-pages
5. Using sass instead of less.