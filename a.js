javascript:(function() {
  const allText = document.body.innerText;
  const hashtagMatches = allText.match(/#\w+/g);
  const uniqueHashtags = [...new Set(hashtagMatches)];
  localStorage.setItem('collectedHashtags', JSON.stringify(uniqueHashtags));
  alert('ハッシュタグを収集し、Local Storageに格納しました。');
})();
