javascript:(function(){

    //変数初期化
    if(typeof window.counter === 'undefined'){
        window.counter = 0;//window.prompt("開始を入力してください", "");
        window.remove  = 0;
    }
    
    const userList = document.getElementById("userList")
    
    
    //トースト
    const bodycont = document.querySelectorAll('[class*="body-container"]')[0];
    if(typeof window.toast === 'undefined'){
    
    
        window.toast = document.createElement("div");
        window.toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 2147483647;";
        window.toast.style.display = "none";
        document.body.appendChild(window.toast);
    }
    
    const elements = document.querySelectorAll('[class*="profile-wrapper"]');
    
    var stnum = window.counter;
    var cnt = 0;
    var i;
    for(i=stnum;i<elements.length;i++){
        const roomRankElements = elements[i].querySelectorAll('[class*="room-rank"]');
        if(roomRankElements.length>0){
            s = roomRankElements[0].getAttribute("class").indexOf("room-rank") + 10
            const rank = roomRankElements[0].getAttribute("class")[s]
            
            if(rank === "c" || rank === "d" || rank === "e"){
                const btns = elements[i].getElementsByTagName('button');
                btns[0].click();
                window.counter = i+1;
                window.remove++;
                cnt++;
                if(cnt>=6){
                    break;
                }
            }
        }
    }

    // max?
    if(i >= elements.length){
        window.counter = i;
        //スクロール
        userList.scrollBy(0, 2000);
        
        if(window.counter-elements.length>20){userList.scrollBy(0, 2000);}
        
    }

   
    
    var message = "success[" + window.remove + "] search : " + stnum + " to " + i;
    window.toast.textContent = message;
    window.toast.style.display = "block";
    
    // メインリストのz-indexを下げる
    bodycont.style.zIndex -= 1

    setTimeout(function() {
      window.toast.style.display = "none";
      bodycont.style.zIndex = 0xFFFFFFFF;
    }, 3000); // メッセージを3秒後に非表示にする

    

})();
