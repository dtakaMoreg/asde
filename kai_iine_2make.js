javascript:(function() {

    var fileName ="";
    var nextURLNo = 0;
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
    fileName = `list_${formattedDate}_`; // ファイル名は適宜変更してください
        
    // ダウンロードを開始します
    function startDownload(nextinfo) {
        // バッチサイズを設定します
        var batchSize = 50;
        var batches = [];

        var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];
        
        for (var i = nextinfo; i < collectedURLs.length; i += batchSize) {
            batches.push(collectedURLs.slice(i, i + batchSize));
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
            nextURLNo += batches[batchIndex].length;
            batchIndex++;
            if (batchIndex < batches.length) {
                downloadBatch(batchIndex);
            } else {
                alert('ダウンロードが完了しました');
                localStorage.setItem('nextURLNo', nextURLNo);
            }
        }

        // 最初のバッチをダウンロードします
        if (batches.length > 0) {
            downloadBatch(0);
        }
    }

    // ダウンロードを開始します
    nextURLNostr = localStorage.getItem('nextURLNo') || 0;
    nextURLNoInt = parseInt(nextURLNostr)
    startDownload(nextURLNoInt);

})();
