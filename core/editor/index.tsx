import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import deepEqual from "deep-equal";
import React, {memo} from "react";


const JSONEditor = memo(() => {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);

    return (
        <CodeMirror
            value={value}
            extensions={[json()]}
            basicSetup={{
                foldGutter: false
            }}
            onChange={onChange}
        />
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps)
});

export default JSONEditor;
