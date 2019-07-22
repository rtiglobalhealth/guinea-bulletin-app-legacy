import React from 'react';
import Paper from 'material-ui/Paper';

import {TwoPanel} from '@dhis2/d2-ui-core';
import {SinglePanel} from '@dhis2/d2-ui-core';
import {MainContent} from '@dhis2/d2-ui-core';
import {Sidebar} from '@dhis2/d2-ui-core';
import {Heading} from '@dhis2/d2-ui-core';

import Buttons from './button';


const styles = {
    paper: {
        padding: '2rem',
        minHeight: '300px',
    },
    twoPanelMain: {
        marginTop: '2rem',
    },
    singlePanelMain: {
        marginTop: 0,
        
    },
};

function noop() {}

export default function LayoutExample (props) {
    return (
        <div>
            
            <SinglePanel mainStyle={styles.singlePanelMain}>
                <MainContent>
                    <Paper style={styles.paper}>
                        <Heading>
                        Bulletin Mensuel De Paludisme Exportateur
                        </Heading>

                        <Buttons />

                    </Paper>
                </MainContent>
            </SinglePanel>
        </div>
    );
}
