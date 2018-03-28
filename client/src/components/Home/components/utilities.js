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
        return newDocument;
      }
      if (newDocument[currentRowIndex - 1] === '') {
        newDocument.splice(currentRowIndex, 1);
        return newDocument;
      }
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
        return currentRowNumber;
      }
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
