javascript:(function() {
    // クリップボードの内容をtextareaにペースト
    navigator.clipboard.readText().then(function(text) {
        var textarea = document.getElementById('collect-content');
        if (textarea) {
            textarea.value = text; // クリップボードの内容をセット
            
            // inputイベントを手動で発火させる
            var event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
        }
    }).catch(function(err) {
        console.error('クリップボードの内容を取得できませんでした: ', err);
    });
})();
