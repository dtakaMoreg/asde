まjavascript:(function(){

    var currentURL = window.location.href;

    //roomを開いているなら
    if (currentURL.indexOf('https://room.rakuten.co.jp/') !== -1) {
        var v = localStorage.getItem('iineClick') || 0;
        var vint = parseInt(v);
        
        //クリック処理
        var buttonElements = document.querySelectorAll("button");
        var like = buttonElements[4].querySelector("div");
        if(like.className.includes("color-white")){
            like.click();
            vint++;
            localStorage.setItem('iineClick', vint);
        }
        //とじる
        window.close();

    //リストを開いているなら
    } else if(document.getElementsByTagName("div")[0].classList.contains("link_text") == true) {

        //変数を初期化
        if(typeof window.counter === 'undefined'){
            //途中で終わってたら途中から
            opened = localStorage.getItem('opened');
            window.counter = (opened !== null) ? opened : 0;
        }
        
        
        //トースト
        if(typeof window.toast === 'undefined'){
        
            window.toast = document.createElement("div");
            window.toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 2147483647; font-size: 64px;";
            window.toast.style.display = "none";
            document.body.appendChild(window.toast);
        }
    
    
        var links = document.querySelectorAll('a');

        // リンクチェック
        if(links.length <= window.counter){
            //alert("max");
            window.toast.style.display = "none";
            localStorage.clear();
            window.close();
        }else{
            var newtab =[];
                        
            for(var i=0;i<1;i++){
                if(links.length > window.counter){
                    newtab[i] = window.open(links[window.counter], '_blank');
                    links[window.counter].textContent = "[done] " + links[window.counter].textContent
                    window.counter++;
                    
                }
            }
            
            //開いた数更新
            localStorage.setItem('opened', window.counter);
            
            //トースト更新
            var message = window.counter + "/" + links.length;
            window.toast.textContent = message;
            window.toast.style.display = "block";
        }
    }
})();
