javascript:(function() {
    fetch('https://script.google.com/macros/s/AKfycbzciqT1k6APLwObkuxOjRmPdBD5FbT7iCfFS3xS9qJXZgTmpC-Uc5Zl_IpfMM49Qcph/exec?type=normal&mode=all')
    .then(response => response.json())
    .then(data => {
        // URLとroomURLを別のウィンドウで開く
        window.open(data.url, '_blank');
        window.open(data.roomurl, '_blank');
        
        // commentをクリップボードにコピー
        navigator.clipboard.writeText(data.comment).then(function() {
            alert('Comment copied to clipboard: ' + data.comment);
        }, function(err) {
            alert('Failed to copy comment: ' + err);
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });
})();
