document.querySelector('#burger-menu__open').addEventListener('click', () => {
    document.querySelector(".burger").style.display = 'block';

    document.querySelectorAll(".burger-menu").forEach((item) => {
        if (item.classList.contains("burger-menu-close")) {
            item.classList.replace("burger-menu-close", "burger-menu-open");
        }
        else {
            item.classList.add("burger-menu-open");
        }
    });

    document.querySelector(".fixed-overlay-burger").style.display = 'block';
    
    if (document.querySelector(".fixed-overlay-burger").classList.contains("overlay_not-active")) {
        document.querySelector(".fixed-overlay-burger").classList.replace("overlay_not-active", "overlay_active");
    }
    else {
        document.querySelector(".fixed-overlay-burger").classList.add("overlay_active");
    }

    document.querySelector(".burger").classList.replace("burger-panel-menu-close", "burger-panel-menu-open");
    document.documentElement.classList.add('hidden-scroll');
});

document.querySelector('#burger-menu__close').addEventListener('click', () => {
    closePanel();
});

document.querySelector('.fixed-overlay-burger').addEventListener('click', () => {
    closePanel();
});

function closePanel() {
    document.querySelectorAll(".burger-menu").forEach((item) => item.classList.replace("burger-menu-open", "burger-menu-close"));
    document.querySelector(".fixed-overlay-burger").classList.replace("overlay_active", "overlay_not-active");
    document.querySelector(".burger").classList.replace("burger-panel-menu-open", "burger-panel-menu-close");

    document.querySelector(".burger").addEventListener('animationend', () => {
        if (document.querySelector(".fixed-overlay-burger").classList.contains("overlay_not-active") || document.querySelector(".burger-menu").classList.contains("burger-menu-close") || document.querySelector(".burger").classList.contains("burger-panel-menu-close")) {
            document.querySelector(".burger").style.display = 'none';
            document.querySelector(".fixed-overlay-burger").style.display = 'none';
            console.log("test");
        }
    });

    document.documentElement.classList.remove('hidden-scroll');
}

document.querySelectorAll('.slider__item.about-pets-modal').forEach((item) => item.addEventListener('click', () => { 
    createModal(item.id);
    document.querySelector(".fixed-overlay").style.display = 'block';
    if (document.querySelector(".fixed-overlay").classList.contains("overlay_not-active")) {
        document.querySelector(".fixed-overlay").classList.replace("overlay_not-active", "overlay_active");
    }
    else {
        document.querySelector(".fixed-overlay").classList.add("overlay_active");
    }

    document.documentElement.classList.add('hidden-scroll');
}));

document.querySelector('#close-modal').addEventListener('click', () => {
    closeModal();
});
document.querySelector('.fixed-overlay').addEventListener('click', () => {
    closeModal();
});

document.querySelector('.fixed-overlay').addEventListener('mouseenter', () => {
    document.querySelector('#close-modal').style.background = "#FDDCC4";
});

document.querySelector('#modal-place').addEventListener('mouseover', () => {
    document.querySelector('#close-modal').style.background = "none";
});
document.querySelector('#close-modal').addEventListener('mouseover', () => {
    document.querySelector('#close-modal').style.background = "#FDDCC4";
});

function closeModal() {
    document.querySelector(".fixed-overlay").classList.replace("overlay_active", "overlay_not-active");

    document.querySelector(".fixed-overlay").addEventListener('animationend', () => {
        if (document.querySelector(".fixed-overlay").classList.contains("overlay_not-active")) {
            document.querySelector(".fixed-overlay").style.display = 'none';
        }
    });

    document.documentElement.classList.remove('hidden-scroll');
}

function createModal(petsName) {
    let pets = [];
    const elem = document.querySelector('#modal-place');

    const request = new XMLHttpRequest();
    request.open('GET', "../../assets/pets.json");
    
    request.onload = () => {
       pets = JSON.parse(request.response);

       pets.forEach((item) => {
           for (let value in item) {
                if (item[value] === petsName) {
                    elem.innerHTML = createElementModal(item);
                }
           }
       });
    }

    request.send();
}

const createElementModal = (pet) => {
    let str = '';

    str += `<div class="modal-window__img">`;
    str += `<img src="${pet.img}" width="100%" height="100%" alt="modal img">`;
    str += `</div>`;
    str += `<div class="modal-window__text">`;
    str +=  `<h3 class="modal__title">${pet.name}</h3>`;
    str += `<p class="modal__subtitle">${pet.breed}</p>`;
    str += `<p class="modal__description">${pet.description}</p>`;
    str += `<ul class="modal__specifications">`;
    str += `<li><span class="specifications__item"><span class="specific-key">Age: </span>${pet.age}</span></li>`;
    str += `<li><span class="specifications__item"><span class="specific-key">Inoculations: </span>${pet.inoculations}</span></li>`;
    str += `<li><span class="specifications__item"><span class="specific-key">Diseases: </span>${pet.diseases}</span></li>`;
    str += `<li><span class="specifications__item"><span class="specific-key">Parasites: </span>${pet.parasites}</span></li></ul></div>`;

    return str;
}