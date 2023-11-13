import {NodeTypes} from "moki-prettie-json/types";
import {ObjectRender} from "moki-prettie-json/components";
import {JSX} from "react/jsx-runtime";
import StringRender from "moki-prettie-json/components/StringRender";
import IntegerRender from "moki-prettie-json/components/IntegerRender";
import FloatRender from "moki-prettie-json/components/FloatRender";

function nodeGetType(node: any): NodeTypes {
  // @ts-ignore
  return {}.toString
    .call(node)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

// 转换节点类型
export const nodeToType = (node: any): NodeTypes => {
  let type = nodeGetType(node);
  // some extra disambiguation for numbers
  if (type === 'number') {
    if (isNaN(node)) {
      type = 'nan';
    } else if ((node | 0) !== node) {
      //bitwise OR produces integers
      type = 'float';
    } else {
      type = 'integer';
    }
  }
  return type;
}

// 根据类型渲染节点
export const handleRenderNodeByType = (type: NodeTypes, value: any, _depth: number): JSX.Element => {
  console.log(type, value)
  switch (type) {
    case "object":
      return <ObjectRender data={value} depth={_depth}/>;
    case "string":
      return <StringRender data={value} depth={_depth}/>;
    case "integer":
      return <IntegerRender data={value} depth={_depth}/>;
    case "float":
      return <FloatRender data={value} depth={_depth}/>;
    default:
      return <></>
  }
}
