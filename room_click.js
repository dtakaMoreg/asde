javascript:(function() {
 // クラス名に "share-link" を含む要素を取得
 var elementsWithShareLinkClass = document.querySelectorAll('[class*="share-link"]');

// 要素が存在するか確認
if (elementsWithShareLinkClass.length > 0) {
  // 最初の要素をクリック（適宜変更可能）
  elementsWithShareLinkClass[0].click();
} 
})();
