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

function initializeDistrictData(indicatorUIDArray){

    var table = {};

    for (const indicatorUID of indicatorUIDArray) {

        //these are the distircts
        table["q1zvw5TOnZF."+indicatorUID] = "";
        table["q1zvw5TOnZF."+indicatorUID] = "";
        table["L1Gr2bAsR4T."+indicatorUID] = "";
        table["THgRhO9eF0I."+indicatorUID] = "";
        table["KnR8IiGoSxQ."+indicatorUID] = "";
        table["GUSZlo8f9t8."+indicatorUID] = "";
        table["mqBP8r7CwKc."+indicatorUID] = "";
        table["IPv04VSahDi."+indicatorUID] = "";
        table["gHO8qPxfLdl."+indicatorUID] = "";
        table["VyZGMioVY5z."+indicatorUID] = "";
        table["qmVkCsfziWM."+indicatorUID] = "";
        table["CXHCAlP68L5."+indicatorUID] = "";
        table["jiGkwTWpBeq."+indicatorUID] = "";
        table["Motdz3Bql7L."+indicatorUID] = "";
        table["khK0Ewyw0vV."+indicatorUID] = "";
        table["cbst9kz3DHp."+indicatorUID] = "";
        table["Z71gNmPnc22."+indicatorUID] = "";
        table["zmSjEUspuVL."+indicatorUID] = "";
        table["VUj3PJpzty8."+indicatorUID] = "";
        table["HC3N6HbSdfg."+indicatorUID] = "";
        table["pChTVBEAPJJ."+indicatorUID] = "";
        table["kVULorkd7Vt."+indicatorUID] = "";
        table["dkWnjo1bSrU."+indicatorUID] = "";
        table["E1AAcXV9PxL."+indicatorUID] = "";
        table["QL7gnB6sSLA."+indicatorUID] = "";
        table["GuePjEvd6OH."+indicatorUID] = "";
        table["TEjr8hbfz9a."+indicatorUID] = "";
        table["zJZspSfD06r."+indicatorUID] = "";
        table["LyGsnnzEabg."+indicatorUID] = "";
        table["ISZZ5m7PYAC."+indicatorUID] = "";
        table["CoKlGkkiN4a."+indicatorUID] = "";
        table["jIFb011EBWB."+indicatorUID] = "";
        table["yvJVq1GjI2A."+indicatorUID] = "";
        table["ASu054HjT5Y."+indicatorUID] = "";
        table["D5WJbugzg9L."+indicatorUID] = "";
        table["QZJuFnb2WZ6."+indicatorUID] = "";
        table["XraGmJ5tF7e."+indicatorUID] = "";
        table["C4dKrWoT5au."+indicatorUID] = "";
        table["PCa6e3khx5E."+indicatorUID] = "2";
        table["PCa6e3khx5E."+indicatorUID] = "3";
        table["PCa6e3khx5E."+indicatorUID] = "4";

    }

    return table;

}

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
                            'qYH6Tw7wSJr', // Palu cas consultations toutes causes confondues
                            'xxMXZDNQhc1', // Palu cas suspects 
                            'C8uzbGBV5Ba', //Palu cas testés
                            'ZGVY1P1NNTu', //Palu cas confirmés 
                            'D0tVMBr7pne', //Palu cas simples traités 
                             //Palu cas graves traités 
                            'MW5F0uImS24', //Palu Total Déces
                            'no9OnzE3Yy7', //complétude
                            'yM51VVWhtk3' //promptitude
                    ]).addPeriodDimension(this.state.period)
                        .addOrgUnitDimension(['Ky2CzFdfBuO']);
      

        const reporting_rates = new this.props.d2.analytics.request()
            .addDataDimension([
                'no9OnzE3Yy7', //complétude
                'yM51VVWhtk3' //promptitude
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
                            'no9OnzE3Yy7', //Complétude
                            'Ih6HJlhmY5d', // % de diagnostic
                            'PifhiFgcyq1', // % de traitement
                            'zAhqn2Vwacr', //% de TPI3  
                             //% de confirmation
                            'MW5F0uImS24', //Palu Total Déces
                            'kNmu11OsuGn', // Palu/Toutes Consultations
                            'nnk0OcCQJm5', // Mois de Stock - TDR
                            'qUdyYqApz8R',// Mois de Stock - ACT
                            'lno8U7t5TLI', // Mois de Stock - SP
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

                    // Get data for table II (Taux d'incidence )
                    d2.Api.getApi()
                        .get('/analytics?dimension=dx:mH24Ynkgo4K,ou:Ky2CzFdfBuO;LEVEL-5&filter=pe:201901&order=DESC&showHierarchy=true')
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

                                    //initialize this (this is empty sometimes) for MW5F0uImS24
                                    table3_data = initializeDistrictData(["MW5F0uImS24","nnk0OcCQJm5"]); 

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
                                                Générer le bulletin non formaté
                                        </Button>
                                        

                                  
                                 </Paper>
                        </MainContent>
                    </SinglePanel>
                </div>

        )
    }
}


BulletinDownloader.childContextTypes = { d2: PropTypes.object.isRequired };