(function() {
    
    var currentURL = window.location.href;

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

        function retryClipboardWrite(text, retryCount = 1) {
            return navigator.clipboard.writeText(text).catch(err => {
                if (retryCount > 0) {
                    return retryClipboardWrite(text, retryCount - 1);
                } else {
                    throw err;
                }
            });
        }
        
        //if (like !== null) {
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
                
                retryClipboardWrite(clipboardText).then(() => {
                    setTimeout(function() {
                        window.close();
                    }, 500);
                }).catch(err => {
                    setTimeout(function() {
                        window.close();
                    }, 500);
                });
                
            }, 500);
        } else {
            let reason = iinenum < 30000 ? "too few like" : "no iine item";
            clipboardText = "iineSkip:" + reason + ":" + currentURL;
        
            retryClipboardWrite(clipboardText).then(() => {
                setTimeout(function() {
                    window.close();
                }, 500);
            }).catch(err => {
                setTimeout(function() {
                    window.close();
                }, 500);
            });
        }
        

    // ページを開けてなければ
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
