function nodeGetType(node: any) {
    // @ts-ignore
  return {}.toString
        .call(node)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}

// 转换节点类型
export const nodeToType = (node: any) => {
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
