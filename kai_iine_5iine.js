(function() {
    var currentURL = window.location.href;

    // トースト
    if (typeof window.toast === 'undefined') {
        window.toast = document.createElement("div");
        window.toast.style.cssText = "position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px; z-index: 2147483647; font-size: 64px;";
        window.toast.style.display = "none";
        document.body.appendChild(window.toast);
    }

    // いいねしている数を取得
    function iinestr2num(input) {
        if (typeof input !== 'string') {
            return 0;
        }
    
        // カンマを削除
        input = input.replace(/,/g, '');
    
        // KやMが含まれているかどうかを正規表現でチェック
        var regex = /^(\d+\.?\d*)([KM])?$/i;
        var match = input.match(regex);
    
        if (match) {
            var numericPart = parseFloat(match[1]);
            var suffix = match[2] ? match[2].toUpperCase() : '';
    
            if (suffix === 'K') {
                return numericPart * 1000;
            } else if (suffix === 'M') {
                return numericPart * 1000000;
            } else {
                return numericPart;
            }
        }
    
        // 入力が無効な場合
        return 0;
    }
    

    // roomを開いているなら
    if (currentURL.indexOf('https://room.rakuten.co.jp/') !== -1) {
        var v = localStorage.getItem('iineClick') || 0;
        var vint = parseInt(v);

        // トースト更新
        // var message = `[${vint}]`;
        // window.toast.textContent = message;
        // window.toast.style.display = "block";

        //クリップボードを空にする
        navigator.clipboard.writeText("")
        
        // クリック処理
        
        var spans = document.getElementsByTagName("span");
        var iinecnt = spans.length > 11 ? spans[11].innerText : "0";
        var iinenum = iinestr2num(iinecnt);
        
        
        // いいねできそうな位置をチェック
        let like = null;
        let buttonElements = document.querySelectorAll("button");
        for(let i=0 ; i<5 ; i++){
            const ind = 4 + Math.floor(i / 2) + (i % 2) * 10; //いいねの位置が4,14,5,15..
            
            if(ind >= buttonElements.length){
                break;
            }
            
            const tmplike = buttonElements[ind].querySelector("div");
            
            if(tmplike && tmplike.className.includes("color-white")) {
                like = tmplike;
                break;
            }
        }

        let clipboardText = "";
        if ((like !== null) && (iinenum >= 30000)) {
            like.click();
        
            setTimeout(() => {
                const isColorWhite = like.className.includes("color-white");
                if (isColorWhite) {
                    clipboardText = "iineNG:" + currentURL;
                } else {
                    vint++;
                    localStorage.setItem('iineClick', vint);
                    clipboardText = "iineOK:" + currentURL;
                }
                
                navigator.clipboard.writeText(clipboardText).then(() => {
                    setTimeout(function() {
                        window.close();
                    }, 500);
                }).catch(err => {
                    //loge("Failed to write to clipboard: " + err);
                    setTimeout(function() {
                        window.close();
                    }, 500);
                });
                
            }, 500);
        } else {
            let reason = iinenum < 30000 ? "too few like" : "no iine item";        
            clipboardText = "iineSkip:" + reason + ":" + currentURL;
        
            navigator.clipboard.writeText(clipboardText).then(() => {
                setTimeout(function() {
                    window.close();
                }, 500);
            }).catch(err => {
                //loge("Failed to write to clipboard: " + err);
                setTimeout(function() {
                    window.close();
                }, 500);
            });
        }

    // リストを開いているなら
    } else if (document.getElementsByTagName("div")[0].classList.contains("link_text") == true) {

        // 現在のページのファイル名を取得
        const currentPage = window.location.pathname.split('/').pop();

        // localStorageから保存されたカウンターを取得
        var counter = localStorage.getItem(currentPage);

        // カウンターがnull（まだ設定されていない）場合、0に設定
        counter = counter === null ? 0 : parseInt(counter);

        // localStorageから最後の実行時刻を取得
        const currentTime = new Date().getTime();
        const lastExecutionTime = localStorage.getItem('last_execution_time') || 0;

        let clickcounter;
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
            
            if (links.length > counter) {

                let newtab = window.open(links[counter], '_blank');
                links[counter].textContent = "[done] " + links[counter].textContent

                // クリップボード更新
                navigator.clipboard.writeText("open:" + links[counter]);

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


    // どちらのページも開けてなければ
    } else {
        navigator.clipboard.writeText("iinePageNG")
        .then(() => {
            setTimeout(function() {
                // 閉じる
                window.close();
            }, 500);
        })
        .catch(err => {
            //console.error("Failed to write to clipboard: " + err);
            setTimeout(function() {
                // 閉じる
                window.close();
            }, 500);
        });
    }
})();
