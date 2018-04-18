const transforms = [
  {
    regex: /const/g,
    replaceWith: '<span class="red">const</span>',
  },
  {
    regex: /var/g,
    class: 'red',
  },
  {
    regex: /let/g,
    class: 'red',
  },
];

const transformText = (html) => {
  const newHTML = html;
  transforms.forEach((transform) => newHTML.replace(transform.regex, ''));
  return html;
};

export default transformText;
