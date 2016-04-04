# DocumentCSS Starter Kit

[DocumentCSS](http://documentcss.com/) is an awesome way to document style patterns as you make them. This starter kit was built to make it super easy to get started.

Speaking of getting started...

## Getting Started
### Install
1. Clone this repo.
2. Transfer the contents into your own style guide repo. You'll want to update stuff in the `package.json` file to reference your style guide repo.
3. Run `npm install`
4. Install gulp globally if you never have: `npm install -g gulp`
5. Optionally you can install documentjs globally so you can run the `documentjs` build command: `npm install -g documentjs`.

### Running
Run `gulp dev` to compile the style guide and run a live reloading local server at `http://localhost:4200/`. You can change the port number in `gulpfile.js`.

Couple notes...
* This was built to use LESS, but you could use SASS/SCSS if you edit the references to `less` in `documentjs.json` and `gulpfile.js`.
* LESS is compiled with autoprefixer and minify.
* When editing the style guide template files, don't spam save! It takes about 5s or so to fully recompile.
* Live reload injects some js into the site that might show up as a js tab on your style demos (next to the "demo" and "HTML" tabs). This js tab won't appear in the site when live reload isn't running.

## How this is structured.
The strategy here is that your core styles patterns are in their own repo with a style guide that others can reference. Then these styles are imported into your apps (the compiled styles from the `dist` folder), you'll have additional app view specific styles that don't necessarily cut it as a pattern in the app's own repo. If you develop a repeatable pattern in an app, transfer it to the style guide! You'll be able to document it quickly and easily.

After you `npm install` and run `gulp dev` for the first time, you'll have a folder structure like this.
- **root**
	- node_modules
	- **dist** - where your compiled and autoprefixed styles will go.
	- **less** - where your styles files and demo snippets go. Note that the `styles.less` file is your LESS import file that gulp will compile (if you change this files name, update the reference in `gulpfile.js`).
		- **demos** - where your demo snippets go for style guide examples.
    - **style-guide-theme** - where you modify styles and templates that apply to the style guide itself. Remember that when saving changes here, it takes about 5s to recompile everything, don't spam save!
    - **styleguide** - where your pattern library is generated.

## How to do stuff.
### Documenting styles as you go.
If you checkout the `buttons.less` example file in the `less` folder, you can get an idea how it works.

#### Pages
* At the top of the document an `@stylesheet NAME TITLE` is declared. This creates a page. `NAME` is the unique name that will show up in the URL, `TITLE` is what will appear in the style guide as the page header.
* The `@parent NAME ORDER` tells the static site generator where to place this page in the navigation. In this starter kit, you'll pretty much always have this as `@parent styleguide` plus whatever index number you want to give it, controlling what order it appears in.
* The `@description` can be written using markdown and appears at the top of the page under the main title.

You can also use `@group` and other cool stuff to organize your documentation. Learn more at [documentcss.com](http://documentcss.com).

#### Individual Style Demos
* Above where a pattern's styles are written, declare `@styles NAME TITLE` to document it. The `NAME` is the unique identifier that shows up in the URL, and the `TITLE` appears on the page.
* Again, `@description` allows you to write markdown that will appear below the `@styles` title.
* `@demo PATH` allows you specify a demo snippet to use with these styles. Create a demo snippet of `HTML` markup in `./less/demos/` and reference it in the styles file (ex. `@demo demos/some-demo.html`).

### Customizing the Style Guide
- Do so in `./style-guide-theme/`.
- The `static` folder contains styles and images that you can override. The styles in there are written with LESS, they're essentially copied from the default documentjs theme with a few modifications.
- The `templates` folder contains handlebar templates that you can modify for changing the header/footer/pages/sidebar markup.

### Deploying
The `styleguide` folder is your generated pattern library. You can upload that to any server or use [github pages](https://pages.github.com/) to host it.