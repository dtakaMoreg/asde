javascript:(function(){
    //ローカルストレージをクリップボードに格納
    var iineClick = localStorage.getItem("iineClick");
    navigator.clipboard.writeText(iineClick)  
})();
