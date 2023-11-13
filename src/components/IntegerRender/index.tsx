import React from 'react';
import deepEqual from "deep-equal";
import {StyledIntegerRender} from "./styled";
import {StyledTypeLabelRender} from "moki-prettie-json/styled";
import {nodeToType} from "moki-prettie-json/core/utils";

interface IntegerRenderProps {
  data: any;
  depth: number;
}


const IntegerRender = React.memo((props: IntegerRenderProps) => {
  return (
    <StyledIntegerRender>
      <StyledTypeLabelRender>{nodeToType(props?.data)}</StyledTypeLabelRender>
      {props?.data}
    </StyledIntegerRender>
  );
}, (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps);
});

export default IntegerRender;
