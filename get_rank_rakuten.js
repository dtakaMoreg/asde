

// 指定したIDの要素を取得します
let userList = document.getElementById('userList') || document.getElementById('ng-app');

// スクロール関数
const scrollToBottom = () => {
  userList.scrollTop = userList.scrollHeight;
};

// スクロールが終了するまでスクロールを続けます
let scroll_count = 0;
const scrollInterval = setInterval(() => {
  const prevHeight = userList.scrollTop;
  scrollToBottom();
  
  if (prevHeight === userList.scrollTop) {
    if (scroll_count > 10) {
      clearInterval(scrollInterval);
      // スクロールが終了したらリンク要素を取得します
      getRoomLink();
    } else {
      scroll_count++;
    }
  } else {
    scroll_count = 0;
  }
}, 1000); // 1秒ごとにスクロール

//要素を取得する
function getRoomLink(){
    // imgLinkクラスを持つ要素を取得し、alt属性の値を取得する
    const altValues = Array.from(document.querySelectorAll('.imgLink .image'))
    .map(image => image.getAttribute('alt'))
    .filter(alt => alt); // nullまたはundefinedでないalt属性のみフィルタリング

    // alt属性の値をテキストファイルに保存
    const textToSave = altValues.join('\n');
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const fileName = 'alt_values.txt';
    const link = document.createElement('a');

    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
}
