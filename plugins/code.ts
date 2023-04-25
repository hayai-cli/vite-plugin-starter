import { marked } from 'marked'
import {parser} from './parser'
export function transforCode(code: string,mode: string,dir:string) {
  
  return `  
    import { h, defineComponent } from "vue";
    const _sfc_md = defineComponent({
      name: "Markdown",
    });

    const _sfc_render = () => {
      return h("div", {
        innerHTML: ${JSON.stringify(marked(parser(code,mode,dir)))}, 
      })
    };

    _sfc_md.render = _sfc_render
    export default _sfc_md
  `
}
