(async function() {
    var currentURL = window.location.href;

    // トースト
    if (typeof window.toast === 'undefined') {
        window.toast = document.createElement("div");
        window.toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 2147483647; font-size: 64px;";
        window.toast.style.display = "none";
        document.body.appendChild(window.toast);
    }

    // いいねしている数を取得
    function iinenum(input) {
        // カンマを削除
        input = input.replace(/,/g, '');
        // KやMが含まれているかどうかを正規表現でチェック
        var regex = /(\d+\.?\d*)([KM])/i;
        var match = input.match(regex);
        if (match) {
            var numericPart = parseFloat(match[1]);
            var suffix = match[2].toUpperCase();
            if (suffix === 'K') {
                return numericPart * 1000;
            } else if (suffix === 'M') {
                return numericPart * 1000000;
            }
        }
        // KやMが含まれていない場合、そのまま数値に変換
        return parseFloat(input);
    }

    // wait
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // roomを開いているなら
    if (currentURL.indexOf('https://room.rakuten.co.jp/') !== -1) {
        var v = localStorage.getItem('iineClick') || 0;
        var vint = parseInt(v);
        let result = "";

        // クリック処理
        var buttonElements = document.querySelectorAll("button");
        var iinecnt = document.getElementsByTagName("span")[11].innerText;
        var iinenum = iinenum(iinecnt);
        
        // いいねをしている人なら
        result = "iineSkip";
        if (iinenum >= 30000) {

            //最大5つまで
            for(let i=0 ; i<5 ; i++){
                let ind = 3 + Math.floor(i / 2) + (i % 2) * 20; //いいねの位置が3,23,4,24..
                var like = buttonElements[ind].querySelector("div");

                if (like.className.includes("color-white")) {
                    like.click();

                    wait(500);

                    const isColorWhite = like.className.includes("color-white");
                    if (isColorWhite) {
                        //いいねNG
                        result = "iineNG";
                    } else {
                        //いいねOK
                        vint++;
                        localStorage.setItem('iineClick', vint);

                        result = "iineOK";
                                
                    }
                    break;
                }
            }   
        }

        // クリップボード更新
        navigator.clipboard.writeText(result);
        wait(500);
        
        // 閉じる
        window.close();
            
    
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

        // localStorageから最後の実行時刻を取得
        const currentTime = new Date().getTime();
        const lastExecutionTime = localStorage.getItem('last_execution_time') || 0;

        if (currentTime - parseInt(lastExecutionTime) >= 3600000) {
            // 1時間以上経過した場合、counterを0に設定
            clickcounter = 0;
        } else {
            // 最後の実行から1時間以内の場合、counterの値を使用
            clickcounter = localStorage.getItem('clickcounter') || 0;
            clickcounter = parseInt(clickcounter);
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
                    localStorage.setItem('clickcounter', clickcounter);
                    localStorage.setItem('last_execution_time', currentTime);
                }
            }

            // トースト更新
            var message = counter + "/" + links.length;
            window.toast.textContent = message;
            window.toast.style.display = "block";
        }
        
    //ほかのページだったら中断
    }else{
        navigator.clipboard.writeText("iinePageNG");
    }
    
})();
