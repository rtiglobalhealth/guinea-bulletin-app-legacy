import React from 'react';

import {Button} from '@dhis2/d2-ui-core';


const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export default function Buttons() {
    return (
        <div style={style}>
            <Button onClick={() => {}}>Générer le bulletin</Button>
        </div>
    );
}
