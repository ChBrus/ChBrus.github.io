const section = document.querySelectorAll('section article');
const arrows = {
    "ArrowRight": 39,
    "ArrowLeft": 37
};
document.addEventListener('keydown', changingArticleByKeys);

section.forEach((tag) => {
    if(tag.id != 'recipe') {
        tag.style.display = "none";
    }
});

function changeArticle(tag, isNext, isKey) {
    let parent = isKey ? tag : tag.parentNode.parentNode;
    let i = 0;
    let opacity = 1;
    
    let articleToShow = (next) => {
        for (let i = 0; i < section.length; i++) {
            if(section[i].id == parent.id) {
                return next ? i + 1 : i - 1;
            }
        }
    };

    let animation1 = setInterval(() => {
        if(i >= 10) {
            parent.style.display = "none";
            section[articleToShow(isNext)].style.display = "block";
            section[articleToShow(isNext)].style.opacity = 1;
            clearInterval(animation1);
        } else {
            parent.style.opacity = opacity;
            opacity -= 0.1;
            i++; 
        }
    }, 50);
}

function changingArticleByKeys(event) {
    let keyDown = arrows[event.key];
    
    switch(keyDown) {
        case 39:
            section.forEach((tagElement) => {
                if(tagElement.style.display != "none") {
                    changeArticle(tagElement, true, true);
                }
            });
        break;
        case 37:
            section.forEach((tagElement) => {
                if(tagElement.style.display != "none") {
                    changeArticle(tagElement, false, true);
                }
            });
        break;
    }
}