javascript:(function(){
    fetch('https://script.google.com/macros/s/AKfycbzciqT1k6APLwObkuxOjRmPdBD5FbT7iCfFS3xS9qJXZgTmpC-Uc5Zl_IpfMM49Qcph/exec?type=normal&mode=all')
    .then(response => response.json())
    .then(data => {
        // URLとroomURL用のリンクを作成
        var a1 = document.createElement('a');
        var a2 = document.createElement('a');
        
        a1.href = data.url;
        a1.target = '_blank';
        a1.innerText = 'Open URL';
        
        a2.href = data.roomurl;
        a2.target = '_blank';
        a2.innerText = 'Open Room URL';
        
        // リンクをページに追加して自動クリック
        document.body.appendChild(a1);
        document.body.appendChild(a2);
        
        a1.click();
        a2.click();
        
        // commentをクリップボードにコピー
        navigator.clipboard.writeText(data.comment).then(() => {
            alert('Comment copied to clipboard: ' + data.comment);
        }, err => {
            alert('Failed to copy comment: ' + err);
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });
})();
