javascript:(function() {
    // 1. クリップボードの内容をtextareaにペースト
    navigator.clipboard.readText().then(function(text) {
        var textarea = document.getElementById('collect-content');
        if (textarea) {
            textarea.value = text; // クリップボードの内容をセット
            
            // inputイベントを手動で発火させる
            var event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
        }

        // 2. 2秒後にbuttonをクリック
        setTimeout(function() {
            var button = document.querySelector('button.collect-btn');
            if (button) {
                button.click(); // ボタンをクリック
            }
        }, 21000); // 2秒待つ

    }).catch(function(err) {
        console.error('クリップボードの内容を取得できませんでした: ', err);
    });
})();
