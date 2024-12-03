(function () {
    const currentURL = window.location.href;

    // いいね数を数値に変換する関数
    function iinestr2num(input) {
        if (typeof input !== 'string') return 0;

        const cleanedInput = input.replace(/,/g, '');
        const regex = /^(\d+\.?\d*)([KM])?$/i;
        const match = cleanedInput.match(regex);

        if (match) {
            const numericPart = parseFloat(match[1]);
            const suffix = match[2] ? match[2].toUpperCase() : '';
            return suffix === 'K'
                ? numericPart * 1000
                : suffix === 'M'
                ? numericPart * 1000000
                : numericPart;
        }

        return 0;
    }

    // クリップボードにテキストを書き込み、リトライ処理を実装
    async function retryClipboardWrite(text, retries = 2) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            if (retries > 0) {
                console.warn(`Clipboard write failed. Retrying... (${retries} retries left)`);
                await retryClipboardWrite(text, retries - 1);
            } else {
                console.error("Failed to write to clipboard after retries:", error);
                throw error; // エラーをスロー
            }
        }
    }

    // 処理の終了後にウィンドウを閉じる
    async function closeAfterWrite(text) {
        try {
            await retryClipboardWrite(text); // 書き込みが成功するまで待機
        } catch (error) {
            console.warn("Error writing to clipboard:", error); // 失敗してもログを記録
        } finally {
            setTimeout(() => window.close(), 500); // 必ずウィンドウを閉じる
        }
    }

    if (currentURL.includes('https://room.rakuten.co.jp/')) {
        // いいね数の取得
        const spans = document.getElementsByTagName('span');
        const iinecnt = spans.length > 11 ? spans[11].innerText : '0';
        const iinenum = iinestr2num(iinecnt);

        // いいねボタンを探す
        const buttonElements = document.querySelectorAll('button');
        let like = null;
        for (let i = 0; i < 5; i++) {
            const ind = 4 + Math.floor(i / 2) + (i % 2) * 10; // いいねの位置
            if (ind >= buttonElements.length) break;

            const tmplike = buttonElements[ind].querySelector('div');
            if (tmplike && tmplike.className.includes('color-white')) {
                like = tmplike;
                break;
            }
        }

        if (like && iinenum >= 30000) {
            // いいねが可能な場合
            like.click();
            setTimeout(() => {
                const isColorWhite = like.className.includes('color-white');
                const clipboardText = isColorWhite
                    ? `iineNG:${currentURL}`
                    : `iineOK:${currentURL}`;
                //closeAfterWrite(clipboardText);
            }, 500);
        } else {
            // いいね不可の場合
            const reason = iinenum < 30000 ? 'too few like' : 'no iine item';
            const clipboardText = `iineSkip:${reason}:${currentURL}`;
            //closeAfterWrite(clipboardText);
        }
    } else {
        // ページが対象外の場合
        //closeAfterWrite('iinePageNG');
    }
})();
