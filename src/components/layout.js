import React from 'react';
import Paper from 'material-ui/Paper';

import {SinglePanel} from '@dhis2/d2-ui-core';
import {MainContent} from '@dhis2/d2-ui-core';


import {Heading} from '@dhis2/d2-ui-core';

import {PeriodPicker} from '@dhis2/d2-ui-core';

import Buttons from './button';

const styles = {
    paper: {
        padding: '2rem',
        minHeight: '300px',
        marginTop: '4rem',
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
                            <h2>Bulletin Mensuel De Paludisme Exportateur</h2>
                            <p>Cette application est utilisée pour exporter le rapport mensuel sur le paludisme sous forme de document Microsoft Word. Pour commencer, sélectionnez le mois et le bouton.</p>
                        </Heading>

                        <PeriodPicker
                                periodType="Monthly"
                                onPickPeriod={(value) => {
                                    //this.setState({  });
                                    console.info(`New value: ${value}`);
                                }}
                            />
                        <Buttons />

                    </Paper>
                </MainContent>
            </SinglePanel>
        </div>
    );
}
