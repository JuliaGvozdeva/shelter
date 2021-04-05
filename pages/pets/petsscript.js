let pets = [];
let fullPetsList = [];  //48

const request = new XMLHttpRequest();
request.open('GET', "../../assets/pets.json");

request.onload = () => {
   pets = JSON.parse(request.response);

   console.log(pets);

   fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i++) {
        const newPets = pets;

        for (let j = pets.length; j > 0; j--) {
            let randInd = Math.floor(Math.random() * j);
            const randElem = newPets.splice(randInd, 1)[0];
            newPets.push(randElem);
        }

        tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
   })();

   fullPetsList = sort863(fullPetsList);

   createPets(fullPetsList);

   for (let i = 0; i < fullPetsList.length / 6; i++) {
        const stepList = fullPetsList.slice(i*6, (i*6)+6);

        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if (item.name === stepList[j].name && (ind !== j)) {
                    document.querySelector("#pets").children[(i*6)+j].style.border = "5px solid #f5f5f5";
                }
            });
        }
    }
}

const createPets = (petsList) => {
    const elem = document.querySelector('#pets');
    elem.innerHTML = createElements(petsList);
}

const createElements = (petsList) => {
    let str = '';

    for (let i = 0; i < petsList.length; i++) {
        str += `<div id="${ petsList[i].name }" class="slider__item about-pets-modal">`;
        str += `<div class="slider__img">`;
        str += `<img src="${ petsList[i].img }">`;
        str += `</div>`;
        str += `<div class="slider__title">${ petsList[i].name }</div>`
        str += `<button class="slider__button">Learn more</button>`;
        str += `</div>`;
    }

    return str;
}

request.send();

const sort863 = (list) => {
    let length = list.length;
    for (let i = 0; i < length/6; i++) {
        const stepList = list.slice(i*6, (i*6)+6);

        for (let j = 0; j < 6; j++) {
            const duplicatedElement = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });
            
            if (duplicatedElement !== undefined) {
                const ind = (i*6)+j;
                const which8OfList = Math.trunc(ind / 8);
                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);
                i-=2;
                break;
            }
        }
    }

    return list;
}
