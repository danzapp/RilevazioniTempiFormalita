function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet() {

  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate(); 
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// *****************  LEGGE I DATI DALLO SHEET E RESTITUISCE UN OBJECT  *************

function readData(){

var dataMissioni = sheet.getDataRange().getValues()

// rimuove riga 2 e 3
dataMissioni.splice(1,2)


// modifica il formato della data di rilevazione
var dataObjectsArray = ObjApp.rangeToObjectsNoCamel(dataMissioni) //Object con un Array di Objects



//Logger.log(dataObjectsArray)

for (var i in dataObjectsArray){
  Logger.log(i + ' - ' + dataObjectsArray[i]['Regione'])
}



// ---------------------------------------------
// controllo ruolo utente: viewer, editor, owner  
var currentUser = {}
currentUser.name = Session.getActiveUser().getEmail()
dataObjectsArray.forEach(function(obj){ 

var editors = ['s.antonielli@aci.it','g.polidori@aci.it','p.rocchetti@aci.it','da.zappala@aci.it', 'c.greblo@aci.it']
for (var i in editors){
  if (currentUser.name == editors[i]){
    var isEditor = currentUser.name
  }
}
  
 switch(currentUser.name) {
    case obj['Indirizzo email']:
        obj.Ruolo = "Editor" 
        currentUser.role = 'Editor'       
        break;
    case isEditor :
        obj.Ruolo = "Editor" 
        currentUser.role = 'Editor'
        break;
    default:
        obj.Ruolo = "Viewer"
        currentUser.role = 'Viewer'
}
  

  Logger.log(obj['Ufficio Territoriale'])
  
})

Logger.log(JSON.stringify(dataObjectsArray))

// ---------------------------------------------
  
var mainObject = {  // quando completa l'array di Object costruisce l'oggetto Contenitore
      user: currentUser,
      table: dataObjectsArray,
    };

 // Logger.log(mainObject);
 // return mainObject  // il risultato viene restituito come Object 
 return JSON.stringify(mainObject) // il risultato viene restituito come JSON e sarà necessario effettuare JSON.parse()
}


