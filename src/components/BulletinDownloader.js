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

const TEMPLATE_FORMATTED = "formatted";
const TEMPLATE_UNFORMATTED = "unformatted";


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
    },buttons:{
        margin: '5px'
    }
};


export default class BulletinDownloader extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.state = {
            d2: props.d2,
        }; 

        this.generateBulletin = this.generateBulletin.bind(this);
    }

  
    
    /* templates can be TEMPLATE_FORMATTED or TEMPLATE_UNFORMATTED*/
    generateBulletin(template) {
      
        //console.log("this is the type of template: " + template );
        console.log("this is the date: " + this.state.period );
        console.log("this is the template: " + template );

        var year = this.state.period.substring(0, 4);
        var month = this.state.period.substring(4);
        var yearmonth = year+month;
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
        };

        var period = { month: month_name, year: year};

        //const d2Analytics = this.props.d2.analytics.request();
        const table1 = new this.props.d2.analytics.request()
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
      

        const reporting_rates = new this.props.d2.analytics.request()
            .addDataDimension([
                'nLnLQHxdKXZ', // PALUDISME Actual reports
                'w1666PUJ8RX', // PALUDISME Expected reports
                'e7KyyoIukNr', // PALUDISME Reporting rate
                'PEGmDlgS54M', // PALUDISME Reporting rate on time  
        ]).addPeriodDimension(this.state.period)
            .addOrgUnitDimension([
                'D1rT7FToSE4', // Kankan
                'yTNEihLzQwC', // Kindia
                'zy5MQM2PlKb', // Labé
                'QrHKMLcRSCA', // Faranah
                'odY5MzWb1jc', // Conakry
                'ZSEW310Xy6l', // Mamou
                'ysKioL4gVnV', // Nzérékoré
                'fxtOlL8b8mb', // Boké
                'Ky2CzFdfBuO', // Guinea
        ]);

        const table3 = new this.props.d2.analytics.request()
                        .addDataDimension([
                            'e7KyyoIukNr', //Complétude
                            'PEGmDlgS54M', // Promptitude
                            'YgtSVn5FVgI', // % de diagnostic
                            'CuEP1n3VXW1', // % de traitement
                            'W0vrEFRVb1J', //% de TPI3  
                            'FoPRfIPds80', //% de confirmation
                            'oD8UXdUBhb2', //Palu Total Déces
                            'F0WFRkrKQIW', // Palu/Toutes Consultations
                            'ESEPKvpZVCe', // Mois de Stock - TDR
                            'mooUrkzl7d0',// Mois de Stock - ACT
                            'zKbvCY1jjdX', // Mois de Stock - SP
                            // ART
                            //MILDA
                    ]).addPeriodDimension(this.state.period)
                        .addOrgUnitDimension(['Ky2CzFdfBuO'])
                        .addOrgUnitDimension(['LEVEL-3']);
       

        var d2 = this.props.d2;


        // Get data for reporting table
        d2.analytics.aggregate
        .get(reporting_rates)
        .then(function(reporting_rate_results) {

            console.log("retrieving " +reporting_rate_results.rows.length + " rows for the reporting rates");
            
            var reporting_table = {};

            //shove all this into a object for reading later.
            for (var i = 0; i < reporting_rate_results.rows.length; i++) {
                var dataelement = reporting_rate_results.rows[i];
                reporting_table[ dataelement[1]+"."+dataelement[0] ] = dataelement[3]; 
            }

            // Get data for table I
            d2.analytics.aggregate
                .get(table1)
                .then(function(table1_results) {

                    var table1_data = {};
                    console.log("retrieving " +table1_results.rows.length + " rows for Table I");
                   
                    //shove all this into a object for reading later.
                    for (var i = 0; i < table1_results.rows.length; i++) {
                        var dataelement = table1_results.rows[i];
                        table1_data[ dataelement[0] ] = dataelement[3]; 
                    }

                    // Get data for table II
                    d2.Api.getApi()
                        .get('/analytics?dimension=dx:zysVdk7PbUx,ou:Ky2CzFdfBuO;LEVEL-5&filter=pe:201901&order=DESC&showHierarchy=true')
                        .then(function(table2_results) {

                            console.log("retrieving " +table2_results.rows.length + " rows for Table II");
                            //console.log(table2_results);
                            var table2_data = {};

                            var j = 1;
                            //shove all this into a object for reading later.
                            for (var i = 0; i < table2_results.rows.length; i++) {
                                
                                var dataelement = table2_results.rows[i];
                                
                                if (dataelement[2] != "Infinity"){
                                    // LOook up the facility name
                                    var outstring = table2_results['metaData']['ouNameHierarchy'][dataelement[1]];
                                    var parts = outstring.split("/");
                                    table2_data["hc"+j+"_name"] = parts[5];
                                    // Look up the district name
                                    table2_data["hc"+j+"_district"] = parts[3];  
                                    table2_data["hc"+j+"_incidence"] = dataelement[2]; 
                                    j++;
                                }
  
                            }

                            // Get data for table III
                            d2.analytics.aggregate
                                .get(table3)
                                .then(function(table3_results) {

                                    var table3_data = {};
                                    
                                    console.log("retrieving " +table3_results.rows.length + " rows for Table III");
                                    console.log(table3_results);

                                     //shove all this into a object for reading later.
                                    for (var i = 0; i < table3_results.rows.length; i++) {
                                        var dataelement = table3_results.rows[i];
                                        table3_data[ dataelement[1]+"."+dataelement[0] ] = dataelement[3];
                                    }

                                    var bulletin_data = Object.assign({}, period,table1_data,table2_data,table3_data, reporting_table);

                                    console.log("Here are the final results: " , bulletin_data);

                                    // Write this out
                                    var template_path = "./assets/templates/bulletin.v1.docx";
                                    
                                    if (template == TEMPLATE_UNFORMATTED){
                                        var template_path = "./assets/templates/test.v2.docx";
                                    } 

                                    PizZipUtils.getBinaryContent(template_path,function(error,content){
                
                                        var zip = new PizZip(content);
                                        var doc=new Docxtemplater().loadZip(zip);
                                        
                                        doc.setData(bulletin_data);

                                        try {
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
                                        saveAs(out,"bulletin_"+yearmonth+"_"+template+".docx")

                                    });



                                });

                        });
                    

                });

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

                                        <Button style={styles.buttons} disabled={!this.state.period} raised color='primary' 
                                            onClick={this.generateBulletin.bind(this, TEMPLATE_FORMATTED)}>
                                                Générer le bulletin
                                        </Button>
                                        <Button style={styles.buttons} disabled={!this.state.period} raised color='accent' 
                                            onClick={this.generateBulletin.bind(this, TEMPLATE_UNFORMATTED)}>
                                                Générer le modèle
                                        </Button>

                                  
                                 </Paper>
                        </MainContent>
                    </SinglePanel>
                </div>

        )
    }
}


BulletinDownloader.childContextTypes = { d2: PropTypes.object.isRequired };