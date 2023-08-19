const targets = document.querySelectorAll('.target'),
      last = document.getElementById('last'),
      next = document.getElementById('next'),
      maximo = (targets.length - 1);
let index = 0;
let isButtonClicked = false;

function targetToShow() {
    isButtonClicked = true;
    targets.forEach((tag, i) => {
        let seconds = 10, s = 0, o = 0;
        if(i > index || i < index) {
            tag.style.display = "none";
            tag.style.opacity = 0;
            tag.removeAttribute('waitAnimations');
        } else if(i === index) {
            tag.style.display = "";
            let delay = setInterval(() => {
                tag.style.opacity = o;
                o += 0.1;
                
                if(s === seconds) {
                    isButtonClicked = false;
                    tag.setAttribute('waitAnimations', true);
                    clearInterval(delay);
                }
                
                s++;
            }, 50);
        }
    });
}

last.addEventListener('click', () => changeTargetEvent(last));

next.addEventListener('click', () => changeTargetEvent(next));

function changeTargetEvent(component) {
    if (isButtonClicked) {
        return;
    } else if(component.id === 'last' && index === 0) {
        return;
    } else if (component.id === 'next' && index === maximo) {
        return;
    }

    index = (component.id === 'next' ? index + 1 : index - 1);
    targetToShow();
    component.blur();
}

document.addEventListener('keyup', (key) => {
    if(isButtonClicked) {
        return;
    } else if(key.key === "ArrowRight") {
        index += (index === maximo ? 0 : 1);
    } else if(key.key === "ArrowLeft") {
        index -= (index === 0 ? 0 : 1);
    } else {
        return;
    }

    targetToShow();
});

targetToShow();