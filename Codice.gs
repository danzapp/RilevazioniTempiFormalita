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

var dataAnomalie = sheet.getDataRange().getValues()


// rimuove riga Formule (2)
dataAnomalie.splice(1,1)

Logger.log(dataAnomalie)

// modifica il formato della data di rilevazione
var dataObjectsArray = ObjApp.rangeToObjectsNoCamel(dataAnomalie) //Object con un Array di Objects


// ---------------------------------------------
// controllo ruolo utente: viewer, editor, owner  
var currentUser = {}
currentUser.email = Session.getActiveUser().getEmail()
//currentUser.email = 'pippo@informatica.aci.it';
var editors = ['da.zappala@aci,it','informatica.aci.it']
Logger.log('editors ' + editors);
  var email = currentUser.email;
  Logger.log('user email ' + email)
  Logger.log('index of editors ' + editors.indexOf(email))
  if (editors.indexOf(email) > -1 || email.split('@')[1] == 'informatica.aci.it') {
  var isEditor = currentUser.email;
}
dataObjectsArray.forEach(function(obj){ 
  Logger.log('isEditor ' + isEditor);
  /*
for (var i in editors){
  if (currentUser.email == editors[i]){
    var isEditor = currentUser.email;
  }
}
*/
 switch(email) {
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
  
  Logger.log('obj.Ruolo ' + obj['Ruolo'])
  
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


