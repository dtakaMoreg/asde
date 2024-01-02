javascript:(function(){
    //ローカルストレージをクリップボードに格納
    var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];
//    navigator.clipboard.writeText(collectedURLs.length)
    setTimeout(() => navigator.clipboard.writeText(collectedURLs.length), 500);

})();
