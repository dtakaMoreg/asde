(function() {
    var currentURL = window.location.href;

    // トースト
    if (typeof window.toast === 'undefined') {
        window.toast = document.createElement("div");
        window.toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 2147483647; font-size: 64px;";
        window.toast.style.display = "none";
        document.body.appendChild(window.toast);
    }

    // roomを開いているなら
    if (currentURL.indexOf('https://room.rakuten.co.jp/') !== -1) {
        var v = localStorage.getItem('delClick') || 0;
        var vint = parseInt(v);

        // トースト更新
        // var message = `[${vint}]`;
        // window.toast.textContent = message;
        // window.toast.style.display = "block";

        // クリック処理
        var buttonElements = document.querySelectorAll("button");
        if (buttonElements[2].innerText === "フォロー中") {
            buttonElements[2].click();

            setTimeout(() => {
                vint++;
                localStorage.setItem('delClick', vint);        
            }, 500);
            
            setTimeout(function() {
                // 閉じる
                window.close();
            }, 1000);
            
        } else {
            navigator.clipboard.writeText("iineSkip");
            setTimeout(function() {
                // 閉じる
                window.close();
            }, 500);    
        }
    // リストを開いているなら
    } else if (document.getElementsByTagName("div")[0].classList.contains("link_text") == true) {

        // 現在のページのファイル名を取得
        const currentPage = window.location.pathname.split('/').pop();

        // localStorageから保存されたカウンターを取得
        var counter = localStorage.getItem(currentPage);

        // カウンターがnull（まだ設定されていない）場合、0に設定
        if (counter === null) {
            counter = 0;
        } else {
            counter = parseInt(counter);
        }

        var links = document.querySelectorAll('a');

        // リンクチェック
        if (links.length <= counter) {
            // alert("max");
            window.toast.style.display = "none";
            localStorage.removeItem(currentPage);
            window.close();
        } else {
            var newtab = [];

            for (var i = 0; i < 1; i++) {
                if (links.length > counter) {
                    newtab[i] = window.open(links[counter], '_blank');
                    links[counter].textContent = "[done] " + links[counter].textContent
                    counter++;

                    // localStorageに保存
                    localStorage.setItem(currentPage, counter);

                    clickcounter++;

                }
            }

            // トースト更新
            var message = counter + "/" + links.length;
            window.toast.textContent = message;
            window.toast.style.display = "block";
        }
    }
})();
