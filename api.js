QID = 'SECRET';

function doGet(e) {
  if (!e || !e.parameter) {
    return HtmlService.createHtmlOutput('Invalid parameters.');
  } else {
    // var subject = e.parameter.subject;
    var sheet = SpreadsheetApp.openById(QID).getSheets()[0];
    var max = sheet.getLastRow();
    var rowId = Math.floor(Math.random() * max) + 1;    
    var row = sheet.getRange('A' + rowId + ':G' + rowId).getValues()[0];
    
    var data = {
      'id': row[0],
      'q': row[1],
      'a': row[2],
      'b': row[3],
      'c': row[4],
      'd': row[5],
      'ans': row[6]
    };
    
    return HtmlService.createHtmlOutput(JSON.stringify(data));
  }
};

function doPost(e) {
  var params = JSON.stringify(e);
  return HtmlService.createHtmlOutput(params);
};

