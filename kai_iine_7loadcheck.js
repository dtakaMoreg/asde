setTimeout(function() {
    navigator.clipboard.writeText("");

    if (document.readyState === 'complete') {
        navigator.clipboard.writeText("OK");
        alert("OK");
    } else {
        navigator.clipboard.writeText("NG");
        alert("NG");
    }
}, 500);
