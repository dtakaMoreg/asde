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
        var elements = document.querySelectorAll('a[class*="link-image"]');

        if (index < elements.length) {
            // 要素をクリックし、インデックスを更新
            elements[index].click();
            index++;
            localStorage.setItem('bookmarkletIndex', index);
        } else {
            // クリックする要素がない場合はアラート表示し、localStorageからインデックスを削除
            alert('クリックする要素がもうありません。');
            localStorage.removeItem('bookmarkletIndex');
        }
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
