import React, {useEffect, useState} from 'react';
import deepEqual from 'deep-equal';
import {StyledObjectRenderContainer} from "./styled";
import {handleRenderNodeByType, nodeToType} from "moki-prettie-json/core/utils";
import {JSX} from 'react/jsx-runtime';
import {nanoid} from "nanoid";
import {NodeTypes} from "moki-prettie-json/types";
import {StyledLabel} from "moki-prettie-json/styled";

interface ObjectRenderProps {
  data: any;
  depth: number;
}

interface DataState {
  id: string;
  key: string;
  value: any;
  type: NodeTypes;
  depth: number;
  render: JSX.Element;
}


const ObjectRender = React.memo((props: ObjectRenderProps) => {
  const {data, depth} = props
  const [nodes, setNodes] = useState<DataState[]>([])

  useEffect(() => {
    if (Object.keys(data || {}).length > 0) {
      const $elements: DataState[] = [];
      const keys = Object.keys(data);
      const id = nanoid();
      const _depth = depth + 1;

      keys.forEach(key => {
        const node = {
          id,
          key,
          value: data[key],
          depth: _depth,
          type: nodeToType(data[key]),
          render: handleRenderNodeByType(nodeToType(data[key]), data[key], _depth)
        }
        $elements.push(node)
      })
      setNodes($elements)

    }
  }, [])

  return (
    <StyledObjectRenderContainer>
      {
        nodes.map(node => {
          return <div key={node.id} style={{paddingLeft: 10 * depth}}>
            <StyledLabel>{`"${node.key}"`}:</StyledLabel>
            {node.render}
          </div>
        })
      }
    </StyledObjectRenderContainer>
  );
}, (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps);
});

export default ObjectRender;
