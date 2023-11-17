javascript:(function() {
  const allText = document.body.innerText;

  // 日本語のハッシュタグを含む正規表現
  const hashtagMatches = allText.match(/#[^\s#]+/g);

  if (!hashtagMatches) {
    alert('ハッシュタグが見つかりませんでした。');
    return;
  }

  // 重複を排除してユニークなハッシュタグを収集
  const uniqueHashtags = [...new Set(hashtagMatches)];

  // Local Storageに格納
  localStorage.setItem('collectedHashtags', JSON.stringify(uniqueHashtags));

  alert('ハッシュタグを収集し、Local Storageに格納しました。');
})();
