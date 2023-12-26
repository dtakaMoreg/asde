javascript:(function() {

    // localStorageからfavoriteIndexを取得
    let favoriteIndexString = localStorage.getItem('favoriteIndex');

    // favoriteIndexが存在しない、または値がnull/undefinedの場合、0を設定
    let favoriteIndex = favoriteIndexString ? parseInt(favoriteIndexString, 10) : 0;

    // "container" を含むクラス名を持つ全ての div 要素を取得
    let containerElements = document.querySelectorAll('img[class*="image"]');

    // 位置を特定
    // indexは0から
    // 
    let index = Math.floor(favoriteIndex / 2);
    let offset = 0;
    
    if (favoriteIndex % 2 === 0){
        offset = 2;
    }else{
        offset = Math.floor((containerElements.length - 2) / 2) + 2;
    }
    
    let num = offset + index;
    
    // 要素が存在する場合
    if (containerElements.length >= (num + 1)) {
        let fourteenthContainerElement = containerElements[num];

        // ブラウザのボトムまでスクロール
        fourteenthContainerElement.scrollIntoView({
            behavior: 'smooth', // スムーズなスクロールを有効にする場合
            block: 'center',       // 要素のボトムに配置
            inline: 'start'     // 要素の左端に配置
        });

        // localStorageのfavoriteIndexを更新
        localStorage.setItem('favoriteIndex', favoriteIndex + 1);
    } else {
        alert('Element not found at index:', num);
    }
})();
