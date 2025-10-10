const el = document.querySelector("#text");
const nodes = Array.from(el.childNodes);
el.innerHTML = "";

let currentNodeIndex = 0;
let curentChatIndex = 0;

function typing() {
    if (currentNodeIndex < nodes.length) {
        let node = nodes[currentNodeIndex]

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (curentChatIndex < text.length) {
                el.append(text.charAt(curentChatIndex));
                curentChatIndex++
            } else {
                currentNodeIndex++
                curentChatIndex = 0
            }
        } else {
            el.append(node.cloneNode(true));
            currentNodeIndex++
        }
        setTimeout(typing, 150)
    }
}

// form 
const singUp = document.getElementById("SignUp")
const overlayUp = document.getElementById("overlayUp")
const closeBTN = document.getElementById("closeBTN")
const signIn = document.getElementById("link");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn")
const body = document.querySelector(".container")
function SingIn() {
    signIn.addEventListener(`click`, () => {
        overlay.classList.add(`active`);
        body.classList.add(`block`)
    });
    closeBtn.addEventListener(`click`, () => {
        overlay.classList.remove(`active`);
        body.classList.remove(`block`)
    });
    singUp.addEventListener(`click`, () => {
        overlayUp.classList.add(`active`);
        body.classList.add(`block`)
    });
    closeBTN.addEventListener(`click`, () => {
        overlayUp.classList.remove(`active`);
        body.classList.remove(`block`)
    });
}


// carusel btn=================================================================

const left = document.getElementById("leftBtn");
const right = document.getElementById("rightBtn");
const carbox = document.getElementById("car-populars");

let busy = false // blocklash
// orasidagi masofa
function gapPX() {
    const s = getComputedStyle(carbox); // barcha stilarni yigib oladi
    return parseInt(s.gap)  // gapni satrdan raqamga ogiradi
}

// kenglik qancha surilishi topish yoli
function stepDistance() {
    const first = carbox.querySelector(`.car`);
    return first.offsetWidth + gapPX(); //kenglik + gap =yigindi
}

// ong va chap button bosilganda
function lock(v) {
    busy = v;
    [left, right].forEach(b => b.classList.toggle(`is-busy`, v))
}


function Btn() {
    right.addEventListener(`click`, () => {
        if (busy) return;
        lock(true);

        const dist = stepDistance();

        carbox.style.transition = `transform .35s ease`;
        carbox.style.transform = `translateX(${dist}px)`;

        const onEnd = () => {
            carbox.removeEventListener(`transitionend`, onEnd);
            carbox.style.transition = `none`;
            carbox.style.transform = `none`;

            // const first = carbox.querySelector(`.car`);
            // carbox.appendChild(first);
            const car = carbox.querySelectorAll(`.car`);
            carbox.insertBefore(car[car.length - 1], car[0])


            // void carbox.offsetWidth; //majburiy olachamiz
            lock(false);
        }
        carbox.addEventListener(`transitionend`, onEnd, { once: true });
    });
    left.addEventListener(`click`, () => {
        if (busy) return;
        lock(true);

        const dist = stepDistance();

        carbox.style.transition = `transform .35s ease`;
        carbox.style.transform = `translateX(-${dist}px)`;

        const onEnd = () => {
            carbox.removeEventListener(`transitionend`, onEnd);
            carbox.style.transition = `none`;
            carbox.style.transform = `none`;

            // const first = carbox.querySelector(`.car`);
            // carbox.appendChild(first);
          const car = carbox.querySelectorAll(`.car`);
        carbox.appendChild(car[0]);


            // void carbox.offsetWidth; //majburiy olachamiz
            lock(false);
        }
        carbox.addEventListener(`transitionend`, onEnd, { once: true });

       
        // birinchi elmet
    })
}


// burger
const burger = document.getElementById(`burger`);
const burgernav = document.getElementById(`burger-nav`);
const closeBurger = document.getElementById(`closeBurger`)
function BtnBurger(){
    burger.addEventListener(`click`, ()=>{
        burgernav.classList.add(`activ`)
    })
    closeBurger.addEventListener(`click`, () =>{
        burgernav.classList.remove(`activ`)
    } )
}

BtnBurger()
Btn()
SingIn();
typing();

