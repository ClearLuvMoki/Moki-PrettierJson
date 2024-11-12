import {memo} from "react";
import deepEqual from "deep-equal";

const Panel = memo(() => {
    return (
        <div>

        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps)
});

export default Panel;
