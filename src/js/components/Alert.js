import React from 'react';

export default ({message, type}) =>
     <div className={"alert " + type} role="alert">
        {message}
    </div>;

const types = Object.freeze({
    SUCCESS: "alert-success",
    INFO: "alert-info",
    WARNING: "alert-warning",
    DANGER: "alert-danger"
});

export { types };
