javascript:(function() {

    var fileName ="";
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
    fileName = `list_${formattedDate}`; // ファイル名は適宜変更してください
        
    // ダウンロードを開始します
    function startDownload(nextinfo) {

        var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];

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
            
            //最後のNoを覚えておく
            localStorage.setItem('nextURLNo', collectedURLs.length);
        } else {
            alert('追加で作成するリストはありません。 collectedURLs[' + collectedURLs.length + ']');
        }

    }

    // ダウンロードを開始します
    // 前回の続きから
    nextURLNostr = localStorage.getItem('nextURLNo') || 0;
    nextURLNoInt = parseInt(nextURLNostr)
    startDownload(nextURLNoInt);

})();
