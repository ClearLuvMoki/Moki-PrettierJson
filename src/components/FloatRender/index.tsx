import React from 'react';
import deepEqual from "deep-equal";
import {StyledFloatRender} from "./styled";
import {StyledTypeLabelRender} from "moki-prettie-json/styled";
import {nodeToType} from "moki-prettie-json/core/utils";

interface FloatRenderProps {
  data: any;
  depth: number;
}

const FloatRender = React.memo((props: FloatRenderProps) => {
  return (
    <StyledFloatRender>
      <StyledTypeLabelRender>{nodeToType(props?.data)}</StyledTypeLabelRender>
      {props?.data}
    </StyledFloatRender>
  );
}, (prevProps, nextProps) => {
  return deepEqual(prevProps, nextProps);
});

export default FloatRender;
