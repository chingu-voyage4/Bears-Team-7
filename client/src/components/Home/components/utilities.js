export const updateDocumentData = (document, { keyCode, key }) => {
  const newDocument = [...document];
  const currentRowIndex = document.length - 1;
  switch (keyCode) {
    // Enter
    case 13:
      newDocument.splice(document.length, 0, '');
      return newDocument;
    // backspace
    case 8:
      if (newDocument.length === 1 && newDocument[0] === '') {
        // If we are at the very start of the document
        // i.e. the document is empty. Don't remove anything else
        return newDocument;
      }
      if (newDocument[currentRowIndex] === '') {
        // If we are at the start of a new line, remove the line
        newDocument.splice(currentRowIndex, 1);
        return newDocument;
      }
      // Otherwise remove the next character on the line
      newDocument[currentRowIndex] = newDocument[currentRowIndex].slice(0, -1);
      return newDocument;
    // Tab
    case 9:
      newDocument[currentRowIndex] += '\xa0\xa0';
      return newDocument;
    default:
      newDocument[currentRowIndex] += key;
      return newDocument;
  }
};

export const getDefaultValue = () => {
  const defaultValue = [''];
  if (
    window &&
    window.localStorage &&
    window.localStorage.getItem('documentData')
  ) {
    return JSON.parse(window.localStorage.getItem('documentData'));
  }
  return defaultValue;
};

export const setValueToStorage = (value) => {
  if (window && window.localStorage) {
    window.localStorage.setItem('documentData', JSON.stringify(value));
  }
};

export const listOfSpecialKeys = {
  91: 'command',
  18: 'option',
  17: 'control',
  27: 'escape',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
};

// export const isInListOfUnusedKeys = (values) => {
//   // values.filter((value) => listOfUnusedKeys.indexOf(value) !== -1);
//   values.filter(value => listOfUnusedKeys.includes(value));
//   return values.length === 0;
// }

// values = [91, 72]
