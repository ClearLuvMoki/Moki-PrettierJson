import {memo, useMemo} from "react";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import deepEqual from "deep-equal";
import {xcodeDark} from '@uiw/codemirror-theme-xcode';
import type {EditorType} from "../../types";

// @ts-ignore
import jsonMap from "json-source-map";

const JSONEditor = memo((props: EditorType) => {
    const {content, indent} = props

    const jsonMapped = useMemo(() => {
        return jsonMap.stringify(content, null, indent || 2);
    }, [content, indent]);

    return (
        <CodeMirror
            value={jsonMapped?.json || ""}
            extensions={[json()]}
            theme={xcodeDark}
            readOnly={true}
            editable={false}
            contentEditable={false}
            autoFocus={false}
            basicSetup={false}
        />
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps)
});

export default JSONEditor;
