javascript:(function(){
  var elements = document.querySelectorAll('[class^="social-text-area"]');
  if (elements.length > 0) {
    var textToCopy = elements[0].textContent || elements[0].innerText;
    
    var pageUrl = window.location.href;

    // Find A elements with class name starting with 'link--'
    var linkElements = document.querySelectorAll('a[class^="link--"]');
    
    // Extract and decode URLs from qualifying A elements
    var linkElementUrls = Array.from(linkElements).map(function(linkElement) {
      return linkElement.href;
    });

    // Combine text, page URL, and qualifying A element URLs
    var combinedText = 'ページURL@@@' + pageUrl + '\nテキスト@@@"' + textToCopy + '"\nA要素URL@@@' + linkElementUrls.join('\n');

    // Retrieve the existing dictionary from localStorage
    var storedData = JSON.parse(localStorage.getItem('copiedData')) || {};

    // Add the current page's data to the dictionary
    storedData[pageUrl] = combinedText;

    // Save the updated dictionary back to localStorage
    localStorage.setItem('copiedData', JSON.stringify(storedData));

    //alert('テキストとデコードされたURLがlocalStorageに保存されました:\n' + combinedText);
  } else {
    alert('対象の要素が見つかりませんでした');
  }
})();
