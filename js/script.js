const section = document.querySelectorAll('section article');

section.forEach((tag) => {
    if(tag.id != 'recipe') {
        tag.style.display = "none";
    }
});

function changeArticle(tag, isNext) {
    let parent = tag.parentNode.parentNode;
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