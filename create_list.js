javascript:(function() {
  var links = document.getElementsByTagName('a');
  var linkTexts = [];
  var cnt=0;
  for (var i = 0; i < links.length; i++) {
    hreft=links[i].getAttribute("href");
    if (hreft != null && hreft.includes("/items")) {
        cnt++;
	    linkTexts.push('<a href="https://room.rakuten.co.jp' + hreft + '">User_' + cnt + "</a></br>" );
	}
  }

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
