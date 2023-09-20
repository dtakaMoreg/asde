javascript:(function() {
    var links = document.getElementsByTagName('a');
    var linkTexts = [];
    var tmplst = [];
    var cnt=0;

    for (var i = 0; i < links.length; i++) {
        hreft=links[i].getAttribute("href");
        if (hreft != null && hreft.length > 7 && hreft.includes("/items")) {
            tmplst.push('https://room.rakuten.co.jp' + hreft);
        }
    }

    tmplst = Array.from(new Set(tmplst));

    linkTexts.push('<html lang="ja">');
    for (var i = 0; i < tmplst.length; i++) {
        linkTexts.push('<a href="' + tmplst[i] + '">User_' + (i+1) + '</a></br>');
    }
    linkTexts.push('</html>');
    var textData = linkTexts.join('\n');
    var blob = new Blob([textData], { type: 'text/html' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'link_text.html';
    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    window.addEventListener('focus', function() {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });
})();
