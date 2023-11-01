javascript:(function() {

    var fileName ="";
    
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14); // yyyymmddhhmmss形式にフォーマット
    fileName = `list_follow_${formattedDate}`; // ファイル名は適宜変更してください
        
    // ダウンロードを開始します
    function startDownload(nextinfo) {

        var collectedURLs = JSON.parse(localStorage.getItem('collectedFollowURLs')) || [];

        // なければやらない
        if(collectedURLs.length > nextinfo) {

            //重複の多い順に、
            // 重複をカウントするためのオブジェクトを作成
            var counts = {};
            for (var i = 0; i < collectedURLs.length; i++) {
                var item = collectedURLs[i];
                counts[item] = counts[item] ? counts[item] + 1 : 1;
            }
            
            // カウントを降順にソート
            var sortedCounts = Object.keys(counts).sort(function(a, b) {
                return counts[b] - counts[a];
            });
            
            // 2回以上重複している要素をtmplst2に格納
            var tmplst2 = [];
            for (var i = 0; i < sortedCounts.length; i++) {
                var key = sortedCounts[i];
                if (counts[key] >= 2) {
                    tmplst2.push(key);
                }
            }
            
            var linkTexts = [];
            linkTexts.push('<html lang="ja">');
            linkTexts.push('<div class="link_text"></div>');
            for (var i = nextinfo; i < tmplst2.length; i++) {
                linkTexts.push('<a href="' + tmplst2[i] + '">User_' + (i+1) + '</a></br>');
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

            alert('ダウンロードが完了しました [' + (parseInt(nextinfo)+1) + ']->[' + colltmplst2ectedURLs.length + ']');
            
            //最後のNoを覚えておく
            localStorage.setItem('nextFollowURLNo', tmplst2.length);
        } else {
            alert('追加で作成するリストはありません。 collectedURLs[' + collectedURLs.length + ']');
        }

    }

    // ダウンロードを開始します
    // 前回の続きから
    nextURLNostr = localStorage.getItem('nextFollowURLNo') || 0;
    nextURLNoInt = parseInt(nextURLNostr)
    startDownload(nextURLNoInt);

})();
