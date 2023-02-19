//メール通知
function sendMail() {
 //A.メールに送信する内容を設定
  const DOC_URL = 'メール文のDocURL';
  const senderName = 'ミトイチの連絡板'; 
  const subject = '時間割が更新されました。';

  //B.使用するスプレッドシートの定義
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); 
  const listSheet = spreadSheet.getSheetByName('シート１');  

  //C.処理するスプレッドシートのセル番号の定義
  const LAST_NAME_COL = 2;    //苗字の列番号
  const FIRST_NAME_COL = 2;   //名前の列番号
  const MAIL_ADDRESS_COL = 3; //メールアドレスの列番号
  const START_ROW = 2;        //for構文で読み込み始める最初の行番号
  const listLastRow = listSheet.getLastRow();

  //D.Google ドキュメントからメール本文を取得
  const openDoc = DocumentApp.openByUrl(DOC_URL);
  let wholeText = openDoc.getBody().getText(); 

  //E.顧客ごとにメールを送信
  for (var a=START_ROW; a<=listLastRow; a++){
      const recipient =  listSheet.getRange(a,MAIL_ADDRESS_COL).getValue(); //メールアドレスを取得
      const options = {name: senderName, from: listSheet}; //「姓」と「名」を取得して、名前を作成
      const customerName = listSheet.getRange(a,LAST_NAME_COL).getValue()+ " " +listSheet.getRange(a,FIRST_NAME_COL).getValue();
      let body = wholeText.replace("{customer}", customerName);

      MailApp.sendEmail(recipient, subject, body, options);
  }   

}
