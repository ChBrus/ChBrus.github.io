const targets = document.querySelectorAll('.target'),
      last = document.getElementById('last'),
      next = document.getElementById('next'),
      max = 1;
let index = 0;
let isButtonClicked = false;

function targetToShow() {
    if(isButtonClicked) {
        return;
    }

    isButtonClicked = true;
    targets.forEach((tag, i) => {
        let seconds = 20, s = 0, o = 0;
        if(i > index || i < index) {
            tag.style.display = "none";
            tag.style.opacity = 0;
        } else if(i == index) {
            tag.style.display = "block";
            let delay = setInterval(() => {
                tag.style.opacity = o;
                o += 0.05;
                
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
    index -= (index == 0 ? 0 : 1);
    targetToShow();
});

next.addEventListener('click', () => {
    index += (index == max ? 0 : 1);
    targetToShow();
});

document.addEventListener('keyup', (key) => {
    if(key.key === "ArrowRight") {
        index += (index === max ? 0 : 1);
    } else if(key.key === "ArrowLeft") {
        index -= (index === 0 ? 0 : 1);
    }

    targetToShow();
});