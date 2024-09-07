javascript:(function() {
    // 1. クリップボードの内容をtextareaにペースト
    navigator.clipboard.readText().then(function(text) {
        var textarea = document.getElementById('collect-content');
        if (textarea) {
            textarea.value = text; // クリップボードの内容をセット
        }
    }).catch(function(err) {
        console.error('クリップボードの内容を取得できませんでした: ', err);
    });
})();
