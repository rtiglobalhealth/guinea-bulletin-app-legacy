import React from 'react';
import Paper from 'material-ui/Paper';
import {Button} from '@dhis2/d2-ui-core';
import {SinglePanel} from '@dhis2/d2-ui-core';
import {MainContent} from '@dhis2/d2-ui-core';
import PropTypes from 'prop-types';


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
    getChildContext() {
        return {
            d2: this.props.d2
        };
    }

    constructor(props, context) {

        super(props, context);

        this.state = {
            period: 201804
        }; 

        this.generateBulletin = this.generateBulletin.bind(this);

    }


    
    generateBulletin() {
      
        console.log("this is the date: " + this.state.period );
        var year = this.state.period.substring(0, 4);
        var month = this.state.period.substring(4);
        var month_name;

        switch(month) {
            case "01":
                month_name ="Janiver";
                break;
            case "02":
                month_name ="Fevrier";
                break;
            case "03":
                month_name ="Mars";
                break;
            case "04":
                month_name ="Avril";
                break;
            case "05":
                month_name ="Mai";
                break;
            case "06":
                month_name ="Juin";
                break;
            case "07":
                month_name ="Juillet";
                break;
            case "08":
                month_name ="Aout";
                break;
            case "09":
                month_name ="Septembre";
                break;
            case "10":
                month_name ="Octobre";
                break;
            case "11":
                month_name ="Novembre";
                break;
            case "12":
                month_name ="Decembre";
                break;
            default:
                month_name ="Unknown";
        } 

        // Get Table I
        const req = new this.props.d2.analytics.request()
                        .addDataDimension([
                        'XJ3xpfnj2L7', // Palu cas consultations toutes causes confondues
                        'hxx05dDDpQS', // Palu cas suspects 
                        'hqxo1DPKsvM', //Palu cas testés
                        'FoPRfIPds80', //Palu cas confirmés 
                        'bdifvrbc9iK', //Palu cas simples traités 
                        'E1n9SUkhQ6o', //Palu cas graves traités 
                        'oD8UXdUBhb2', //Palu Total Déces 
                    ]).addPeriodDimension(this.state.period)
                        .addOrgUnitDimension(['Ky2CzFdfBuO']);

        this.props.d2.analytics.aggregate
            .get(req)
            .then(function(analyticsData) {
                console.log(analyticsData);
                //var body = JSON.parse(analyticsData);
                var body = analyticsData;
                var dataElements = {};
                
                //shove all this into a object for reading later.
                for (var i = 0; i < body.rows.length; i++) {
                    var dataelement = body.rows[i];
                    dataElements[ dataelement[0] ] = dataelement[3]; 
                }

                console.log("this is the cases consulted: " + dataElements['XJ3xpfnj2L7']);

                PizZipUtils.getBinaryContent("./assets/templates/bulletin.v1.docx",function(error,content){
            
                    if (error) { throw error };
                    var zip = new PizZip(content);
                    var doc=new Docxtemplater().loadZip(zip)
                    doc.setData({
                        month: month_name,
                        year: year,
                        XJ3xpfnj2L7: dataElements['XJ3xpfnj2L7'],
                        hxx05dDDpQS: dataElements['hxx05dDDpQS'],
                        hqxo1DPKsvM: dataElements['hqxo1DPKsvM'],
                        FoPRfIPds80: dataElements['FoPRfIPds80'],
                        bdifvrbc9iK: dataElements['bdifvrbc9iK'],
                        E1n9SUkhQ6o: dataElements['E1n9SUkhQ6o'],
                        oD8UXdUBhb2: dataElements['oD8UXdUBhb'],
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

              });
              


       
       
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
                                <Button raised color='primary' onClick={this.generateBulletin}>Générer le bulletin</Button>
                            </Paper>
                        </MainContent>
                    </SinglePanel>
                </div>

        )
    }
}


BulletinDownloader.childContextTypes = { d2: PropTypes.object.isRequired };