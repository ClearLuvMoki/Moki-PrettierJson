import React from 'react';
import {StyledJSONRender} from "moki-prettie-json";
import {handlePrettyJSON} from "moki-prettie-json/core/utils";

export interface JSONRenderProps {

}

const JSONRender = () => {
  return (
    <StyledJSONRender
      dangerouslySetInnerHTML={{
        __html: `
        <pre>
            ${handlePrettyJSON({
                data: {
                  name: "1212"
                }
            })}
          </pre>
        `
      }}
    />
  );
};

export default JSONRender;
