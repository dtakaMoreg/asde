(function() {
    let linkTexts = [];
    let tmplst = [];
    let cnt = 0;
    let fileName = "";
    let scroll_count = 0;
    let collectedURLs = [];
    let linkcount = 0;

    // スクロール対象の要素を取得
    const userList = document.querySelector('.body.list.notice.ng-isolate-scope');
    if (!userList) {
        console.log("スクロール対象の要素が見つかりません。");
        return;
    }
    
    // スクロール関数
    const scrollToBottom = () => {
        userList.scrollTop += 1000;
        userList.dispatchEvent(new Event('scroll'));
    };

    const dispHidden = (userList) => {
        const elements = userList.querySelectorAll('div[class*="spacer"]');
        elements.forEach(el => el.style.display = 'none');
    };

    // `counthref` を最初に定義
    function counthref() {
        const links = document.querySelectorAll('dl a[ng-href]');
        let count = 0;
    
        for (const link of links) {
            const hreft = link.getAttribute("href");
            if (hreft && hreft.includes("/items")) {
                count++;
            }
        }
    
        return count;
    };

    const scrollInterval = setInterval(() => {
        const prevHeight = userList.scrollTop;
        scrollToBottom();
        dispHidden(userList);
        const links = counthref();
        
        if (linkcount >= links) {
            if (scroll_count > 100) {
                clearInterval(scrollInterval);
                getRoomDelLink();
            } else {
                scroll_count++;
            }
        } else {
            scroll_count = 0;
            linkcount = links;
        }
        
        document.title = `${linkcount}/${scroll_count}`;
    }, 500);

    const getRoomDelLink = () => {
        const dlElements = document.querySelectorAll('dl');

        dlElements.forEach(dl => {
            const aElement = dl.querySelector('a[ng-href]');
            const ngHrefValue = aElement ? aElement.getAttribute('ng-href') : "";
            const starIconImg = dl.querySelector('img.star-icon');
            const starIconSrc = starIconImg ? starIconImg.getAttribute('src') : "";
            const starIconFilename = starIconSrc ? starIconSrc.split('/').pop() : "";
            
            collectedURLs.push(`${starIconFilename}\thttps://room.rakuten.co.jp${ngHrefValue}`);
        });

        startDownload();
    };

    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    fileName = `removelist_${formattedDate}`;
    
    const startDownload = () => {
        if (collectedURLs.length > 0) {
            const textData = collectedURLs.join('\n');
            const blob = new Blob([textData], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.txt`;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();

            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            alert(`追加で作成するリストはありません。 collectedURLs[${collectedURLs.length}]`);
        }
    };
})();
