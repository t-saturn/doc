import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const tmp = new MarkdownIt(); // solo para usar utils.escapeHtml
const escape = tmp.utils.escapeHtml;

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: (code, lang) => {
    try {
      if (lang && hljs.getLanguage(lang)) {
        const out = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
        return `<pre><code class="hljs language-${lang}">${out}</code></pre>`;
      }
      // Auto-detect si no hay lang
      const out = hljs.highlightAuto(code).value;
      return `<pre><code class="hljs">${out}</code></pre>`;
    } catch {
      return `<pre><code>${escape(code)}</code></pre>`;
    }
  },
});
