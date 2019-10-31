import React from 'react';
import {Button} from '@dhis2/d2-ui-core';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils'

import { saveAs } from 'file-saver';

const style = {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
};

function loadFile(url,callback){
    PizZipUtils.getBinaryContent(url,callback);
}

function generate() {
  
    console.log("this is the date dropdown value: " );

    loadFile("./assets/templates/bulletin.v1.docx",function(error,content){
        
        if (error) { throw error };
        var zip = new PizZip(content);
        var doc=new Docxtemplater().loadZip(zip)
        doc.setData({
            month: 'May',
            year: '2019',
            phone: '0652455478',
            description: 'New Website'
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

function handleClick(e) {
      e.preventDefault();
      generate();
      console.log('The link was clicked.');
    }


export default function Buttons(props) {
    return (
        <div style={style}>
            <Button onClick={handleClick}>Générer le bulletin</Button>
        </div>
    );
}
