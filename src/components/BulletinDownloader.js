import React from 'react';
import Paper from 'material-ui/Paper';
import {Button} from '@dhis2/d2-ui-core';
import {SinglePanel} from '@dhis2/d2-ui-core';
import {MainContent} from '@dhis2/d2-ui-core';


import {Heading} from '@dhis2/d2-ui-core';
import {PeriodPicker} from '@dhis2/d2-ui-core';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils'

import { saveAs } from 'file-saver';

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







export default class BulletinDownloader extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            period: 201804
        }; 

        this.generateBulletin = this.generateBulletin.bind(this);
    }


    loadFile(url,callback){
        PizZipUtils.getBinaryContent(url,callback);
    }
    
    generateBulletin() {
      
        console.log("this is the date: " + this.state.period );
        // this.state.periodType
    
        this.loadFile("./assets/templates/bulletin.v1.docx",function(error,content){
            
            if (error) { throw error };
            var zip = new PizZip(content);
            var doc=new Docxtemplater().loadZip(zip)
            doc.setData({
                month: 'May',
                year: '2019'
            });
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }
            var out=doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }) //Output the document using Data-URI
            saveAs(out,"bulletin.docx")
        })
    }


    render() {


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
                                            this.setState({ period: value });
                                            console.info(`New value: ${value}`);
                                        }}
                                    />
                                <Button onClick={this.generateBulletin}>Générer le bulletin</Button>
                            </Paper>
                        </MainContent>
                    </SinglePanel>
                </div>

        )
    }
}
