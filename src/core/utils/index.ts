export interface PrettyJSONProps {
  // 源数据
  data: any;
  // 间隙
  space?: number;
}

export const handlePrettyJSON = (props: PrettyJSONProps) => {
  const {data, space = 2} = props;
  const regLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([,[{]|\[\s*\],?|\{\s*\},?)?$/mg;
  const text = JSON.stringify(data, null, isNaN(space) ? 2 : space);

  /* istanbul ignore next */
  if (!text) {
    return text;
  }

  return text.replace(/&/g, '&amp;').replace(/\\"([^,])/g, '\\&quot;$1')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(regLine, handleReplace);
}

export const handleReplace = (ind: string, key: string, val: string, tra: string) => {
  console.log(ind, 'ind')
  console.log(key, 'key')
  const spanEnd = '</span>';
  const keySpan = `<span class="__json-key__">`;
  const valSpan = `<span class="__json-value__">`;
  const strSpan = `<span class="__json-string__">`;
  const booSpan = `<span class="__json-boolean__">`;

  let sps = ind || '';
  if (key) {
    sps = sps + '"' + keySpan + key.replace(/^"|":\s$/g, '') + spanEnd + '": ';
  }

  if (val) {
    if (val === 'true' || val === 'false') {
      sps = sps + booSpan + val + spanEnd;
    } else {
      sps = sps + (val[0] === '"' ? strSpan : valSpan) + val + spanEnd;
    }
  }

  return sps + (tra || '');
}
