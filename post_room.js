javascript:(function() {
    // 1. クリップボードの内容をtextareaにペースト
    navigator.clipboard.readText().then(function(text) {
        var textarea = document.getElementById('collect-content');
        if (textarea) {
            textarea.focus();
            
            // 1秒待ってからクリップボードの内容をセット
            setTimeout(function() {
                textarea.value = text; // クリップボードの内容をセット
            }, 1000); // 1000ms = 1秒
        }
    }).catch(function(err) {
        console.error('クリップボードの内容を取得できませんでした: ', err);
    });
})();
