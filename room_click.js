// クラス名が "bookmark-share-icon" の<a>タグを取得
var bookmarkShareIconLink = document.querySelector('a[class*="bookmark-share-icon"]');
if(bookmarkShareIconLink === null) {
    bookmarkShareIconLink = document.querySelector('.item-share-button-widget.item-share-button-widget-room');
}

// 要素が存在するか確認
if (bookmarkShareIconLink) {
  // <a>タグをクリック
  bookmarkShareIconLink.click();

  // 2秒待機
  setTimeout(function() {
    // クラス名が "susumeruRoomIcon" の要素を取得
    var susumeruRoomIcon = document.querySelector('[class*="share-link"]');

    // 要素が存在するか確認
    if (susumeruRoomIcon) {
      // 要素をクリック
      susumeruRoomIcon.click();
    } else {
      console.log('susumeruRoomIconの要素が見つかりません');
    }
  }, 2000); // 2秒待機
} else {
  console.log('bookmark-share-iconの<a>タグが見つかりません');
}
