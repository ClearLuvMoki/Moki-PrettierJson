import React, {useEffect} from 'react';
import deepEqual from "deep-equal";
import {nodeToType} from "moki-prettie-json/core/utils";
import {StyledTypeLabelRender} from "moki-prettie-json/styled";
import {StyledStringRender} from "./styled";

interface StringRenderProps {
  data: any;
  depth: number;
}

const StringRender = React.memo((props: StringRenderProps) => {

  useEffect(() => {

  }, [])

  return (
    <StyledStringRender id={"moki-string-render"} >
      <StyledTypeLabelRender>{nodeToType(props?.data)}</StyledTypeLabelRender>
      <span>{props?.data || `""`}</span>
    </StyledStringRender>
  );
}, (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps);
});

export default StringRender;
