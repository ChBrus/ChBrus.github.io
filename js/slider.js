const targets = document.querySelectorAll('.target'),
      last = document.getElementById('last'),
      next = document.getElementById('next'),
      max = (targets.length - 1);
let index = 0;
let isButtonClicked = false;

function targetToShow() {
    isButtonClicked = true;
    targets.forEach((tag, i) => {
        let seconds = 10, s = 0, o = 0;
        if(i > index || i < index) {
            tag.style.display = "none";
            tag.style.opacity = 0;
        } else if(i == index) {
            tag.style.display = "block";
            let delay = setInterval(() => {
                tag.style.opacity = o;
                o += 0.1;
                
                if(s == seconds) {
                    isButtonClicked = false;
                    clearInterval(delay);
                }

                s++;
            }, 100);
        }
    });
}

last.addEventListener('click', () => {
    if(isButtonClicked) {
        return;
    }

    index -= (index == 0 ? 0 : 1);
    targetToShow();
});

next.addEventListener('click', () => {
    if(isButtonClicked) {
        return;
    }

    index += (index == max ? 0 : 1);
    targetToShow();
});

document.addEventListener('keyup', (key) => {
    if(isButtonClicked) {
        return;
    } else if(key.key === "ArrowRight") {
        index += (index === max ? 0 : 1);
    } else if(key.key === "ArrowLeft") {
        index -= (index === 0 ? 0 : 1);
    } else {
        return;
    }

    targetToShow();
});

targetToShow();