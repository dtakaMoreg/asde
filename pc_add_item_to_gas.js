javascript:(function() {
  var currentUrl = window.location.href;
  var encodedUrl = encodeURIComponent(currentUrl);
  var newUrl = "https://script.google.com/macros/s/AKfycbwvdDMb_CRqYYAuTSniTRhcA5JywH55rCrQX5-yBlPnvety2ePk1LMGVnEBGOAXZUEhjQ/exec?mode=" + encodedUrl;

  // 新しいウィンドウまたはタブを開く
  window.open(newUrl, "_blank");
})();