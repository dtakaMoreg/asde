javascript:(function() {
  //var formattedDateTime = new Date().toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  //var allButtons = document.getElementsByTagName('button');
  //var shop = allButtons[1].innerText;
  //var comments = document.querySelectorAll('div[class*="social-text-area"]');
  //var cmt = comments[0].innerHTML.replace(/"/g, "'");;
  //var urlelements = document.querySelectorAll('a[class*="link--"]');
  //var rakuten_Url = urlelements[15].href;
  //var currentURL = window.location.href;
  //var matome = formattedDateTime + "\t\t\t" + shop + "\t\t\t\"" + cmt + "\"\t\t\t" + rakuten_Url + "\t" + currentURL;
  
  
  var urlelements = document.querySelectorAll('a[class*="link--"]');

  var filteredElements = Array.from(urlelements).filter(function(element) {
      return element.getAttribute('href') && element.getAttribute('href').startsWith('https://hb.afl');
  });

  

  setTimeout(() => navigator.clipboard.writeText(filteredElements[0].href), 1000);
})();
