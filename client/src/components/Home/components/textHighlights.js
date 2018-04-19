const regex = {
  startOfLine: (str, flags = 'gm') => new RegExp(`^\\s*(${str})`, flags),
};

const transforms = [
  {
    string: 'const',
    regex: regex.startOfLine,
    class: 'red',
  },
  {
    string: 'let',
    regex: regex.startOfLine,
    class: 'red',
  },
  {
    string: 'var',
    regex: regex.startOfLine,
    class: 'red',
  },
  {
    string: 'function',
    regex: regex.startOfLine,
    class: 'blue',
  },
  {
    string: 'import',
    regex: regex.startOfLine,
    class: 'blue',
  },
  {
    string: 'export',
    regex: regex.startOfLine,
    class: 'blue',
  },
  {
    string: 'return',
    regex: regex.startOfLine,
    class: 'blue',
  },
];

const transformText = (html) => {
  let newHTML = html;
  transforms.forEach((transform) => {
    newHTML = newHTML.replace(
      transform.regex(transform.string),
      `<span class="${transform.class}">${transform.string}</span>`,
    );
  });
  return newHTML;
};

export default transformText;
