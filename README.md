![css-to-scss logo](https://github.com/Firebrand/css-to-scss/blob/master/csstoscss.png)

# css-to-scss

Convert plain CSS into SCSS! Can also be used to tidy up SCSS

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

```
css-to-scss -o <filename>
```

### As a library:

```
const cssConverter = require('css-to-scss');

const cssObject = cssConverter.cssToObject(<string>);
```

OR

```
const cssConverter = require('css-to-scss');

const scssString = cssConverter.cssToScss(<string>);
```


## Examples

### Running css-to-scss executable on a css/sass/scss file

```
$ css-to-scss -o lib/styles/main.css
```

### Using the css-to-scss library


```
const cssConverter = require('css-to-scss');

const cssObject = cssConverter.cssToObject('.class1 {color: red} .class1 h1 {font-size: 15px}');
console.log(cssObject['.class1']);

const scssString = cssConverter.cssToScss('.class1 {color: red} .class1 h1 {font-size: 15px}');
console.log(scssString);
```

## License

ISC
