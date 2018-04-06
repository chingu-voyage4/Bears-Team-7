const addValueAtIndex = (rowText, value, index) => {
  const val = `${rowText.slice(0, index)}${value}${rowText.slice(index)}`;
  return val;
};

const removeValueAtIndex = (rowText, index) => {
  const val = rowText.slice(0, Math.max(0, index - 1)) + rowText.slice(index);
  return val;
};

export const updateDocumentData = (
  document,
  { offset, rowIndex },
  { keyCode, key },
) => {
  const newDocument = [...document];
  switch (keyCode) {
    // Enter
    case 13: {
      const beforeBreak = newDocument[rowIndex].slice(0, offset);
      const afterBreak = newDocument[rowIndex].slice(offset);
      newDocument[rowIndex] = beforeBreak;
      newDocument.splice(rowIndex + 1, 0, afterBreak);
      return newDocument;
    }
    // backspace
    case 8:
      if (newDocument.length === 1 && newDocument[0] === '') {
        // If we are at the very start of the document
        // i.e. the document is empty. Don't remove anything else
        return newDocument;
      }
      if (newDocument[rowIndex] === '') {
        // If we are at the start of a new line, remove the line
        newDocument.splice(rowIndex, 1);
        return newDocument;
      }
      // Otherwise remove the next character on the line
      newDocument[rowIndex] = removeValueAtIndex(newDocument[rowIndex], offset);
      return newDocument;
    // Tab
    case 9:
      newDocument[rowIndex] = addValueAtIndex(
        newDocument[rowIndex],
        '\xa0\xa0',
        offset,
      );
      return newDocument;
    default:
      newDocument[rowIndex] = addValueAtIndex(
        newDocument[rowIndex],
        key,
        offset,
      );
      return newDocument;
  }
};

export const updateCaretAtInput = (
  document,
  { offset, rowIndex },
  { keyCode },
) => {
  switch (keyCode) {
    // Enter
    case 13:
      return { offset: 0, rowIndex: rowIndex + 1 };
    // Backspace
    case 8:
      if (offset === 0 && rowIndex === 0) {
        // If we are at the very start of the document
        // i.e. the document is empty. Don't remove anything else
        return { offset: 0, rowIndex: 0 };
      }
      if (document[rowIndex] === '') {
        // If we are at the start of a new line, remove the line
        return {
          offset: document[rowIndex - 1].length,
          rowIndex: rowIndex - 1,
        };
      }
      // move caret to the index before the deleted character
      return { offset: Math.max(0, offset - 1), rowIndex };
    // Tab
    case 9:
      return { offset: offset + 2, rowIndex };
    default:
      return { offset: offset + 1, rowIndex };
  }
};

export const updateCaretAtSpecialKey = (
  document,
  { offset, rowIndex },
  { keyCode },
) => {
  switch (keyCode) {
    // Left arrow key
    case 37:
      // If the caret is at the beginning of the document, keep it as it is
      if (offset === 0 && rowIndex === 0) {
        return { offset: 0, rowIndex: 0 };
      } else if (offset === 0) {
        // If the caret is at the beginning of the current line, move the caret to
        // the end of the previous line
        return {
          offset: document[rowIndex - 1].length,
          rowIndex: rowIndex - 1,
        };
      }
      return { offset: offset - 1, rowIndex };
    // Up arrow key
    case 38:
      // If the caret is at the top of the document, keep it as it is
      if (rowIndex === 0) {
        return { offset: 0, rowIndex: 0 };
      }
      // Otherwise, move caret to the previous line, either at the same offset
      // as previously, or to the end of the line if it doesn't reach the offset
      return {
        offset: Math.min(offset, document[rowIndex - 1].length),
        rowIndex: rowIndex - 1,
      };
    // Right arrow key
    case 39:
      // If the caret is at the end of the document, keep it as it is
      if (
        offset === document[rowIndex].length &&
        rowIndex === document.length - 1
      ) {
        return { offset, rowIndex };
      }
      // If the caret is at the end of a line, move caret to the next line
      if (offset === document[rowIndex].length) {
        return { offset: 0, rowIndex: rowIndex + 1 };
      }
      return { offset: offset + 1, rowIndex };
    // Down arrow key
    case 40:
      // If the caret is at the bottom of the document, keep it as it is.
      if (rowIndex === document.length - 1) {
        return { offset, rowIndex };
      }
      // Otherwise, move caret to the next line at the same offset. If the next
      // line is shorter than the offset, move the caret to the end of the next
      // line.
      return {
        offset: Math.min(offset, document[rowIndex - 1].length),
        rowIndex: rowIndex + 1,
      };
    default:
      return { offset, rowIndex };
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
  16: 'shift',
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
