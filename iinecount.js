javascript:(function(){
    //ローカルストレージをクリップボードに格納
    var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];
//    navigator.clipboard.writeText(collectedURLs.length)
    async function copyToClipboard() {
      try {
        await navigator.clipboard.writeText(collectedURLs.length);
        console.log('テキストがクリップボードにコピーされました');
      } catch (error) {
        console.error('クリップボードへのコピー中にエラーが発生しました:', error);
        alert('クリップボードへのコピー中にエラーが発生しました\nエラー内容: ' + error.message);
      }
    }

    // ボタンクリックなどのイベント内で呼び出す
    copyToClipboard();



})();
