import { mount } from '@vue/test-utils';
import Component from '@/components/Editor';

describe('Editor.vue', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Component);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('contains the editor div', () => {
    const wrapper = mount(Component);
    expect(wrapper.contains('div[data-test="editor"]')).toBe(true);
  });

  test('defaults to having no text in the editor', () => {
    const wrapper = mount(Component);
    expect(wrapper.find('div[data-test="editor"]').text()).toBe('');
  });

  const keyCodes = {
    a: {
      keyCode: 65,
      key: 'a'
    },
    b: {
      keyCode: 66,
      key: 'b'
    },
    c: {
      keyCode: 67,
      key: 'c'
    },
    1: {
      keyCode: 49,
      key: '1'
    },
    2: {
      keyCode: 50,
      key: '2'
    },
    3: {
      keyCode: 51,
      key: '3'
    },
    backspace: {
      keyCode: 8
    }
  };

  test('Adds the "a" character to the editor when it is pressed', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    expect(wrapper.find('div[data-test="editor"]').text()).toBe('a');
  });

  test('Adds abc123 to the editor', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);
    wrapper.trigger('keydown', keyCodes[1]);
    wrapper.trigger('keydown', keyCodes[2]);
    wrapper.trigger('keydown', keyCodes[3]);
    expect(wrapper.find('div[data-test="editor"]').text()).toBe('abc123');
  });

  test('The enter key adds a new line to the editor', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown', keyCodes[1]);
    wrapper.trigger('keydown', keyCodes[2]);
    wrapper.trigger('keydown', keyCodes[3]);
    expect(wrapper.find('div[data-test="editor"]').text()).toBe('abc\n123');
  });

  test('The backspace key removes a character', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);
    wrapper.trigger('keydown', keyCodes.backspace);
    expect(wrapper.find('div[data-test="editor"]').text()).toBe('ab');
  });

  test('The backspace key removes new lines', () => {
    const wrapper = mount(Component);
    wrapper.trigger('keydown', keyCodes.a);
    wrapper.trigger('keydown', keyCodes.b);
    wrapper.trigger('keydown', keyCodes.c);
    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown', keyCodes.backspace);
    expect(wrapper.find('div[data-test="editor"]').text()).toBe('abc');
  });
});

// vm.$el.querySelector('div[data-test="editor"]').textContent,
