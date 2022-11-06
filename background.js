


chrome.runtime.onInstalled.addListener(() => {
  //カードリスト読み込み
  fetch(chrome.runtime.getURL("/json/DMU_list.json"))
    .then((response) => response.json()).then((data) => {

      var key, value;
      //console.log(data);
      //Chromeのローカルに保存
      data.forEach(element => {
        key = element["col_num"] + element["set"];
        value = element["name_ja"];
        chrome.storage.local.set({ [key]: [value] });

        element["col_num"] + element["col_num"]
      });

    });


  var parent = chrome.contextMenus.create({
    id: 'parent',
    title: 'MTGA-Supporter'
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.sendMessage(tab.id,
    {
      message: "copyText",
      textToCopy: "some text"
    }).then( async(response) => {

      //デッキリスト日本語化処理開始
      let text;
      //一行ごとに区切って配列化する
      text = String(response).split('\r\n');

      //console.log(text);

      let num;  //カード枚数
      let col_num; //コレクションナンバー
      let set;  //収録セット
      let id
      let text_ja;

      //デッキインポートの形式チェック
      if (String(text[1]).match(/[0-9]{1,2}.*\([a-zA-Z]{3}\)\ [0-9]{1,3}/).length > 0) {


        //
        for(let line of text) {
          if (line.match(/[0-9]{1,2}.*\([a-zA-Z]{3}\)\ [0-9]{1,3}/) == null) continue;

          //console.log("カードの枚数の切り出し");
          //カードの枚数の切り出し
          line = String(line);

          num = String(line).slice(0, 2);
          line = line.slice(2);

          //console.log("カードNoの切り出し");
          //カードNoの切り出し
          col_num = String(line).match((/[0-9]{1,3}/));
          line = line.replace(/([0-9]{1,3})/, "");

          //console.log("カードセットの切り出し");
          //カードセットの切り出し
          set = String(line).match(/(\([a-zA-Z]{3}\))/g);
          line = line.replace(/(\([a-zA-Z]{3}\))/g, "");

          //console.log(col_num);
          //console.log(set);
          console.log(col_num+set);
          id = String(col_num + set)
          //カードのマッチング
          await chrome.storage.local.get([id])
            .then((name_ja) => {

              //console.log("日本語翻訳中");
              text_ja = num + " " + name_ja[String(col_num + set)] + " " + set + " " + col_num + '\r\n';
              console.log(text_ja);
              //console.log("日本語翻訳終了");
            });
        }




      } else if (String(text[1]).match(/[0-9]{1,2}.*/).length > 0) {



        //console.log("test");

      }

    })
});
