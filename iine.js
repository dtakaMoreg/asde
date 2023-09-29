javascript:(function(){

    //roomを開いているなら
    if (window.location.href.indexOf('https://room.rakuten.co.jp/') !== -1) {
        //var v = localStorage.getItem('value');
        //if(v === null) v = 0;
        //v = Number(v);
        
        //クリック処理
        var buttonElements = document.querySelectorAll("button");
        var like = buttonElements[4].querySelector("div");
        if(like.className.includes("color-white")){
            like.click();
            //localStorage.setItem('value', v+1);
        }else{
            //localStorage.setItem('value', v);
        }
        //とじる
        window.close();

    } else {

        //変数を初期化
        if(typeof window.counter === 'undefined'){
            window.counter = 0;
        }
        
        if(typeof window.success_count === 'undefined'){
            //localStorage.clear()
            window.success_count = 0;
        }
        
        if(typeof window.max_count === 'undefined'){
            window.max_count = 0;
        }
    
        var links = document.querySelectorAll('a');
        window.max_count = links.length
        //var vv = localStorage.getItem('value');
        //vv += Number(vv);
        //window.success_count += vv
        
        if(links.length <= window.counter){
            alert("max success[" + window.success_count + "]");
        }else{
            var newtab =[];
            for(var i=0;i<10;i++){
                if(links.length > window.counter){
                    newtab[i] = window.open(links[window.counter], '_blank');
                    links[window.counter].textContent = "[done] " + links[window.counter].textContent
                    window.counter++;
                }
            }
        }
    }
})();
