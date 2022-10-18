chrome.runtime.onMessage.addListener( // this is the message listener
     function(request, sender, sendResponse) {
      console.log("copy start");
        if (request.message === "copyText"){     
          navigator.clipboard.readText().then((result)=>{    
          console.log(result);
          sendResponse(result);
          });
        }
        return true;
});
