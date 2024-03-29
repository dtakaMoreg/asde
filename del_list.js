javascript:(function() {
    var linkTexts = [];
    var tmplst = [];
    var cnt = 0;
    var fileName ="";
    var scroll_count= 0;
    var collectedURLs = [];
    
    navigator.clipboard.writeText("start");  

    // 指定したIDの要素を取得します
    var userList = document.getElementById('userList');
    if(userList == null){
       userList = document.getElementById('ng-app');
    }
    
    // スクロール関数
    function scrollToBottom() {
        userList.scrollTop = userList.scrollHeight;
    }

    // スクロールが終了するまでスクロールを続けます
    var scrollInterval = setInterval(function() {
        var prevHeight = userList.scrollTop;
        scrollToBottom();
        if (prevHeight === userList.scrollTop) {
            if(scroll_count>10){
                clearInterval(scrollInterval);
            
                // スクロールが終了したらリンク要素を取得します
                getRoomDelLink();
            }else{
               scroll_count++;
            }
            
        }else{
            scroll_count = 0;
        }
        
    }, 700); // 500msごとにスクロール


    // リンク要素を取得
    function getRoomDelLink() {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            hreft = links[i].getAttribute("href");
            if (hreft != null && hreft.length > 7 && hreft.includes("/items")) {
                let divelements = links[i].getElementsByTagName('div');
                if (divelements.length > 0){
                    s = divelements[0].className.indexOf("room-rank");
                    if(s > 0){
                        s = s + 10;
                        const rank = divelements[0].className[s]
                        if(rank === "d" || rank === "e"){
                            collectedURLs.push('https://room.rakuten.co.jp' + hreft);
                        }
                    }
                }
            }
        }
        
        
        //ダウンロード
        startDownload(0);
    }


    var fileName ="";
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
    fileName = `removelist_${formattedDate}`; // ファイル名は適宜変更してください
        
    // ダウンロードを開始します
    function startDownload(nextinfo) {

        // なければやらない
        if(collectedURLs.length > nextinfo) {
            var linkTexts = [];
            linkTexts.push('<html lang="ja">');
            linkTexts.push('<div class="link_text"></div>');
            for (var i = nextinfo; i < collectedURLs.length; i++) {
                linkTexts.push('<a href="' + collectedURLs[i] + '">User_' + (i+1) + '</a></br>');
            }
            linkTexts.push('</html>');
            var textData = linkTexts.join('\n');
            var blob = new Blob([textData], { type: 'text/html' });
            var url = URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.href = url;
            a.download = fileName + '.html';
            a.style.display = 'none';
            document.body.appendChild(a);

            a.click();

            URL.revokeObjectURL(url);
            document.body.removeChild(a);

            //alert('ダウンロードが完了しました [' + (parseInt(nextinfo)+1) + ']->[' + collectedURLs.length + ']');
            
        } else {
            alert('追加で作成するリストはありません。 collectedURLs[' + collectedURLs.length + ']');
        }

    }

    
})();
