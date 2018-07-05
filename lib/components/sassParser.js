const {
  dbg,
  colors,
} = require('../utils/devbug');
const _ = require('lodash');
const perfectionist = require('perfectionist');
const namer = require('color-namer');
const md5 = require('md5');
const sass = require('node-sass');

const colorObj = {};
let mainSCSS = '';

const cssToSingleLine = contents => contents.replace(/^\s*\/\/.*/gm, '').replace(/\/\*.*\*\//g, '').replace(/(?:\r\n|\r|\n)/g, '');

const processCssHead = (headContent) => {
  const trimmedHead = headContent.trim();
  let parsedHeadContent = trimmedHead;

  if (trimmedHead.substr(0, 6) !== '@media') {
    parsedHeadContent = trimmedHead
      .replace(/"/g, '\\"')
      .replace(/(\s*>\s*)/g, '{>')
      .replace(/([^\s])(\.)([^\s])/g, '$1{&$2$3')
      .replace(/(\s*:\s*)(?=([^\(]*\([^\(\)]*\))*[^\)]*$)/g, '{&:')
      .replace(/\s(?=([^"]*"[^"]*")*[^"]*$)/g, '{')
      .replace(/(\s*{\s*)/g, '":{"');
  }

  return `"${parsedHeadContent}"`;
};


const processCssBody = (bodyContent) => {
  const bodyContentArr = bodyContent.split(';');
  let cumulator = '';

  bodyContentArr.forEach((attribute) => {
    if (attribute.length > 1) {
      const pullColorVar = attribute.match(/[^0-9A-Za-z]+(#[0-9A-Fa-f]{3,6})/);
      let modAttribute = attribute;

      if (pullColorVar != null) {
        const colorVar = pullColorVar[1];
        const colorName = namer(colorVar).html[0].name;
        colorObj[`$${colorName}`] = `${colorVar}`;
        modAttribute = attribute.replace(/([^0-9A-Za-z]+)(#[0-9A-Fa-f]{3,6})/, `$1$${colorName}`);
      }

      cumulator += `"${modAttribute.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/(\s*;\s*)/g, '","').replace(/(\s*:\s*)/, '":"')
        .trim()}",`;
    }
  });

  return cumulator.substr(0, cumulator.length - 1);
};


const cssToArray = (css) => {
  let level = 0;
  let cumuloString = '';
  const cssArray = [];


  for (let i = 0; i <= css.length; i++) {
    const char = css[i];
    cumuloString += char;
    if (char === '{') {
      level += 1;
    } else if (char === '}') {
      level -= 1;
      if (level === 0) {
        cssArray.push(cumuloString);
        cumuloString = '';
      }
    }
  }

  return cssArray;
};


const cssarrayToObject = (fileContentsArr) => {
  const mainObject = {};

  fileContentsArr.forEach((value) => {
    const head = value.match(/(.*?){/)[1];
    const tail = value.match(/{(.*)}/)[1];

    const dividedHead = head.split(',');

    dividedHead.forEach((headvalue) => {
      if (head.length > 0) {
        const processedHead = processCssHead(headvalue.trim());


        let processedBody = '';
        if (processedHead.substr(0, 7) !== '"@media') {
          processedBody = processCssBody(tail);
        } else {
          processedBody = JSON.stringify(cssarrayToObject(cssToArray(tail)));
          processedBody = processedBody.substr(1, processedBody.length - 2);
        }


        const closingBracketsInHead = (processedHead.match(/{/g) || []).length;

        const completeClause = `${processedHead}:{${processedBody}${'}'.repeat(closingBracketsInHead + 1)}`;


        const objectClause = JSON.parse(`{${completeClause}}`);
        _.merge(mainObject, objectClause);
      }
    });
  });

  return mainObject;
};


const objectContainsObject = (objectVal) => {
  let containsObject = false;
  const keychain = Object.keys(objectVal);

  keychain.forEach((key) => {
    if (typeof objectVal[key] === 'object') containsObject = true;
  });

  return containsObject;
};


const cssobjectToSCSS = (contentObject) => {
  const keychain = Object.keys(contentObject);


  if (!objectContainsObject(contentObject)) {
    keychain.sort();
  }

  keychain.forEach((key) => {
    if (typeof contentObject[key] === 'object') {
      mainSCSS += `${key}{`;
      cssobjectToSCSS(contentObject[key]);
      mainSCSS += '}';
    } else {
      mainSCSS += `${key}:${contentObject[key]};`;
    }
  });
};


const objToKeyValueCss = (objectVal) => {
  if (typeof objectVal === 'object') {
    const keychain = Object.keys(objectVal);

    if (keychain.length > 0) {
      keychain.sort();

      let stringOutput = '';

      keychain.forEach((key) => {
        stringOutput += `${key}:${objectVal[key]};`;
      });


      return stringOutput;
    }
  }
  return '';
};


const sassParser = (fileContents) => {

  const plainCss = sass.renderSync({
    data: fileContents,
  }).css.toString();

  const singleLineCss = cssToSingleLine(plainCss);
  const cssArray = cssToArray(singleLineCss);
  const cssObject = cssarrayToObject(cssArray);
  cssobjectToSCSS(cssObject);
  const colorVars = objToKeyValueCss(colorObj);
  const completedProcessing = colorVars + mainSCSS;


  return perfectionist.process(completedProcessing, { indentSize: 2, colorShorthand: false });
};


module.exports = sassParser;
