<template>
  <div
    class="row-text"
    data-test="row"
    v-html="html"
  />
</template>

<script>
import { loopThroughObject, escapeHtml } from './utilities';
import transformText from './textHighlights';

const insertCaretInHtml = (html, caretOffset) => {
  const caretSpan = '<span class="caret"></span>';
  // if the html is empty, simply insert a caret element
  if (html === '') {
    return caretSpan;
  }
  const htmlRegEx = '</?\\w+(?: \\w+=".+?")?>';
  const escapeCodeRegEx = `${Object.values(escapeHtml).join('|')}`;
  const RegEx = new RegExp(`(${htmlRegEx}|${escapeCodeRegEx})`);
  let newHtml = html;
  // split string into array at html tags
  newHtml = newHtml.split(RegEx);

  let offset = 0;
  // loop through the resulting array until we pass the index of the
  // caretOffset, adding the length of each element to the offset
  // variable (ignoring the html tag elements of the array)
  for (
    let curr = 0;
    curr < newHtml.length && offset <= caretOffset;
    curr += 1
  ) {
    if (!new RegExp(htmlRegEx).test(newHtml[curr])) {
      const prevOffset = offset;
      let caret = caretOffset;
      // check if current element is an escape code
      if (new RegExp(escapeCodeRegEx).test(newHtml[curr])) {
        offset += 1;
        // add the length of escape code to the caret to offset it
        caret += newHtml[curr].length;
      } else {
        // add the length of the current element to 'offset'
        offset += newHtml[curr].length;
      }
      // check if the caret offset is now within the current offset
      if (offset >= caretOffset) {
        // subtract the previous offset from the caret offset to
        // get the offset relative to the current split of the string
        const elOffset = caret - prevOffset;
        // insert the string at the resulting offset within the
        // current element
        newHtml[curr] = `${newHtml[curr].slice(
          0,
          elOffset,
        )}${caretSpan}${newHtml[curr].slice(elOffset)}`;
        return newHtml.join('');
      }
    }
  }
  // join the split strings and return
  return newHtml.join('');
};

const parseTextToHTML = (text, caretOffset) => {
  let html = text;
  // replace occurences of special symbols with the appropriate HTML
  // escape code
  loopThroughObject(escapeHtml, (symbol) => {
    html = html.replace(new RegExp(symbol, 'g'), escapeHtml[symbol]);
  });
  html = transformText(html);
  // if the 'caretOffset' exists, insert a caret in the HTML
  if (caretOffset > -1) {
    html = insertCaretInHtml(html, caretOffset);
  }
  html = `<span>${html}</span>`;
  return html;
};

export default {
  name: 'Row',
  props: {
    text: {
      type: String,
      required: true,
    },
    caretOffset: {
      type: Number,
      required: true,
    },
  },
  computed: {
    html: function computeHtml() {
      return parseTextToHTML(this.text, this.caretOffset);
    },
  },
};
</script>

<style lang="scss" scoped>
.row-text {
  position: relative;
}
.row-text /deep/ span {
  position: relative;
}
.row-text /deep/ .caret {
  background: $editor-fontColor;
  width: 1px;
  height: 100%;
  position: absolute;
  animation: blink 2s step-end infinite;
}
.row-text /deep/ .red {
  color: red;
}
/* prettier-ignore */
.row-text /deep/ .blue {
  color: blue;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
