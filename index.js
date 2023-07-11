//import {google} from 'googleapis'

const { google } = require('googleapis');

const sheets = google.sheets('v4');

// Configurar as credenciais da API
const auth = new google.auth.GoogleAuth({
    keyFile: './config/credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
//link planilha https://docs.google.com/spreadsheets/d/1EwL4FYiv90GBI1gTZ2_GEhyRfP-k5FDd1_9E5q_ATeE/edit#gid=0
// Identificar a planilha e a célula que você deseja acessar
const spreadsheetId = '1EwL4FYiv90GBI1gTZ2_GEhyRfP-k5FDd1_9E5q_ATeE';
const range = 'Empenhos!A:T';
const valueInputOption = 'RAW';
const insertDataOption = 'INSERT_ROWS';



async function getCellValues() {
  const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });

  const rows = response.data.values;

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const objetos = converteArrayObjeto(rows)
console.log(objetos)

 // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  
  return objetos
}


 async function postCellValues(resource) {
 
  

    const response = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range,
        valueInputOption,
        insertDataOption,
        resource     

    });
    }
    const envio = {
      "values": 
      [
        [
          0,1,2,3,4,5,6,7,8,9
        ]
      ]
    }
async function teste () {
     await postCellValues (envio)

    console.log(await getCellValues())

}

teste ()


    function converteArrayObjeto(array) {
      const resultadosTratados = []
      let propriedades = []
  
      array.forEach((linha, indexLinha) => {
          if(indexLinha === 0) {
              propriedades = linha
              return;
          }
          const pessoa = {}
  
          linha.forEach((valorDaCelula, indexColuna) => {
              const propriedade = propriedades[indexColuna]
              pessoa[propriedade] = valorDaCelula
          })
      resultadosTratados.push(pessoa)
      })
   
     return resultadosTratados;
  }