javascript:(function(){
    
    //変数を初期化
    if(typeof window.counter === 'undefined'){
        window.counter = 0;
    }
    
    if(typeof window.success_count === 'undefined'){
        window.success_count = 0;
    }
    
    if(typeof window.max_count === 'undefined'){
        window.max_count = 0;
    }

    //roomを開いているなら
    if (window.location.href.indexOf('https://room.rakuten.co.jp/') !== -1) {
        //クリック処理
        var buttonElements = document.querySelectorAll("button");
        var like = buttonElements[4].querySelector("div");
        if(like.className.includes("color-white")){
            like.click();
            window.success_count++;
        }
        //とじる
        window.close();

    } else {

        var links = document.querySelectorAll('a');
        window.max_count = links.length
            
        if(links.length <= window.counter){
            alert("max");
        }else{
            var newtab =[];
            for(var i=0;i<5;i++){
                if(links.length > window.counter){
                    newtab[i] = window.open(links[window.counter], '_blank');
                    window.counter++;
                }
            }
        }
    }
})();
