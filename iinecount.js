javascript:(function(){
    //ローカルストレージをクリップボードに格納
    var collectedURLs = JSON.parse(localStorage.getItem('collectedURLs')) || [];
    navigator.clipboard.writeText(collectedURLs.length)  
    alert("call script");
})();
