import React, {memo} from 'react';
import deepEqual from "deep-equal";

const JSONDetails = memo(() => {
    return (
        <div className={"w-full"}>

        </div>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps, {strict: true})
});

export default JSONDetails;
