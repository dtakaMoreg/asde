javascript:(function(){
  // Retrieve the data from localStorage
  var storedData = localStorage.getItem('copiedData');

  // Check if there is any data to save
  if (storedData) {
    // Parse the JSON string into an object
    var dataObject = JSON.parse(storedData);

    // Convert the object into an array of strings (one for each page)
    var dataArray = Object.keys(dataObject).map(function(pageUrl) {
      return dataObject[pageUrl];
    });

    // Add newlines between each page's data
    var dataWithNewlines = dataArray.join('\r\n\r\n');

    // Create a Blob containing the data
    var blob = new Blob([dataWithNewlines], { type: 'text/plain;charset=utf-8' });

    // Create a temporary anchor element to trigger the download
    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'copiedData.txt';

    // Trigger the click event to start the download
    downloadLink.click();
  } else {
    alert('保存されたデータがありません');
  }
})();
