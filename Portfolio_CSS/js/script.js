// console.log(window.pageXOffset);

// let q  = () => console.log(window.pageYOffset);
// setTimeout(q, 1000);


// window.scrollBy(0, 920);
// console.log(window.pageYOffset);


// изменение состояния кнопки для смены новостей (блок 'news)
function changeImg(btn, item1, item2) {
	btn.onclick = function () {
		item1.classList.toggle('display-none');
		item2.classList.toggle('display-none');
		btn.classList.toggle('btn-color-active');
		btn.classList.toggle('btn-color-passive');
		console.log('btn:', btn);
	}
	setTimeout(changeImg, 20000, btn, item1, item2);
}

let btn = document.querySelector('.but-change');
let worldCupItem = document.querySelector('.world-cup');
let filmItem = document.querySelector('.film');

setTimeout(changeImg, 2000, btn, worldCupItem, filmItem);



// изменение состояния бургера и выплывающего меню
function chngBurgerState() {
	
	burger.classList.toggle('menu__burger-active');
	menu__row.classList.toggle('menu__row-active');
	header.classList.toggle('header-active');
	console.log('from func 1:', burger);
}

let burger = document.querySelector('.menu__burger');
let menu__row = document.querySelector('.menu__row');
let header = document.querySelector('.header');
console.log('burger:', burger);
console.log('menu__row:', menu__row);
console.log('header:', header);
burger.addEventListener('click', chngBurgerState);
// // setTimeout(chngBurgerState, 2000, burger);
console.log('burger:', burger);
// console.log(burger.style.before);




header.active
// console.log('worldCupItem:', worldCupItem.classList.contains('item-hidden'));
// console.log('filmItem:',  filmItem.classList.contains('item-hidden'));
// worldCupItem.classList.toggle('item-hidden');
// filmItem.classList.toggle('item-hidden');
// console.log('worldCupItem:', worldCupItem.classList.contains('item-hidden'));
// console.log('filmItem:', filmItem.classList.contains('item-hidden'));
// worldCupItem.classList.toggle('item-hidden');
// filmItem.classList.toggle('item-hidden');
// console.log('worldCupItem:', worldCupItem.classList.contains('item-hidden'));
// console.log('filmItem:', filmItem.classList.contains('item-hidden'));

// btn.addEventListener('click', changeImg.bind(null, btn, worldCupItem, filmItem, true));

let elem = document.querySelector('.foot__title');
console.log(elem);

console.log(elem.classList);
// console.log(elem.textalign);


// console.log(worldCupItem);
// console.log(btn);
// console.log(filmItem);
