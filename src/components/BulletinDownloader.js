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
            buttons: ''
        }; 
    
        this.generateBulletin = this.generateBulletin.bind(this);
    }

    // Take in a bunch of random data and return something like this:
    /*
    {
        hc1_name: "www",
        hc1_district: "xxx",
        hc1_incidence: "yyy", 
        hc12_name: "zzz",
        ...
    }
    */
    static get_highest_incidence(districts){
        return districts;
    }

     /*
    {
        hc1_name: "www",
        hc1_district: "xxx",
        hc1_incidence: "yyy", 
        hc12_name: "zzz",
        ...
    }
    */
    static get_fake_table3(){

        var obj = {
            kal_com: "100%",
            kal_dia: "104%",
            kal_tr: "100%",
            kal_tp: "27%",
            
            dix_com: "100%",
            dix_dia: "100%",
            dix_tr: "100%",
            dix_tp: "17%",

            mat_com: "100%",
            mat_dia: "100%",
            mat_tr: "100%",
            mat_tp: "49%",

            mot_com: "100%",
            mot_dia: "100%",
            mot_tr: "100%",
            mot_tp: "51%",

            rat_com: "100%",
            rat_dia: "100%",
            rat_tr: "100%",
            rat_tp: "25%",
            
        }

        return obj;
    }

    static get_fake_table2 ()
    {   
        // Table II
        var obj = {
            hc1_name: 'Banama',
            hc1_district: 'Kissidougou',
            hc1_incidence: '618',
            hc2_name: 'SS Armées',
            hc2_district: 'Macenta',
            hc2_incidence: '504',
            hc3_name: 'Nunkunkan',
            hc3_district: 'Siguiri',
            hc3_incidence: '500',
            hc4_name: 'Mangalla',
            hc4_district: 'Guéckédou',
            hc4_incidence: '453',
            hc5_name: 'Kindoye',
            hc5_district: 'Dabola',
            hc5_incidence: '410',
            hc6_name: 'Bintimodia',
            hc6_district: 'Boké',
            hc6_incidence: '393',
            hc7_name: 'Kantoumanina',
            hc7_district: 'Mandiana',
            hc7_incidence: '392',
            hc8_name: 'Ouassou',
            hc8_district: 'Dubréka',
            hc8_incidence: '367',
            hc9_name: 'Koundou',
            hc9_district: 'Guéckédou',
            hc9_incidence: '316',
            hc10_name: 'Passaya',
            hc10_district: 'Faranah',
            hc10_incidence: '311'
        }
        return obj;
    
    }

    generateBulletin(template) {
      
        //console.log("this is the type of template: " + template );
        console.log("this is the date: " + this.state.period );
        console.log("this is the template: " + template );

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
       
        const table2 = new this.props.d2.analytics.request()
                        .addDataDimension([
                            'zysVdk7PbUx', // palu incidence
                            'q6tFawArvTX', // Population couverte
                            'FoPRfIPds80', // Palu cas confirmés
                            
                    ]).addPeriodDimension(this.state.period)
                        .addOrgUnitDimension([
                            'kM65X9dP5WS', // CSU de Boffa
                            'i1xnNAyKgGG' // CSR de Kamabi 
                    ]);
        


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

        var d2 = this.props.d2;

        var reporting_rates_table = {};

        //get Reporting Rates
        d2.analytics.aggregate
            .get(reporting_rates)
            .then(function(analyticsData) {

                var body = analyticsData;
                
                console.log("retrieving " +body.rows.length + " rows for the reporting rates");
                console.log("body" + body);
                
                //shove all this into a object for reading later.
                 for (var i = 0; i < body.rows.length; i++) {
                    var dataelement = body.rows[i];
                    reporting_rates_table[ dataelement[1]+"."+dataelement[0] ] = dataelement[3]; 
                }

            });

        var period = { month: month_name, year: year};


        // Get data for table I
        d2.analytics.aggregate
            .get(table1)
            .then(function(analyticsData) {
                
                var body = analyticsData;
                var dataElements = {};
                
                console.log("retrieving " +body.rows.length + " rows for Table I");
            
                //shove all this into a object for reading later.
                for (var i = 0; i < body.rows.length; i++) {
                    var dataelement = body.rows[i];
                    dataElements[ dataelement[0] ] = dataelement[3]; 
                }

                return dataElements;
                
            }).then(function(result){
                
                d2.analytics.aggregate
                    .get(table2)
                    .then(function(analyticsData) {
                        //console.log(analyticsData);
                        var body = analyticsData;
                        var table2_result = {};
                        
                        console.log("retrieving " +body.rows.length + " rows for Table II");

                        //shove all this into a object for reading later.
                        for (var i = 0; i < body.rows.length; i++) {
                            var dataelement = body.rows[i];
                            table2_result[ dataelement[0] ] = dataelement[3]; 
                        }

                        var top10_table2 = BulletinDownloader.get_highest_incidence(table2_result);
                        var fake_table2 = BulletinDownloader.get_fake_table2();
                        var fake_table3 = BulletinDownloader.get_fake_table3();
                        
                        var bulletin_data = Object.assign({}, period, result,fake_table2,fake_table3,reporting_rates_table);

                        console.log("Here are the final results: " , bulletin_data);
                        
                        // Write this out

                        var template_path = "./assets/templates/bulletin.v1.docx";
                        
                        if (template == TEMPLATE_UNFORMATTED){
                            var template_path = "./assets/templates/test.v1.docx";
                        } 

                        PizZipUtils.getBinaryContent(template_path,function(error,content){
    
                            var zip = new PizZip(content);
                            var doc=new Docxtemplater().loadZip(zip);

                            doc.setData(bulletin_data);

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

                        });

                    });
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