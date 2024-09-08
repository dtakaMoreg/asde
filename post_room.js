(function() {
    let log = ''; // ログ用の変数

    function updateLog(message) {
        log += message + '\n'; // ログを更新
        console.log(message); // コンソールにも出力
    }

    function saveLog() {
        // タイムスタンプを使って一意なファイル名を生成
        //const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // タイムスタンプを取得
        //const filename = `log_${timestamp}.txt`; // ファイル名を生成

        // ログをテキストファイルとして保存
        //const blob = new Blob([log], { type: 'text/plain' });
        //const link = document.createElement('a');
        //link.href = URL.createObjectURL(blob);
        //link.download = filename;
        //link.click();
    }

    // 500ミリ秒待ってからクリップボードの処理を実行
    setTimeout(function() {
        // 1. クリップボードの内容をtextareaにペースト
        navigator.clipboard.readText().then(function(text) {
            var textarea = document.getElementById('collect-content');
            if (textarea) {
                textarea.value = text; // クリップボードの内容をセット
                updateLog('クリップボードの内容をセットしました: ' + text);

                // inputイベントを手動で発火させる
                var event = new Event('input', { bubbles: true });
                textarea.dispatchEvent(event);
                updateLog('inputイベントを発火しました');
            } else {
                updateLog('textareaが見つかりませんでした (null)');
            }

            // 2. 2秒後にbuttonをクリック
            setTimeout(function() {
                var button = document.querySelector('button.collect-btn');
                if (button) {
                    button.click(); // ボタンをクリック
                    updateLog('ボタンをクリックしました');
                } else {
                    updateLog('ボタンが見つかりませんでした (null)');
                }
                saveLog(); // ログを保存
            }, 2000); // 2秒待つ
        }).catch(function(err) {
            updateLog('クリップボードの内容を取得できませんでした: ' + err);
            saveLog(); // ログを保存
        });
    }, 500); // 500ミリ秒待つ
})();
