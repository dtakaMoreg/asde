javascript:(function() {
    var linkTexts = [];
    var tmplst = [];
    var cnt = 0;
    var fileName ="";
    var scroll_count= 0;
    
    // 指定したIDの要素を取得します
    var userList = document.getElementById('userList');
    if(userList == null){
        userList = document.getElementById('ng-app');
    }
    
    // スクロール関数
    function scrollToBottom() {
        userList.scrollTop = userList.scrollHeight;
    }

    // スクロールが終了するまでスクロールを続けます
    var scrollInterval = setInterval(function() {
        var prevHeight = userList.scrollTop;
        scrollToBottom();
        if (prevHeight === userList.scrollTop) {
            if(scroll_count>10){
                clearInterval(scrollInterval);
            
                // スクロールが終了したらリンク要素を取得します
                getRoomLink();
            }else{
               scroll_count++;
            }
            
        }else{
            scroll_count = 0;
        }
        
    }, 1000); // 1秒ごとにスクロール


    // リンク要素を取得
    function getRoomLink() {
        var elements = document.querySelectorAll("[class*='profile-wrapper']");
        
        for (var i = 0; i < elements.length; i++) {
            var links = elements[i].getElementsByTagName('a');
            hreft = links[2].getAttribute("href");
            
            var buttons = elements[i].getElementsByTagName('button');
            follows = buttons[0].innerText;
            //未フォローの場合格納する
            if (hreft != null && hreft.length > 7 && hreft.includes("/items") && follows === 'フォローする') {
                tmplst.push('https://room.rakuten.co.jp' + hreft);
            }
        }
        
        
        // LocalStorageへ格納する
        // 朝4時にストレージをリセットする
        var currentDate = new Date();

        // リセット時刻と現在時刻を取得
        var nextResetTime = parseInt(localStorage.getItem('nextResetTimeFollow'), 10) || 0;
        var currentTime = currentDate.getTime();
        
        // リセット時刻を過ぎていたらリセット
        if (currentTime >= nextResetTime) {

            //ローカルストレージをリセット
            localStorage.removeItem("nextResetTimeFollow");
            localStorage.removeItem("collectedFollowURLs");
            localStorage.removeItem("nextFollowURLNo");
            localStorage.removeItem("followClick");
            
            // 開始時刻を設定
            var currentHour = currentDate.getHours();
            var nextTime = new Date(currentDate);
            
            // 当日の0:00～3:59なら当日の4時に設定
            if (currentHour >= 0 && currentHour < 4) {
                nextTime.setHours(4, 0, 0, 0);
            // そうでなければ次の日の4時に設定
            } else {
                nextTime.setDate(currentDate.getDate() + 1);
                nextTime.setHours(4, 0, 0, 0);
            }
        
            localStorage.setItem('nextResetTimeFollow', nextTime.getTime());
        }

        // URLを追加
        var collectedURLs = JSON.parse(localStorage.getItem('collectedFollowURLs')) || [];
        var beforecnt = collectedURLs.length;
        collectedURLs.push(...tmplst);
    
        // ローカルストレージに収集したURLを保存
        localStorage.setItem('collectedFollowURLs', JSON.stringify(collectedURLs));

        alert('URLを収集しました: current[' + tmplst.length + '] total[' + collectedURLs.length + ']([' + beforecnt + ']->[' + aftercnt + '])');
    
    }

})();
