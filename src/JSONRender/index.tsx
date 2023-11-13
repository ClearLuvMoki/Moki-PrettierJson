import React, {useEffect, useState} from 'react';
import {StyledJSONRender} from "moki-prettie-json";
import {ObjectRender} from "moki-prettie-json/components";
// @ts-ignore
import TestJson from "./test.json"

export interface JSONRenderProps {
}


const JSONRender = () => {
 

  return (
    <StyledJSONRender
    >
      <ObjectRender data={TestJson}/>
    </StyledJSONRender>
  );
};

export default JSONRender;
