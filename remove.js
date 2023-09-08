javascript:(function(){
    //変数初期化
    if(typeof window.counter === 'undefined'){
        window.counter = 0;
        window.remove  = 0;
    }
    
    const userList = document.getElementById("userList")
    
    const elements = document.querySelectorAll('[class*="profile-wrapper"]');
    for(var i=window.counter;i<elements.length;i++){
        const roomRankElements = elements[i].querySelectorAll('[class*="room-rank"]');
        if(roomRankElements.length>0){
            s = roomRankElements[0].getAttribute("class").indexOf("room-rank") + 10
            const rank = roomRankElements[0].getAttribute("class")[s]
            
            if(rank === "c" || rank === "d" || rank === "e"){
                const btns = elements[i].getElementsByTagName('button');
                btns[0].click();
                window.counter = i+1;
                window.remove++;
                break;
            }
        }
    }
    
    // max?
    if(i === elements.length){

        var message = "success[" + window.remove + "] max search : " + window.counter + " to " + i;
        var toast = document.createElement("div");
        toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 999999;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function() {
          toast.style.display = "none";
        }, 3000); // メッセージを3秒後に非表示にする

        window.counter = i;
    }
    
    //スクロール
    userList.scrollBy(0, 2000);

})();