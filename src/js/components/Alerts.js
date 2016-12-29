import React from 'react';

import Alert, {types} from './Alert';

export default ({alerts}) =>
    <div>
        {alerts.map(alert => <Alert key={Math.random()} message={alert.message} type={alert.type}/>)}
    </div>;

export { types };
