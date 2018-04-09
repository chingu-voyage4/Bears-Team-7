import { mount } from '@vue/test-utils';
import Component from '@/components/Home/components/Editor';
import { tab, keyCodes } from './keycodes';

const rowSelector = 'div[data-test="editor"] div[data-test="row-data"]';

const getEditorRows = (wrapper) => wrapper.findAll(rowSelector);

const textAtLineNumber = (wrapper, lineNumber) => {
  const rows = getEditorRows(wrapper);
  return rows.at(lineNumber - 1).text();
};

afterEach(() => {
  window.localStorage.clear();
});

describe('Editor.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Component);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('contains the editor div', () => {
    const wrapper = mount(Component);
    expect(wrapper.contains(rowSelector)).toBe(true);
  });

  test('defaults to having no text in the editor', () => {
    const wrapper = mount(Component);
    expect(textAtLineNumber(wrapper, 1)).toBe('');
  });

  test('defaults to having a single line', () => {
    const wrapper = mount(Component);
    const rows = getEditorRows(wrapper);
    expect(rows.length).toBe(1);
  });

  test('Adds the "a" character to the editor when it is pressed', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    expect(textAtLineNumber(wrapper, 1)).toBe('a');
  });

  test('Adds abc123 to the editor', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);
    wrapper.trigger('keydown', keyCodes[1]);
    wrapper.trigger('keydown', keyCodes[2]);
    wrapper.trigger('keydown', keyCodes[3]);
    expect(textAtLineNumber(wrapper, 1)).toBe('abc123');
  });

  test('The enter key adds a new line to the editor', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown.enter');
    const rows = getEditorRows(wrapper);
    expect(rows.length).toBe(2);
  });

  test('The backspace key removes a character', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);
    wrapper.trigger('keydown', keyCodes.backspace);
    expect(textAtLineNumber(wrapper, 1)).toBe('ab');
  });

  test('The backspace key removes new lines', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown', keyCodes.backspace);
    expect(getEditorRows(wrapper).length).toBe(1);
  });

  test('The backspace key deletes the last character of a line without reducing the current line number', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.backspace);
    expect(getEditorRows(wrapper).length).toBe(2);
    expect(textAtLineNumber(wrapper, 1)).toBe('');
    expect(textAtLineNumber(wrapper, 2)).toBe('');
  });

  test('The backspace deletes a new line and then moves the cursor to the end of the previous line', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown', keyCodes.backspace);
    expect(getEditorRows(wrapper).length).toBe(1);
    expect(textAtLineNumber(wrapper, 1)).toBe('a');
  });

  test('The tab key gets added to the Vue document object', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.tab);
    expect(wrapper.vm.documentData).toEqual([tab]);
  });

  test('The tab key gets added to the document', () => {
    /*
        Note that .text() trims the resulting string as seen here: https://github.com/vuejs/vue-test-utils/issues/152
        Therefore we have wrapped the tab in two characters
      */
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.tab);
    wrapper.trigger('keydown', keyCodes.a);
    expect(textAtLineNumber(wrapper, 1)).toBe(`a${tab}a`);
  });

  test('Document is saved to localstorage', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);

    // Mound a second component and check that the default value is the expected
    // value from the previous wrapper
    const secondWrapper = mount(Component);
    expect(textAtLineNumber(secondWrapper, 1)).toBe('a');
  });

  test('An empty editor has a row with row number of 1', () => {
    const wrapper = mount(Component);
    const expectedFirstRowNumber = '1';
    const rowNumbers = wrapper.findAll(
      'div[data-test="editor"] div[data-test="row-number"]',
    );
    expect(rowNumbers.length).toBe(1);
    expect(rowNumbers.at(0).text()).toBe(expectedFirstRowNumber);
  });

  test('First 3 rows to be row numbers 1, 2 and 3 respectively', () => {
    const wrapper = mount(Component);
    const expectedFirstRowNumber = '1';
    const expectedSecondRowNumber = '2';
    const expectedThirdRowNumber = '3';
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown.enter');
    const rowNumbers = wrapper.findAll(
      'div[data-test="editor"] div[data-test="row-number"]',
    );
    expect(rowNumbers.length).toBe(3);
    expect(rowNumbers.at(0).text()).toBe(expectedFirstRowNumber);
    expect(rowNumbers.at(1).text()).toBe(expectedSecondRowNumber);
    expect(rowNumbers.at(2).text()).toBe(expectedThirdRowNumber);
  });

  test('Caret moves after every inputted character', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);

    const rowBeforeCaret = wrapper.find(
      '[data-test="editor"] span.row-before-caret',
    );
    expect(rowBeforeCaret.text()).toBe('abc');
  });

  test('Left arrow key moves caret before the entered character', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.left);

    const rowBeforeCaret = wrapper.find(
      'div[data-test="editor"] span.row-before-caret',
    );
    expect(rowBeforeCaret.text()).toBe('');
  });

  test('Pressing up, left, down, and right arrows keys in succession return caret to its original position', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown', keyCodes.b);

    const rows = wrapper.findAll(
      'div[data-test="editor"] div[data-test="row-data"]',
    );
    const rowBeforeCaret = wrapper.find(
      'div[data-test="editor"] span.row-before-caret',
    );
    expect(rows.at(0).text()).toBe('a');
    expect(rowBeforeCaret.text()).toBe('b');

    wrapper.trigger('keydown', keyCodes.up);
    wrapper.trigger('keydown', keyCodes.left);
    wrapper.trigger('keydown', keyCodes.down);
    wrapper.trigger('keydown', keyCodes.right);
    expect(rowBeforeCaret.text()).toBe('b');
  });
});
