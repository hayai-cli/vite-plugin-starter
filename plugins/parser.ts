import { marked } from 'marked'
/** 基础循环方法  */
export function baseEach(data, _fn)  {
  let   index = -1
  const _data = data
  while (++index < _data.length) {
    const result = _fn(_data[index], index, _data)
    if (result == false) break
  }
  return _data
}

/**
 * markdown图片编译路径处理,指向Nginx子目录
 * @param code 
 * @param mode 
 */

export function parser(code, mode,dir) {
  const tokens = marked.lexer(code);
  if (mode != 'development' && dir) {
    parserParagraph(tokens,dir)
    return marked.parser(tokens)
  }
  return code
}

/**
 * 递归处理 paragraph节点
 * @param tokens 
 */
function parserParagraph(tokens,dir) {
  baseEach(tokens, (item) => {
    if (item.type == 'html') {
      parserHtml(item,dir)
    }
    if (item.type == 'paragraph') {
      parserParagraph(item.tokens,dir)
    }
  })
}
/**
 * 根据规则在给定参数string中插入给定参数prefix
 * @param string 被匹配的字符串
 * @param prefix 插入的字符串
 */
function replacePublic(string: string, prefix: string): string | null {
  const pattern = /src\s*=\s*["']([^"']*)["']/g;
  const result = string.replace(pattern, `src="${prefix}$1"`);
  return result === string ? null : result;
}

/** 处理html节点 */
function parserHtml(item,dir) {
  const replaceCode = replacePublic(item.text, dir)
  const parserCode = replaceCode == null ? item.text : replaceCode
  item.text = parserCode
  item.raw = parserCode
}
