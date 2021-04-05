let items = document.querySelectorAll(".about-pets-modal");
let curentItem = 0;
let isEnable = true;

function changeCurrentItem(n) {
    curentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnable = false;
    items[curentItem].classList.add(direction);
    items[curentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    isEnable = false;
    items[curentItem].classList.add('next', direction);
    items[curentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnable = true;
    });
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n-1);
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n-1);
}

document.querySelector('.left').addEventListener('click', function() {
    if (isEnable) {
        previousItem(curentItem);
    }
});

document.querySelector('.right').addEventListener('click', function() {
    if (isEnable) {
        nextItem(curentItem);
    }
});
