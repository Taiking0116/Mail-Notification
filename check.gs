//ファイルの更新検知→メールをしろとPOST
function getlasydates() {
  var id = SpreadsheetApp.getActiveSpreadsheet().getId();
  var file = DriveApp.getFileById('時間割画像ファイル');
  var date = Utilities.formatDate(file.getLastUpdated(), "JST", "yyyy/MM/dd HH:mm:ss");
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var range = sheet.getRange("A1").setValue(date);
  console.log(date);
  compares();
}
function compares() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('シート1');


  range = sheet.getRange('A1');
  value = range.getValue();
  news = Utilities.formatDate(value, "JST", "yyyy/MM/dd")
  console.log(news)


  ranges = sheet.getRange('A2');
  values = ranges.getValue();
  olds = Utilities.formatDate(values, "JST", "yyyy/MM/dd")
  console.log(olds)

  if(news == olds){
    console.log("更新なし")
  }else{
    UrlFetchApp.fetch("メール通知のGASにPOST");
    change();
  }
}
function change(){
  var id = SpreadsheetApp.getActiveSpreadsheet().getId();
  var file = DriveApp.getFileById('150TuieBYwSRAgl3YNAzj_NFJ3IY8bFP1');
  var date = Utilities.formatDate(file.getLastUpdated(), "JST", "yyyy/MM/dd HH:mm:ss");
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var range = sheet.getRange("A2").setValue(date);
}
