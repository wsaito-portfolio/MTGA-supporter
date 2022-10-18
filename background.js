


chrome.runtime.onInstalled.addListener(() => {
  //カードリスト読み込み
  fetch(chrome.runtime.getURL("/json/DMU_list.json"))
  .then((response) => response.json())  .then((data) => {

    var key,value;
    console.log(data);
    data.forEach(element => {
      key = element["col_num"]+element["set"];
      value = element["name_ja"];
      chrome.storage.local.set( { [key] : [value]});
      
      element["col_num"]+element["col_num"]
    });
    
  });

  
  var parent = chrome.contextMenus.create({
    id: 'parent',
    title: 'MTGA-Supporter'
  });
});

chrome.contextMenus.onClicked.addListener(function(info,tab) {
  chrome.tabs.sendMessage(tab.id, 
    {
        message: "copyText",
        textToCopy: "some text" 
    }, (response) => {  
      let text;
      text = String(response).split('\r\n');
      
      if (String(text[1]).match(/[0-9]{1,2}.*\([a-zA-Z]{3}\)\ [0-9]{1,3}/).length>0){
      
        text = String(response).split('\r\n');  
        

        //カードの枚数の切り出し
        var text1 = String(text[1]).match(/[0-9]{1,3}/);
        text[1] =text[1].replace(/[0-9]{1,3}/,"");

        //カードNoの切り出し
        var text2 = String(text[1]).match((/[0-9]{1,3}/));
        text[1] =text[1].replace(/([0-9]{1,3})/,"");

        //カードセットの切り出し
        var text3 = String(text[1]).match(/(\([a-zA-Z]{3}\))/);
        text[1] =text[1].replace(/(\([a-zA-Z]{3}\))/,"");
        //
        console.log(text1[0]);
        console.log(text2[0]);
        console.log(text3[0]);
        console.log(text[1]);

      }else if(String(text[1]).match(/[0-9]{1,2}.*/).length>0){


  
        console.log("test");

      }
      
      console.log(response);
    })
});
