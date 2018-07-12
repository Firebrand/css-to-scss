![css-to-scss logo](https://raw.githubusercontent.com/Firebrand/css-to-scss/master/logo.gif)

# CSS-to-SCSS

Convert plain CSS into SCSS, tidy up your existing SCSS, and more!

## Installation

### As an executable:

```
npm install -g css-to-scss
```

### As a library:

```
npm install --save css-to-scss
```


## Usage

### As an executable:

You can use the command css-to-scss on a css file to convert it to scss, or on an existing scss file to clean it up

```
css-to-scss -o <filename>
```

### As a library:

You can use CSS-to-SCSS as a library to convert css into scss, a javascript object, a clean scss string or a processed file.

```
const cssConverter = require('css-to-scss');

const cssObject = cssConverter.cssToObject(<string>);
```

**OR**

```
const cssConverter = require('css-to-scss');

const scssString = cssConverter.cssToScss(<string>);
```

**OR**

```
const cssConverter = require('css-to-scss');

cssConverter.processCSSFile(<filename>);
```


## Examples

### Running CSS-to-SCSS executable on a css/sass/scss file

```
$ css-to-scss -o lib/styles/main.css
```

### Using the CSS-to-SCSS library


```
const cssConverter = require('css-to-scss');

const cssObject = cssConverter.cssToObject('.class1 {color: red} .class1 h1 {font-size: 15px}');
console.log(cssObject['.class1']);

const scssString = cssConverter.cssToScss('.class1 {color: red} .class1 h1 {font-size: 15px}');
console.log(scssString);
```

## Support

If you experience any bugs or issues please post a comment here:  <https://github.com/Firebrand/css-to-scss/issues>
Typically it will get responded to and resolved within 24hrs.
Make sure to include the error message as well as the css you are inputting into it.

## License

ISC
