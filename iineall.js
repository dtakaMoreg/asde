javascript:(function() {

    var links = document.getElementsByTagName('a'); // ページ内のすべての<a>タグを取得
    var likedCount = 0;  //ユーザ数
    
    var linkIndex = 0; // 現在クリックするリンクのインデックス
    var likedElements = [];  //いいねできる要素を格納
    
    var max_count;
    max_count = window.prompt("いいねする数を入力してください", "100");
    
    // いいねできるものを取得
    for(var i = 0; i < links.length; i++){
      var link = links[i];
      if(link.textContent === 'いいね'){
          likedCount++;
          
          if(!link.classList.contains('isLiked')) {
              likedElements.push(link);
          }
      }
    }
    
    // max_countが0ならそこまでで実行する
    if(max_count == 0){
        max_count = likedElements.length;
    }
    
    // 満たせているか
    if(likedElements.length < max_count){
        alert("足りない" + likedElements.length + "/" + likedCount);
        return;
    }
    

    //トースト
    if(typeof window.toast === 'undefined'){
    
        // メインリストのz-indexを下げる
        //const bodycont = document.querySelectorAll('[class*="body-container"]')[0];
        //bodycont.style.zIndex -= 1
    
        window.toast = document.createElement("div");
        window.toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 2147483647;";
        window.toast.style.display = "none";
        document.body.appendChild(window.toast);
    }
    
    
    function clickNextLink() {
        if ((linkIndex < likedElements.length) && (linkIndex <= max_count)){
            likedElements[linkIndex].click();
            //alert(linkIndex + "/" + likedElements.length);
            var nexttime = (Math.floor(Math.random() * 5) + 1)
            
            var message = linkIndex + "/" + max_count + " next-> " + nexttime;
            window.toast.textContent = message;
            window.toast.style.display = "block";
    
            linkIndex++; // 次のリンクに進む
            
            // タイマーをセットアップして5秒ごとにリンクをクリック
            setTimeout(clickNextLink, nexttime*1000);
    
        } else {
            window.toast.style.display = "none";
            alert('すべてのリンクをクリックしました。'); // すべてのリンクをクリックし終えたらアラートを表示
        }
    }

    // タイマーをセットアップして5秒ごとにリンクをクリック
    setTimeout(clickNextLink, (Math.floor(Math.random() * 5) + 1)*1000);


})();
