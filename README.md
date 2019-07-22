# Overview

The National Malaria Control Program (NMCP) in Guinea emails a monthly bulletin that provides an update on malaria statistics for the country. This bulletin is sent to around 400 recipients and includes Ministry of Health (MoH), NMCP, donors and other stake holders. The report includes performance indicators such as the reporting rates of the health facilities and epidemiological indicators such as number of cases tested for malaria and the number of confirmed cases of malaria.  NMCP obtains tables and maps to add to the bulletin using an R script provided by CDC which pull data from the health facility monthly malaria report Excel files. 

Although this method of generating the monthly bulletin has been effectively used during the last several years, it is affected by high fragility. The R scripts are used by only one operator on one computer. The changes in the R software and its packages require periodic updates to the R script. However, operators in Guinea are not proficient in the R language and do not make the updates to the script themselves. Additionally, in order to consolidate and streamline data systems used within the Guinean Ministry of Health, the Secretary General has issued a directive to use DHIS2 platform as the one primary system to record malaria indicators. This will eliminate all parallel data systems. Thus, to comply with this directive, the NMCP will need to migrate from an Excel-based system to a DHIS2-based system. While this transition is already underway, NMCP requires technical assistance to create a new process to make the monthly bulletin using DHIS 2 platform. 

The aim of this activity is to provide the technical support to create a solution able to produce tables and maps for the monthly malaria bulletins using only the MoH DHIS2. The project will be performed in collaboration with Guinea’s MoH, CDC, and StopPalu+. 


# Getting Started

## Test 
> yarn test

## Build for DHIS2
> yarn package



# Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).