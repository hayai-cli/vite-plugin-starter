import { transforCode } from './code'

export default function MarkDownToHtml(mode,dir) {
  return {
    name: 'transforMDtoHTML',
    transform(code, id) {
      if (id.endsWith(".md")) {
        return {
          code: transforCode(code,mode,dir),
          map: null
        }
      }
    }
  }
}
