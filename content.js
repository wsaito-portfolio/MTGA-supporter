chrome.runtime.onMessage.addListener( // this is the message listener
    async function(request, sender, sendResponse) {
      console.log("copy start");
        if (request.message === "copyText"){     
          console.log("copy start");
          const text = await navigator.clipboard.readText();    
          console.log(text);
          sendResponse(text);
        }
        console.log("copy end");
        return true;
});
