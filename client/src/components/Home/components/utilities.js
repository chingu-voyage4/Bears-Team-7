export const updateDocumentData = (
  document,
  currentRowIndex,
  { keyCode, key },
) => {
  const newDocument = [...document];
  switch (keyCode) {
    // Enter
    case 13:
      newDocument.splice(currentRowIndex, 0, '');
      return newDocument;
    // backspace
    case 8:
      if (newDocument.length === 1 && newDocument[0] === '') {
        // If we are at the very start of the document
        // i.e. the document is empty. Don't remove anything else
        return newDocument;
      }
      if (newDocument[currentRowIndex - 1] === '') {
        // If we are at the start of a new line, remove the line
        newDocument.splice(currentRowIndex, 1);
        return newDocument;
      }
      // Otherwise remove the next character on the line
      newDocument[currentRowIndex - 1] = newDocument[currentRowIndex - 1].slice(
        0,
        -1,
      );
      return newDocument;
    // Tab
    case 9:
      newDocument[currentRowIndex - 1] += '\xa0\xa0';
      return newDocument;
    default:
      newDocument[currentRowIndex - 1] += key;
      return newDocument;
  }
};

export const setRowNumber = (rowValue, currentRowNumber, { keyCode }) => {
  switch (keyCode) {
    // Enter
    case 13:
      return currentRowNumber + 1;
    // backspace
    case 8:
      if (currentRowNumber === 1 && rowValue === '') {
        // If we are at the start of the document, we don't want to decrease the row number
        return currentRowNumber;
      }
      // Otherwise reduce the row number if were are at the start of the row
      return rowValue === '' ? currentRowNumber - 1 : currentRowNumber;
    default:
      return currentRowNumber;
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
