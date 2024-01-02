javascript:(function(){
    //ローカルストレージをクリップボードに格納
    var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];
//    navigator.clipboard.writeText(collectedURLs.length)
    navigator.clipboard.writeText(collectedURLs.length)
  .then(() => {
    // 成功した場合の処理
    console.log('テキストがクリップボードにコピーされました');
  })
  .catch((error) => {
    // エラーが発生した場合の処理
    console.error('クリップボードへのコピー中にエラーが発生しました:', error);
    alert('クリップボードへのコピー中にエラーが発生しました');
  });

})();
