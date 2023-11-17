javascript:(function() {
  // Local Storageからハッシュタグを取得
  const storedHashtags = localStorage.getItem('collectedHashtags');
  
  if (!storedHashtags) {
    alert('保存されたハッシュタグがありません。');
    return;
  }

  // ハッシュタグを改行区切りのテキストに変換
  const hashtagsText = JSON.parse(storedHashtags).join('\n');

  // Blobを作成
  const blob = new Blob([hashtagsText], { type: 'text/plain' });

  // ファイルダウンロード用のリンクを作成
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'collectedHashtags.txt';

  // リンクをクリックしてダウンロードを開始
  link.click();

  alert('ハッシュタグをファイルに保存しました。');
})();
