import React, {memo, useMemo, useRef} from 'react';
import deepEqual from "deep-equal";
import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {json} from "@codemirror/lang-json";
import {githubDark, githubLight} from '@uiw/codemirror-theme-github';
import {xcodeDark, xcodeLight} from '@uiw/codemirror-theme-xcode';


interface Props {
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

const JSONEditor = memo(({classNames, styles, theme}: Props) => {

    const [value, setValue] = React.useState("{\n" +
        "  \"type\": \"team\",\n" +
        "  \"test\": {\n" +
        "    \"testPage\": \"tools/testing/run-tests.htm\",\n" +
        "    \"enabled\": true\n" +
        "  },\n" +
        "    \"search\": {\n" +
        "        \"excludeFolders\": [\n" +
        "      \".git\",\n" +
        "      \"node_modules\",\n" +
        "      \"tools/bin\",\n" +
        "      \"tools/counts\",\n" +
        "      \"tools/policheck\",\n" +
        "      \"tools/tfs_build_extensions\",\n" +
        "      \"tools/testing/jscoverage\",\n" +
        "      \"tools/testing/qunit\",\n" +
        "      \"tools/testing/chutzpah\",\n" +
        "      \"server.net\"\n" +
        "        ]\n" +
        "    },\n" +
        "  \"languages\": {\n" +
        "    \"vs.languages.typescript\": {\n" +
        "      \"validationSettings\": [{\n" +
        "        \"scope\":\"/\",\n" +
        "        \"noImplicitAny\":true,\n" +
        "        \"noLib\":false,\n" +
        "        \"extraLibs\":[],\n" +
        "        \"semanticValidation\":true,\n" +
        "        \"syntaxValidation\":true,\n" +
        "        \"codeGenTarget\":\"ES5\",\n" +
        "        \"moduleGenTarget\":\"\",\n" +
        "        \"lint\": {\n" +
        "                    \"emptyBlocksWithoutComment\": \"warning\",\n" +
        "                    \"curlyBracketsMustNotBeOmitted\": \"warning\",\n" +
        "                    \"comparisonOperatorsNotStrict\": \"warning\",\n" +
        "                    \"missingSemicolon\": \"warning\",\n" +
        "                    \"unknownTypeOfResults\": \"warning\",\n" +
        "                    \"semicolonsInsteadOfBlocks\": \"warning\",\n" +
        "                    \"functionsInsideLoops\": \"warning\",\n" +
        "                    \"functionsWithoutReturnType\": \"warning\",\n" +
        "                    \"tripleSlashReferenceAlike\": \"warning\",\n" +
        "                    \"unusedImports\": \"warning\",\n" +
        "                    \"unusedVariables\": \"warning\",\n" +
        "                    \"unusedFunctions\": \"warning\",\n" +
        "                    \"unusedMembers\": \"warning\"\n" +
        "                }\n" +
        "      }, \n" +
        "      {\n" +
        "        \"scope\":\"/client\",\n" +
        "        \"baseUrl\":\"/client\",\n" +
        "        \"moduleGenTarget\":\"amd\"\n" +
        "      },\n" +
        "      {\n" +
        "        \"scope\":\"/server\",\n" +
        "        \"moduleGenTarget\":\"commonjs\"\n" +
        "      },\n" +
        "      {\n" +
        "        \"scope\":\"/build\",\n" +
        "        \"moduleGenTarget\":\"commonjs\"\n" +
        "      },\n" +
        "      {\n" +
        "        \"scope\":\"/node_modules/nake\",\n" +
        "        \"moduleGenTarget\":\"commonjs\"\n" +
        "      }],\n" +
        "      \"allowMultipleWorkers\": true\n" +
        "    }\n" +
        "  }\n" +
        "}");

    const instance = useRef<ReactCodeMirrorRef>(null)

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
        >
            <CodeMirror
                ref={instance}
                value={value}
                className={"w-full h-full " + (classNames?.coder || "")}
                style={styles?.coder}
                extensions={[json()]}
                theme={$theme || "dark"}
                onChange={(value, viewUpdate) => {
                    console.log(121212)
                }}
                onClick={() => {
                    const editor = instance.current?.editor;
                }}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps, {strict: true})
});

export default JSONEditor;
