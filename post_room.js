javascript:(function() {
    // 1. クリップボードの内容をtextareaにペースト
    navigator.clipboard.readText().then(function(text) {
        var textarea = document.getElementById('collect-content');
        if (textarea) {
            textarea.focus();
            
            // 1秒待ってからテキストをセット
            setTimeout(function() {
                textarea.value = text; // クリップボードの内容をセット
                
                // inputイベントを手動で発火させる
                var event = new Event('input', { bubbles: true });
                textarea.dispatchEvent(event);
            }, 1000);
        }
    }).catch(function(err) {
        console.error('クリップボードの内容を取得できませんでした: ', err);
    });
})();
