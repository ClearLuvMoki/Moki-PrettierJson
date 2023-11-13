import React, {useEffect, useState} from 'react';
import deepEqual from 'deep-equal';
import {StyledObjectRenderContainer} from "./styled";
import {nodeToType} from "moki-prettie-json/core/utils";
import {JSX} from 'react/jsx-runtime';
import {nanoid} from "nanoid";

interface ObjectRenderProps {
  data: any;
}


const ObjectRender = React.memo((props: ObjectRenderProps) => {
  const [elements, setElements] = useState<any[]>([])

  useEffect(() => {
    console.log(props.data)
    if (Object.keys(props?.data || {}).length > 0) {
      const $elements: JSX.Element[] = [];
      const data = props.data
      const keys = Object.keys(data);
      const id = nanoid();

      keys.forEach(key => {
        const node = {
          key,
          value: data[key],
          type: nodeToType(data[key])
        }
        console.log(node, 'node')

        if (node.type === "object") {
          // $elements.push({
          //    ...node,
          //
          //   }
          // )
        }
      })
      console.log($elements, '$elements')
      setElements($elements)

    }
  }, [])

  return (
    <StyledObjectRenderContainer>
      {
        elements.map(node => (node))
      }
    </StyledObjectRenderContainer>
  );
}, (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps);
});

export default ObjectRender;
