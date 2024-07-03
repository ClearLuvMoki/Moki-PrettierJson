import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import deepEqual from "deep-equal";
import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {json} from "@codemirror/lang-json";
import {githubDark, githubLight} from '@uiw/codemirror-theme-github';
import {xcodeDark, xcodeLight} from '@uiw/codemirror-theme-xcode';
import jsonMap from "json-source-map";
import Tool from "../../utils/tool";

interface Props {
    value: string;
    theme?: "github-dark" | "github-light" | "xcode-dark" | "xcode-light";
    classNames?: {
        root?: string;
        coder?: string;
    };
    styles?: {
        root?: React.CSSProperties;
        coder?: React.CSSProperties;
    }
}

const JSONEditor = memo(({classNames, styles, theme, value: valueProps}: Props) => {
    const instance = useRef<ReactCodeMirrorRef>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = React.useState("");
    const [width, setWidth] = useState(0);

    const jsonMapped = useMemo(() => {
        return jsonMap.stringify(value, null, 2);
    }, [value,]);

    useEffect(() => {
        if (valueProps) {
            setValue(valueProps)
        }
    }, [valueProps])


    useEffect(() => {
        if (rootRef.current) {
            const root = rootRef.current;
            const handleResize = (entries) => {
                for (let entry of entries) {
                    const {width} = entry.contentRect;
                    setWidth(width);
                }
            };
            const observer = new ResizeObserver(handleResize);
            observer.observe(root);

            return () => {
                observer.disconnect();
            };
        }
    }, [rootRef.current])


    const $theme = useMemo(() => {
        switch (theme) {
            case "github-dark":
                return githubDark
            case "github-light":
                return githubLight
            case "xcode-dark":
                return xcodeDark
            case "xcode-light":
                return xcodeLight
        }
    }, [theme])

    return (
        <div
            className={"moki-json-editor w-full h-full" + (classNames?.root || "")}
            style={styles?.root}
            ref={rootRef}
        >
            <CodeMirror
                ref={instance}
                value={value}
                editable={false}
                className={"w-full h-full " + (classNames?.coder || "")}
                style={styles?.coder}
                extensions={[json()]}
                theme={$theme || "dark"}
                basicSetup={{
                    foldGutter: false
                }}
                onClick={(event) => {
                    const editor = instance.current?.editor;
                    const view = instance.current?.view;
                    const state = instance.current?.state;
                    const pos = view.posAtCoords({x: event.clientX, y: event.clientY});
                    const line = view.state.doc.lineAt(pos);
                    const lineContent = line.text?.trim();
                    const type = Tool.handleExtractJSONItem(lineContent)
                    // console.log(type, 'type')
                }}
                onUpdate={(update) => {
                    const range = update.state.selection.ranges[0];
                    const line = update.state.doc.lineAt(range.anchor);
                    console.log(range, line, jsonMapped.pointers, 'lllll')
                    const pointerEntry = Object.entries(jsonMapped.pointers).find(
                        ([pointer, info]) => {
                            return info.value.line === line.number - 1;
                        }
                    );
                    console.log(pointerEntry, 'pointerEntry')
                }}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps, {strict: true})
});

export default JSONEditor;
