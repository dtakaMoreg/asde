javascript:(function() {
    // ターゲットサイトのURL
    var targetSite = 'https://room.rakuten.co.jp/room_f45d756af1/items';
    // 現在のページのURL
    var currentSite = window.location.href;

    if (currentSite === targetSite) {
        // localStorageからインデックスを取得
        var storedIndex = localStorage.getItem('bookmarkletIndex');
        // インデックスが存在すればパース、存在しなければ0
        var index = storedIndex ? parseInt(storedIndex) : 0;

        // クリック対象の要素を取得
        var roomelements = document.querySelectorAll('a[class*="link-image"]');
        navigator.clipboard.writeText("Pending")  ;

        // スクロール関数
        function scrollToNext() {
            if (index <= 422 && roomelements.length <= index) {
                window.scrollBy(0, window.innerHeight);
                elements = document.querySelectorAll('a[class*="link-image"]'); // スクロール後に要素を再取得
                setTimeout(scrollToNext, 1000); // 再帰的に1秒ごとにスクロール
            } else {
            	alert('ok ind:' + index +'ele:'+roomelements.length);
        		navigator.clipboard.writeText("OK")  ;
        
                if (index < roomelements.length) {
                    roomelements[index].click();
                    index++;
                    localStorage.setItem('bookmarkletIndex', index);
                } else {
                    alert('No more elements to click.');
//                    localStorage.removeItem('bookmarkletIndex');
                }
            }
        }
	
        // 初回のスクロール呼び出し
        scrollToNext();

    } else {
        // ソーシャルエリアの要素を取得
        var elements = document.querySelectorAll('[class^="social-text-area"]');
        
        if (elements.length > 0) {
            // コピーするテキストを取得
            var textToCopy = elements[0].textContent || elements[0].innerText;

            // ページのURLを取得
            var pageUrl = window.location.href;

            // 'link--'で始まるクラス名を持つA要素を取得
            var linkElements = document.querySelectorAll('a[class^="link--"]');
            
            // 該当するA要素からURLを抽出してデコード
            var linkElementUrls = Array.from(linkElements).map(function(linkElement) {
                return linkElement.href;
            });

            // テキスト、ページURL、A要素URLを結合
            var combinedText = 'ページURL@@@' + pageUrl + '\nテキスト@@@"' + textToCopy + '"\nA要素URL@@@' + linkElementUrls.join('\n');

            // localStorageから既存のデータを取得
            var storedData = JSON.parse(localStorage.getItem('copiedData')) || {};

            // 現在のページのデータをデータに追加
            storedData[pageUrl] = combinedText;

            // 更新されたデータをlocalStorageに保存
            localStorage.setItem('copiedData', JSON.stringify(storedData));

            // アラート表示（コメントアウトされていた）
            // alert('テキストとデコードされたURLがlocalStorageに保存されました:\n' + combinedText);
        } else {
            // 対象の要素が見つからない場合はアラート表示
            alert('対象の要素が見つかりませんでした');
        }

        // 一つ前のページに戻る
        history.back();
    }
})();


javascript:(function() {
    var targetSite = 'https://room.rakuten.co.jp/room_f45d756af1/items';
    var currentSite = window.location.href;

    if (currentSite === targetSite) {
        var storedIndex = localStorage.getItem('bookmarkletIndex');
        var index = storedIndex ? parseInt(storedIndex) : 0;

        var elements = document.querySelectorAll('a[class*="link-image"]');

        // スクロール関数
        function scrollToNext() {
            if (index <= 500 && elements.length < index) {
                window.scrollBy(0, window.innerHeight);
                elements = document.querySelectorAll('a[class*="link-image"]'); // スクロール後に要素を再取得
                setTimeout(scrollToNext, 1000); // 再帰的に1秒ごとにスクロール
            } else {
                if (index < elements.length) {
                    elements[index].click();
                    index++;
                    localStorage.setItem('bookmarkletIndex', index);
                } else {
                    alert('No more elements to click.');
                    localStorage.removeItem('bookmarkletIndex');
                }
            }
        }

        // 初回のスクロール呼び出し
        scrollToNext();
    } else {
        alert('This bookmarklet is only intended for: ' + targetSite);
        history.back(); // Go back to the previous page
    }
})();

