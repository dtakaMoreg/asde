javascript:(function() {
    var linkTexts = [];
    var tmplst = [];
    var cnt = 0;
    var fileName ="";
    var scroll_count= 0;
    
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
                getRoomLink();
            }else{
               scroll_count++;
            }
            
        }else{
            scroll_count =　0;
        }
        
    }, 1000); // 1秒ごとにスクロール


    // リンク要素を取得
    function getRoomLink() {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            hreft = links[i].getAttribute("href");
            if (hreft != null && hreft.length > 7 && hreft.includes("/items")) {
                tmplst.push('https://room.rakuten.co.jp' + hreft);
            }
        }
        tmplst = Array.from(new Set(tmplst));
        const now = new Date();
        const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
        fileName = `list_${formattedDate}_`; // ファイル名は適宜変更してください

        
        // ダウンロードを開始します
        startDownload();
    }

    // ダウンロードを開始します
    function startDownload() {
        // バッチサイズを設定します
        var batchSize = 50;
        var batches = [];

        for (var i = 0; i < tmplst.length; i += batchSize) {
            batches.push(tmplst.slice(i, i + batchSize));
        }

        // バッチごとにダウンロードします
        function downloadBatch(batchIndex) {
            var linkTexts = [];
            linkTexts.push('<html lang="ja">');
            linkTexts.push('<div class="link_text"></div>');
            for (var i = 0; i < batches[batchIndex].length; i++) {
                linkTexts.push('<a href="' + batches[batchIndex][i] + '">User_' + (i + 1 + (batchIndex * batchSize)) + '</a></br>');
            }
            linkTexts.push('</html>');
            var textData = linkTexts.join('\n');
            var blob = new Blob([textData], { type: 'text/html' });
            var url = URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.href = url;
            a.download = fileName + (batchIndex + 1) + '.html';
            a.style.display = 'none';
            document.body.appendChild(a);

            a.click();

            URL.revokeObjectURL(url);
            document.body.removeChild(a);

            batchIndex++;
            if (batchIndex < batches.length) {
                downloadBatch(batchIndex);
            } else {
                alert('ダウンロードが完了しました'); // ダウンロードが完了したらメッセージを表示
            }
        }

        // 最初のバッチをダウンロードします
        if (batches.length > 0) {
            downloadBatch(0);
        }
    }
})();
