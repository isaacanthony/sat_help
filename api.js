var QID = 'SECRET';

function invalidParameters() {
  return { 'error': 'Invalid parameters' };
};

function getQuestion(e) {
  // var subject = e.parameter.subject;
  var sheet = SpreadsheetApp.openById(QID).getSheets()[0];
  var max = sheet.getLastRow();
  var rowId = Math.floor(Math.random() * max) + 1;    
  var row = sheet.getRange('A' + rowId + ':G' + rowId).getValues()[0];
  
  return {
    'id': row[0],
    'q': row[1],
    'a': row[2],
    'b': row[3],
    'c': row[4],
    'd': row[5],
    'ans': row[6]
  };
};

function postAnswer(e) {
  return { 'success': true };
};

function doGet(e) {
  var data = {};
  
  if (!e.parameter.callback) {
    data = invalidParameters();
  } else if (e.parameter.subject) {
    data = getQuestion(e);
  } else if (e.parameter.answer) {
    data = postAnswer(e);
  } else {
    data = invalidParameters();
  }
  
  return ContentService.createTextOutput(e.parameter.callback + '(' + JSON.stringify(data) + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
};

