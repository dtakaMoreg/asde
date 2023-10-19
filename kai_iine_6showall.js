javascript:(function(){
    var txt = "";
    //ローカルストレージを表示
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      txt += `Key: ${key}, Value: ${value}\n`;
    }
    alert(txt);
})();
