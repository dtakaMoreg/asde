javascript:(function() {
    setTimeout(function() {
        let favoriteIndexString = localStorage.getItem('favoriteIndex');
        let favoriteIndex = favoriteIndexString ? parseInt(favoriteIndexString, 10) : 0;
        let containerElements = document.querySelectorAll('img[class*="image"]');
        let index = Math.floor(favoriteIndex / 2);
        let offset = 0;

        if (favoriteIndex % 2 === 0) {
            offset = 2;
        } else {
            offset = Math.floor((containerElements.length - 2) / 2) + 2;
        }

        let num = offset + index;

        if (containerElements.length >= (num + 1)) {
            let fourteenthContainerElement = containerElements[num];

            fourteenthContainerElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'start'
            });

            localStorage.setItem('favoriteIndex', favoriteIndex + 1);
        } else {
            alert('Element not found at index:', num);
        }
    }, 3000);
})();
