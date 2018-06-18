const dbg = require('../utils/devbug');
const _ = require('lodash');

let word = '';
let processed = '';
const levelClosers = {};


const increaseProcessed = (tackOnString) => {
  processed += word + tackOnString;
  word = '';
  dbg('Added to processed',processed);
  dbg('Level closers',levelClosers);
};


const charByChar = (flattenedContents) => {
  let currentLevel = 0;
  let i;
  let inProp = false;

  for (i = 0; i <= flattenedContents.length - 1; i++) {
    const charAt = flattenedContents[i];


    if ((charAt === ' ' || charAt === '>') && word.length > 0) {
      if (!inProp) {
        if (word[word.length - 1] !== ';') {
          increaseProcessed('{');
          levelClosers[currentLevel] = levelClosers[currentLevel] == null ? 1 : levelClosers[currentLevel] + 1;
        } else {
          increaseProcessed('');
        }
      }
      word += charAt;
    } else if (charAt === '{') {
      levelClosers[currentLevel] = levelClosers[currentLevel] == null ? 1 : levelClosers[currentLevel] + 1;
      currentLevel += 1;
      increaseProcessed('{');
    } else if (charAt === '}') {
      const prevLevel = currentLevel - 1;
      word += '}'.repeat(levelClosers[prevLevel]);
      levelClosers[prevLevel] = null;
      currentLevel = prevLevel;
    } else if (charAt === ':') {
      inProp = true;
      word += charAt;
    } else if (charAt === ';') {
      inProp = false;
      word += charAt;
      increaseProcessed('');
    } else {
      word += charAt;
    }


    // dbg('Current letter', charAt);
    // dbg('Current word', word);
    // processed += word;
    // dbg('Processed', processed);
    // dbg('LevelClosers', levelClosers);
    // dbg('Current level', currentLevel);

    // dbg('Processed', charAt);
    // dbg('Processed', processed);
  }

  increaseProcessed('');
  return processed;
};


const sassToJSON = (sass) => {
  let parsedResult = '';

  const singleLineCss = sass.replace(/\r?\n|\r/g, '');


  let i;
  let buffer = '';


  for (i = 0; i <= singleLineCss.length; i++) {
    const currentChar = singleLineCss.charAt(i);


    if (currentChar === '{') {
      if (!(_.endsWith(parsedResult, '{'))) {
        parsedResult += ',';
      }
      parsedResult += `"${buffer.trim()}~${i}": {`;
      buffer = '';
    } else if (currentChar === '}') {
      parsedResult += currentChar;
      buffer = '';
    } else if (currentChar === ';') {
      const elementArr = buffer.split(':');

      if (!(_.endsWith(parsedResult, '{'))) {
        parsedResult += ',';
      }
      parsedResult += `"${elementArr[0].trim()}":"${elementArr[1].trim()}"`;
      buffer = '';
    } else {
      buffer += currentChar;
    }
  }


  return `{${_.trim(parsedResult, ',')}}`;
};


const sassParser = (cssContents) => {
  let flattenedFileContents = cssContents.replace(/(?:\r\n|\r|\n)/g, '');
  flattenedFileContents = flattenedFileContents
    .replace(new RegExp('@include', 'g'), '@include:')
    .replace(/( *{ *)/g, '{')
    .replace(/( *} *)/g, '}')
    .replace(/( *; *)/g, ';')
    .replace(/( *: *)/g, ':')
    .replace(/( *> *)/g, '>')
    .replace(/( *" *)/g, '\'')
    .trim();
  dbg('Flattened file', flattenedFileContents);
  // const processedFile = charByChar(flattenedFileContents);
  // dbg('Processed File', processedFile);
  // const jsonFile = sassToJSON(processedFile);
  // dbg('JSON File', jsonFile);
  // const objectFile = JSON.parse(jsonFile);
  // dbg('Object', objectFile);
};


module.exports = sassParser;
