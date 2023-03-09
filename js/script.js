const section = document.querySelectorAll('section article');
const arrows = {
    "ArrowRight": 39,
    "ArrowLeft": 37
};
let isKeyDowned = false;
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
                // console.log(section[i]);
                return next ? i + 1 : i - 1;
            }
        }
    };

    let animation1 = setInterval(() => {
        if(i >= 10) {
            parent.style.display = "none";
            section[articleToShow(isNext)].style.display = "block";
            section[articleToShow(isNext)].style.opacity = 1;
            isKeyDowned = false;
            clearInterval(animation1);
        } else {
            parent.style.opacity = opacity;
            opacity -= 0.1;
            i++; 
        }
    }, 50);
}

function changingArticleByKeys(event) {
    if(isKeyDowned) {
        return;
    }

    let keyDown = arrows[event.key];
    
    switch(keyDown) {
        case arrows.ArrowRight:
            section.forEach((tagElement) => {
                if(tagElement.style.display != "none" && tagElement.id != "result") {
                    isKeyDowned = true;
                    changeArticle(tagElement, true, true);
                }
            });
        break;
        case arrows.ArrowLeft:
            section.forEach((tagElement) => {
                if(tagElement.style.display != "none" && tagElement.id != "recipe") {
                    isKeyDowned = true;
                    changeArticle(tagElement, false, true);
                }
            });
        break;
    }
}