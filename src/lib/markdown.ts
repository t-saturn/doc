import MarkdownIt from "markdown-it";
import taskLists from "markdown-it-task-lists";
import attrs from "markdown-it-attrs";
import anchor from "markdown-it-anchor";
import hljs from "highlight.js";

// Estilo GitHub para el código (elige uno)
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

const tmp = new MarkdownIt(); // para escape util
const escape = tmp.utils.escapeHtml;

export const md = new MarkdownIt({
  html: true, // como en GitHub, HTML permitido (limitado por tu renderer)
  linkify: true, // autolinks
  breaks: false, // GitHub no hace <br> con un solo Enter
  highlight(code, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        const out = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
        return `<pre><code class="hljs language-${lang}">${out}</code></pre>`;
      }
      const out = hljs.highlightAuto(code).value;
      return `<pre><code class="hljs">${out}</code></pre>`;
    } catch {
      return `<pre><code>${escape(code)}</code></pre>`;
    }
  },
})
  // ✓ Task lists [ ] [x]
  .use(taskLists, { enabled: true, label: true, labelAfter: true })
  // ✓ Atributos inline: ![](img){width=140}
  .use(attrs)
  // ✓ Anclas en títulos
  .use(anchor, { permalink: anchor.permalink.ariaHidden({}) })
  .use(anchor, {
    permalink: anchor.permalink.headerLink({ safariReaderFix: true }),
  });
// .use(anchor);
