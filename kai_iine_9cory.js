javascript:(function(){

    //ローカルストレージを表示
    var iineClick = localStorage.getItem("iineClick");

    var d = new Date(parseInt(nextResetTime));

    // 日本標準時 (GMT+9) に設定

    d.setHours(d.getHours() + 9);
    var dstr = d.toISOString().slice(0, 19).replace("T", " ");
    alert("nextResetTime[" + dstr + "] iineClick[" + iineClick + "] collectedURLs[" + collectedURLs.length + "] nextURLNo[" + nextURLNo + "]")

})();
