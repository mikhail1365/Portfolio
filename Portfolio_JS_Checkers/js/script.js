
//Добавить возможность вернуться на ход назад
"use strict"

const document_body_innerHTML_INIT = document.body.innerHTML;

// console.log('document_body_innerHTML_INIT:', document_body_innerHTML_INIT);


function arange(N1, N2 = null) {
	let arr = [];
	let iStart, iEnd;
	if (N2 == null) {
		iStart = 0;
		iEnd = N1;
	}
	else {
		iStart = N1;
		iEnd = N2;
	}
	let i = iStart;
	do {
		arr.push(i);
		i++;
	} while (i < iEnd);

	return arr;
}

function setBoardPixels() {
	// Создаем доску с клетками, которым присваиваем "id"
	document.body.innerHTML = document_body_innerHTML_INIT;

	let pixelClassesMass = ["board__pixel_white", "board__pixel_black"];


	let collectionBoardColumnElements = document.querySelectorAll(".board__column");
	for (let j = 0; j < 8; j++) {
		// кладем в переменную "boardRawElement" последнюю пустую строку для клеток
		let lastBoardColumnElement = collectionBoardColumnElements[collectionBoardColumnElements.length - 1];

		let collectionBoardRawElements = document.querySelectorAll(".board__raw");
		const boardRawElement = collectionBoardRawElements[collectionBoardRawElements.length - 1];

		// Заполняем новую строку клетками
		for (let i = 0; i < 8; i++) {
			// console.log('j = ', j, 'i = ', i);
			let newPixel = document.createElement('div');
			if (i % 2 == 0) {
				newPixel.className = pixelClassesMass[j % 2];
				// pixelCope = pix_mass[j % 2].cloneNode();
			} else {
				newPixel.className = pixelClassesMass[1 - j % 2];
				// pixelCope = pix_mass[1 - j % 2].cloneNode();
			}
			newPixel.setAttribute("id", `${j}${i}`);

			// console.log(newPixel);

			boardRawElement.append(newPixel);
		}
		// Добавляем заполненную строку в конец
		lastBoardColumnElement.append(boardRawElement);

		// добавляем пустой контейнер для средующей строки клеток, если это не последняя строка
		if (j < 7) {
			let newBoardRawElement = document.createElement('div');
			newBoardRawElement.className = 'board__raw';
			lastBoardColumnElement.insertAdjacentElement('afterend', newBoardRawElement);
		}
	}
	return document.body.innerHTML;
}

function createWhiteChecker() {
	// Создаем белую пешку, которую будем клонировать в дальнейшем
	const whiteChecker = document.createElement('div');
	whiteChecker.className = 'board__check_white';
	const whiteCheckerRound = document.createElement('div');
	whiteCheckerRound.className = 'board__check_white__inner-round';
	whiteChecker.append(whiteCheckerRound);
	const whiteCheckerRound2 = document.createElement('div');
	whiteCheckerRound2.className = 'board__check_white__inner-round_2';
	whiteCheckerRound.append(whiteCheckerRound2);
	return whiteChecker;

}
function createBlackChecker() {
	// Создаем черную пешку, которую будем клонировать в дальнейшем
	const blackChecker = document.createElement('div');
	blackChecker.className = 'board__check_black';
	const blackCheckerRound = document.createElement('div');
	blackCheckerRound.className = 'board__check_black__inner-round';
	blackChecker.append(blackCheckerRound);
	return blackChecker;
}
function setStartPositionWhite(numOfStartLines, numOfStartCheckers, whiteChecker, par_1, par_2, downsideColor = 'black', expMode = false) {
	//  Расставляем белые шашки на места
	let arrWhiteCheckers = new Array();

	// for (let j of [1, 3]) {
	// for (let i of [2]) {


	//4 шашки вокруг
	// for (let j of [7 - 2]) {
	// 	for (let i of [7 - 3]) {


	// for (let j of [7]) {
	// 	for (let i of [2]) {
	// if ((i == j)&&( i== 0)) continue;

	// for (let j = 0; j < numOfStartLines; j++) {
	// 	for (let i = 0; i < numOfStartCheckers; i++) {



	let arrJ, arrI;
	if (expMode) {
		arrJ = [1, 2];
		arrI = [4, 3];
	} else {
		arrJ = arange(numOfStartLines);
		arrI = arange(numOfStartCheckers);
	}

	for (let j of arrJ) {
		for (let i of arrI) {
			if (j % 2 == 0) {
				if (i % 2 == par_1) {
					// console.log(j, i);
					let pixel;

					if (!expMode) {

						if (downsideColor == 'white') pixel = document.getElementById(`${7 - j}${7 - i}`);
						else if (downsideColor == 'black') pixel = document.getElementById(`${j}${i}`);
						else {
							console.log('Error in func setStartPositionBlack!');
							throw new Error();
						}
					} else pixel = document.getElementById(`${j}${i}`);



					let checker = whiteChecker.cloneNode(true);

					pixel.append(checker);
					arrWhiteCheckers.push(checker);
					// console.log(checker);

					// pixel.style.backgroundColor = 'red';
					// pixel.style.backgroundColor = 'rgba(216, 0, 0, 0.397)';
				}
			} else {

				if (i % 2 == par_2) {
					let pixel;

					if (!expMode) {
						if (downsideColor == 'white') pixel = document.getElementById(`${7 - j}${7 - i}`);
						else if (downsideColor == 'black') pixel = document.getElementById(`${j}${i}`);
						else {
							console.log('Error in func setStartPositionBlack!');
							throw new Error();
						}
					} else pixel = document.getElementById(`${j}${i}`);


					let checker = whiteChecker.cloneNode(true);
					// checker.onclick = function () { checker.style.background = 'red' };

					pixel.append(checker);
					arrWhiteCheckers.push(checker);


				}
			}

		}

	}
	// * console.log('in in ', arrWhiteCheckers);
	// console.log('in in ', arrWhiteCheckers);

	return arrWhiteCheckers;
}



function setStartPositionBlack(numOfStartLines, numOfStartCheckers, blackChecker, par_1, par_2, downsideColor = 'black', expMode = false) {
	// Расставляем черне шашки на места
	let arrBlackCheckers = new Array();



	// for (let j of [1, 6, 7 - 4]) {
	// 	for (let i of [1, 2, 7 - 3]) {

	//4 крестом
	// for (let j of [3, 1]) {
	// 	for (let i of [2, 4]) {

	// for (let j of [3, 1, 6]) {
	// for (let i of [2, 4, 3]) {

	// for (let j = 0; j < numOfStartLines; j++) {
	// 	for (let i = 0; i < numOfStartCheckers; i++) {
	let arrJ, arrI;
	if (expMode) {
		arrJ = [0];
		arrI = [5];
	} else {
		arrJ = arange(numOfStartLines);
		arrI = arange(numOfStartCheckers);
	}

	for (let j of arrJ) {
		for (let i of arrI) {

			// console.log(j, i);

			if (j % 2 == 0) {
				if (i % 2 == par_1) {
					let pixel;
					if (!expMode) {

						if (downsideColor == 'black') pixel = document.getElementById(`${7 - j}${7 - i}`);
						else if (downsideColor == 'white') pixel = document.getElementById(`${j}${i}`);
						else {
							console.log('Error in func setStartPositionBlack!');
							throw new Error();
						}
					} else pixel = document.getElementById(`${j}${i}`);


					let checker = blackChecker.cloneNode(true);
					pixel.append(checker);
					arrBlackCheckers.push(checker);
				}
			} else {
				if (i % 2 == par_2) {
					let pixel;
					if (!expMode) {
						if (downsideColor == 'black') pixel = document.getElementById(`${7 - j}${7 - i}`);
						else if (downsideColor == 'white') pixel = document.getElementById(`${j}${i}`);
						else {
							console.log('Error in func setStartPositionBlack!');
							throw new Error();
						}
					} else pixel = document.getElementById(`${7 - j}${7 - i}`);


					let checker = blackChecker.cloneNode(true);
					pixel.append(checker);
					arrBlackCheckers.push(checker);
				}
			}
		}
	}
	return arrBlackCheckers;
}





function unmarkPreviousPlayer(arrCheckers, arrWorkPixels, index, inactPixBordColor) {
	// 1. Снимаем пометки клеток для предыдущего игрока и отнимаем у него возможность ходить
	// 2. СНимаем соответствующие атрибуты клеток с предыдущего хода
	let previousMovePixels = document.querySelectorAll(`[data-index-color = "${arrIndexColor[1 - index]}"`);
	// console.log(previousMovePixels);

	for (let lastMovePixel of previousMovePixels) {
		// console.log('Это дамка', lastMovePixel.firstChild.hasAttribute('status'));

		lastMovePixel.removeAttribute("data-index-color");
		lastMovePixel.style.borderColor = inactPixBordColor;
	}

	for (let clickedElem of arrWorkPixels) {
		clickedElem.onclick = function () { ; };
	}

	for (let checker of arrCheckers) {
		checker.onclick = function () { ; };
	}
}

function markCurrentPlayer(blankPixel, overlookedPixel, index, actPixBordColor) {

	// 1. Помечаем элементы, соответствующий клеткам, в которую походил и из которой походил текущий игрок. 
	// 2. Добавляем этим клеткам соответствующий атрибут
	blankPixel.style.borderColor = actPixBordColor;
	blankPixel.setAttribute("data-index-color", arrIndexColor[index]);

	overlookedPixel.setAttribute("data-index-color", arrIndexColor[index]);
	overlookedPixel.style.borderColor = actPixBordColor;
}

function getFlagPossibilityToEat(arrCheckers, index) {
	// Проверка возможности съесть шашку. Если есть возможность, вернуть true

	// if (index == 1) console.log('hello, index = ', index, 'Это ход черных');
	// if (index == 0) console.log('hello, index = ', index, 'Это ход белых');

	for (let checker of arrCheckers) {
		// if (checker.hasAttribute('id')){
		let ID = checker.parentElement.getAttribute('id');
		// console.log(ID);
		let jOfPixel = +ID[0];
		let iOfPixel = +ID[1];
		for (let j of [-1, 1]) {
			for (let i of [-1, 1]) {
				//индексы рассматриваемого пикселя
				let newJ = jOfPixel + j;
				let newI = iOfPixel + i;

				//рассматриваем пиксели в пределах доски
				if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
					//проверка на наличие шашки в клетке (newJ, newI)
					// console.log('asd', document.getElementById(`${newJ}${newI}`));

					if (document.getElementById(`${newJ}${newI}`).hasChildNodes()) {
						//Проверка, что шашка на (newJ, newI) - другого цвета
						// console.log(j, i, index, document.getElementById(`${newJ}${newI}`).firstChild.classList);

						if (document.getElementById(`${newJ}${newI}`).firstChild.classList.contains(`board__check_${arrIndexColor[1 - index]}`)) {
							// console.log('это шашка другого цвета');

							// Проверка на наличие пустой клетки за клеткой "pixelAnotherColor" 
							let emptyPixJ = jOfPixel + 2 * j;
							let emptyPixI = iOfPixel + 2 * i;
							if ((0 <= emptyPixJ) && (emptyPixJ < 8) && (0 <= emptyPixI) && (emptyPixI < 8)) {
								let PotentialEmptyPixel = document.getElementById(`${emptyPixJ}${emptyPixI}`);
								// console.log('PotentialEmptyPixel:', PotentialEmptyPixel);

								// if (Boolean(PotentialEaterPixel)){
								if (!PotentialEmptyPixel.hasChildNodes()) {
									return true;
									// break markPossibilityToEat;
								}
							}
						}
						// }
					}
				}
			}
		}
		// }
	}
	return false;
}

function getFlagPossibilityToEatForQueens(myQueens) {
	let flagExp1 = false;
	// let flagExp1 = true;
	for (let checker of myQueens) {
		// if (checker.hasAttribute('id')){

		let color;
		if (checker.getAttribute('status') == 'WhiteQueen') {
			color = 'white';
		} else color = 'black'
		if (flagExp1) console.log('my Queen:', checker);
		if (flagExp1) console.log('Queen status:', checker.getAttribute('status'), 'color:', color);
		let ID = checker.parentElement.getAttribute('id');
		if (flagExp1) console.log('my Queen ID:', ID);
		let jOfPixel = +ID[0];
		let iOfPixel = +ID[1];
		for (let j of [-1, 1]) {
			for (let i of [-1, 1]) {
				forIndexK3: for (let r of [1, 2, 3, 4, 5, 6]) {
					// индексы потенциальной шашки противника, которую съест данный игрок на этом ходу
					let newJ = jOfPixel + r * j;
					let newI = iOfPixel + r * i;
					//рассматриваем пиксели в пределах доски
					if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
						// if (flagExp1) console.log('asd', document.getElementById(`${newJ}${newI}`));
						//проверка на наличие шашки в клетке (newJ, newI)
						if (flagExp1) console.log('potential pixels:', document.getElementById(`${newJ}${newI}`), 'my Queen color:', color);
						if (document.getElementById(`${newJ}${newI}`).hasChildNodes()) {
							// if (flagExp1) console.log(j, i, index, document.getElementById(`${newJ}${newI}`).firstChild.classList);

							//Проверка, что шашка на (newJ, newI) - шашка противника
							let potentialEnemyChecker = document.getElementById(`${newJ}${newI}`).firstChild;
							// if (flagExp1) console.log('potentialEnemyChecker.classList.contains(`board__check_${color}`):', potentialEnemyChecker);
							if (flagExp1) console.log(`potentialEnemyChecker.classList.contains('board__check_${color}'):`, potentialEnemyChecker.classList.contains(`board__check_${color}`), '- Значит это шашка противника');


							if (!potentialEnemyChecker.classList.contains(`board__check_${color}`)) {
								// Проверка на наличие пустой клетки за найденной шашкой противника
								if (flagExp1) console.log('это шашка противника', document.getElementById(`${newJ}${newI}`).firstChild);
								let emptyPixJ = newJ + j;
								let emptyPixI = newI + i;
								if ((0 <= emptyPixJ) && (emptyPixJ < 8) && (0 <= emptyPixI) && (emptyPixI < 8)) {
									let PotentialEmptyPixel = document.getElementById(`${emptyPixJ}${emptyPixI}`);
									if (flagExp1) console.log('PotentialEmptyPixel:', PotentialEmptyPixel);
									if (!PotentialEmptyPixel.hasChildNodes()) {
										if (flagExp1) console.log('можно съесть эту шашку:', document.getElementById(`${newJ}${newI}`).firstChild, 'getFlagPossibilityToEatForQueens');
										return true;
									} else break forIndexK3;
								} else break forIndexK3;
							} else break forIndexK3
						}
					} else break forIndexK3;
				}
			}
		}
	}
	return false;
}


// let objActPixBordColor = { 'black': 'rgb(5, 255, 25)', 'white': 'rgb(255, 0, 0)' };
let objActPixBordColor = { 'black': 'rgb(0, 173, 0)', 'white': 'rgb(255, 0, 0)' };
let objButtonColorToNow = { 'black': 'Ход черных', 'white': 'Ход белых' };

function rand100() { return Math.round(Math.random() * 100); }
function nextMove(myCheckers, EnemyCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, myQueenCheckers = [], enemyQueenCheckers = [], moveNum = 0, StartMoveColor) {
	// console.log('in func nexnmove index = ', index);
	console.log('moveNum:', moveNum);

	let CurrentColor = arrIndexColor[index];


	// function someFunk(a, b, event) {
	// 	console.log(a, b, event);
	//   }

	// // buttonNewGame.addEventListener('click', newGame.bind(), false);
	let buttonColorToNow = document.querySelector('[name="colorToMove"]');

	let flagPossibilityToEatEnemyChecker = false;
	let flagPossibilityToEatEnemyCheckerForQueens = false;

	actPixBordColor = objActPixBordColor[CurrentColor];
	buttonColorToNow.innerHTML = objButtonColorToNow[CurrentColor];
	// }
	// MarkCurrentPlayer(actPixBordColor, buttonColorToNow);

	if (myCheckers.length == 0) {

		if (CurrentColor == 'black') {
			alert("Выиграли белые");
			// unmarkPreviousPlayer(EnemyCheckers, arrWorkPixels, index, inactPixBordColor);
			let flag = confirm("Начать новую игру?");
			if (flag) PlayGame('black', downsideColor);
		} else {
			alert("Выиграли черные");
			// unmarkPreviousPlayer(EnemyCheckers, arrWorkPixels, index, inactPixBordColor);
			let flag = confirm("Начать новую игру?");
			if (flag) PlayGame('white', downsideColor);
		}

	} else {



		if (ExpMode) console.log(index, 'myQueenCheckers:', myQueenCheckers);

		flagPossibilityToEatEnemyChecker = getFlagPossibilityToEat(myCheckers, index);
		flagPossibilityToEatEnemyCheckerForQueens = getFlagPossibilityToEatForQueens(myQueenCheckers, index);

		if (ExpMode) {
			console.log(arrIndexColor[index], 'flagPossibilityToEatEnemyCheckerForQueens:', flagPossibilityToEatEnemyCheckerForQueens, arrIndexColor[index]);
			console.log(arrIndexColor[index], 'flagPossibilityToEatEnemyChecker:', flagPossibilityToEatEnemyChecker);
		}

		// todo
		// todo flagPossibilityToEatEnemyChecker_forQueens = getFlagPossibilityToEatForQueens(myQueenCheckers, index);

		//! Обработка нажатия на клетку, с которой хотят походить
		for (let checker of myCheckers) {

			// console.log(index, checker);

			// Отметка цветом клетки и присвоение ей атрибута "data-index-color"
			checker.onclick = function (newActivePixel) {
				newActivePixel = checker.parentElement;
				for (let checker of myCheckers) {
					let ActivePixel = checker.parentElement;

					ActivePixel.style.borderColor = inactPixBordColor;
					if (ActivePixel.hasAttribute(['data-index-color'])) ActivePixel.removeAttribute(['data-index-color']);
				}
				newActivePixel.style.borderColor = actPixBordColor;

				// pp
				// if (index == 1) newActivePixel.style.borderColor = 'green';
				newActivePixel.setAttribute("data-index-color", arrIndexColor[index]);
			}
		}

		//! обработка клеток, куда хотят походить
		for (let blankPixel of arrWorkPixels) {
			let flagExpBlank = ExpMode;
			blankPixel.onclick = function () {
				let randNum;
				if (flagExpBlank) {
					randNum = rand100();
					console.log('RANDOM NUMBER:', randNum);
				}
				let ID = blankPixel.getAttribute('id');
				let jOfPixel = +ID[0];
				let iOfPixel = +ID[1];
				// console.log(ID, 'ID');
				//Проверка на отсутствие шашки в данном пикселе
				if (!blankPixel.hasChildNodes()) {
					// console.log('blankPixel');

					if (flagExpBlank) console.log(blankPixel, 'pixel doesn\'t hasChildNodes');

					// ! 1 случай
					// ! Ход, на котором съедается  шашка, которая может быть съедена любой шашкой
					for (let j of [-1, 1]) {
						for (let i of [-1, 1]) {
							//индексы рассматриваемого пикселя
							let newJ = jOfPixel + j;
							let newI = iOfPixel + i;
							//рассматриваем пиксели в пределах доски
							if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
								// console.log(j, i, jOfPixel, iOfPixel, 'newJ:', newJ, 'newI:', newI);
								// let pixelAnotherColor = document.getElementById(`${newJ}${newI}`);
								let potentialEatenCheckerParent = document.getElementById(`${newJ}${newI}`);
								if (document.getElementById(`${newJ}${newI}`).hasChildNodes()) {
									// Проверка на наличие клетки соперника рядом с рассматриваемой клеткой "blankPixel" 	

									let potentialEatenChecker = potentialEatenCheckerParent.firstChild;
									let flagNearIsEnemyChecker = potentialEatenChecker.classList.contains(`board__check_${arrIndexColor[1 - index]}`);
									// Проверка наличия моей шашки за клеткой соперника, которая бы съела ее и попала в рассматриваемый пиксель
									if (flagNearIsEnemyChecker) {
										let newJ = jOfPixel + 2 * j;
										let newI = iOfPixel + 2 * i;
										// console.log(j, i, 'newJ:', newJ, 'newI:', newI);
										let PotentialEaterPixel = document.getElementById(`${newJ}${newI}`);
										// console.log('PotentialEaterPixel:', PotentialEaterPixel);
										if (Boolean(PotentialEaterPixel)) {
											if (PotentialEaterPixel.hasChildNodes()) {
												//если эта клетка содержит мою шашку
												let potentialEaterChecker = PotentialEaterPixel.firstChild;

												if (PotentialEaterPixel.hasAttribute("data-index-color")) {

													//Если шашка "PotentialEaterPixel" активна и она не является дамкой 
													if ((PotentialEaterPixel.dataset.indexColor == arrIndexColor[index]) && (!potentialEaterChecker.hasAttribute('status'))) {
														// console.log('potentialEaterChecker hasAttribute("data-index-color") = ', arrIndexColor[index]);
														blankPixel.append(potentialEaterChecker);
														// potentialEatenCheckerParent.removeChild(potentialEatenChecker);

														//убираем съеденную шашку с доски и из соответствующих массивов
														potentialEatenCheckerParent.innerHTML = '';
														EnemyCheckers.splice(EnemyCheckers.indexOf(potentialEatenChecker), 1)
														if (potentialEatenChecker.hasAttribute('status')) enemyQueenCheckers.splice(enemyQueenCheckers.indexOf(potentialEatenChecker), 1)

														//помечаем клетку цветом, куда походили (пометка №1)
														//помечаем элементы, соответствующий клеткам, в которую походили и из которой походили(пометка №2)
														// console.log('blankPixel, PotentialEaterPixel, index, actPixBordColor', blankPixel, PotentialEaterPixel, index, actPixBordColor);

														//проверка, можно ли съесть вторую пешку этой же пешкой:
														flagPossibilityToEatEnemyChecker = getFlagPossibilityToEat([potentialEaterChecker], index);

														// console.log('flagPossibilityToEatEnemyChecker 1:', flagPossibilityToEatEnemyChecker);
														//если можно, то передаем ход себе
														markCurrentPlayer(blankPixel, PotentialEaterPixel, index, actPixBordColor)

														//Рассматриваем случай, что рожденная после съедения другой шашки дамка сможет съесть еще кого-нибудь
														let flagPossibilityToEatEnemyCheckerForBornedQueen = false;
														if (([0, 7].includes(jOfPixel)) && (!potentialEaterChecker.hasAttribute('status'))) {
															// console.log(potentialEaterChecker);
															dressQueen(potentialEaterChecker, CurrentColor);
															myQueenCheckers.push(potentialEaterChecker);
															flagPossibilityToEatEnemyCheckerForBornedQueen = getFlagPossibilityToEatForQueens([blankPixel.firstChild], index);
															// console.log('я съел шашку, стал дамкой и теперь могу съесть еще:',  flagPossibilityToEatEnemyCheckerForBornedQueen, blankPixel.firstChild);
															// console.log(1, flagPossibilityToEatEnemyCheckerForBornedQueen);
														}
														if (flagExpBlank) console.log(2, flagPossibilityToEatEnemyCheckerForBornedQueen);

														if ((flagPossibilityToEatEnemyChecker) || (flagPossibilityToEatEnemyCheckerForBornedQueen)) {
															if (flagExpBlank) console.log(123);

															// console.log(potentialEaterChecker, jOfPixel);
															// console.log(2, myQueenCheckers);

															nextMove(myCheckers, EnemyCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, myQueenCheckers, enemyQueenCheckers, moveNum + 1, StartMoveColor);
														}
														else {
															// console.log('document.querySelectorAll(["data-index-color"]):', 
															unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);

															// console.log(potentialEaterChecker, jOfPixel, 'jOfPixel in [0, 7]', jOfPixel in [0, 7]);
															// if ([0, 7].includes(jOfPixel) && (!potentialEaterChecker.hasAttribute('status'))) {
															// 	// console.log('in 2', potentialEaterChecker, jOfPixel);
															// 	dressQueen(potentialEaterChecker, color);
															// 		
															// if (color == 'black') console.log('я съел шашку, стал дамкой и теперь могу съесть еще:',  getFlagPossibilityToEatForQueens([blankPixel.firstChild], index), blankPixel.firstChild);
															// }

															//передаем ход другому игроку
															nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
														}
													}
													// console.log('potentialEaterChecker hasAttribute("data-index-color") != ', arrIndexColor[index]);
												}
											}
										}
									}
								}
							}
						}
					}
					// console.log('flagPossibilityToEatEnemyChecker:', flagPossibilityToEatEnemyChecker);


					// ! 2 случай
					// ! обычный ход без съедания шашек
					// !Учет того, что нельзя ходить назад
					if ((!flagPossibilityToEatEnemyChecker) && (!flagPossibilityToEatEnemyCheckerForQueens)) {
						//todo	
						// let jValue;
						// if (downsideColor == 'white'){
						// 	if (CurrentColor == 'black') jValue = 1;
						// 	else jValue = -1;
						// } else{
						// 	if (CurrentColor == 'black') jValue = -1;
						// 	else jValue = 1;
						// }

						for (let j of [-1, 1]) {
							for (let i of [-1, 1]) {
								//индексы рассматриваемого пикселя
								let newJ = jOfPixel + j;
								let newI = iOfPixel + i;

								//рассматриваем пиксели в пределах доски
								//Пиксель, из которого хочет походить данный игрок в пиксель "blankPixel" должен быть в пределах доски
								if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
									// console.log(j, i, jOfPixel, iOfPixel, 'newJ:', newJ, 'newI:', newI);
									//overlookedPixel - это предполагаемая клетка, которая имеет в себе шашку, 
									//которой хотят походить в клетку "blankPixel" (ПРЕДПОЛОЖЕНИЕ №1)
									// проверка истинности ПРЕДПОЛОЖЕНИЯ №1
									// ! Здесь возможно ошибка. Было два условия:
									// if ((getComputedStyle(overlookedPixel).borderColor == actPixBordColor) &&
									// 	(overlookedPixel.dataset.indexColor == arrIndexColor[index])) {
									let overlookedPixel = document.getElementById(`${newJ}${newI}`);
									// console.log('overlookedPixel:', overlookedPixel);

									if (overlookedPixel.dataset.indexColor == arrIndexColor[index]) {

										let activeChecker = overlookedPixel.firstChild;
										// console.log('activeChecker.hasAttribute("status"):', activeChecker.hasAttribute('status'));
										// console.log('([0, 7].includes[jOfPixel]):', ([0, 7].includes(jOfPixel)), jOfPixel);

										if (([0, 7].includes(jOfPixel)) && (!activeChecker.hasAttribute('status'))) {
											// console.log(123, activeChecker);
											dressQueen(activeChecker, CurrentColor);
											myQueenCheckers.push(activeChecker)
										}

										// console.log(arrIndexColor[index], activeChecker, 'newJ = ', newJ, newI, jOfPixel);


										blankPixel.append(activeChecker);

										//помечаем клетку цветом, куда походили (пометка №1)
										markCurrentPlayer(blankPixel, overlookedPixel, index, actPixBordColor);
										// снимаем пометки №1 и №2 для предыдущего игрока
										unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);
										//передаем ход другому игроку
										nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
									}

								}
							}
						}
					}
					//!3 случай
					//! Обработка клеток, куда хотят походить ДАМКОЙ
					if (!flagPossibilityToEatEnemyCheckerForQueens) {
						// if (!flagPossibilityToEatEnemyChecker) {
						for (let j of [-1, 1]) {
							for (let i of [-1, 1]) {
								forIndexK1: for (let k of [1, 2, 3, 4, 5, 6, 7]) {

									let newJ = jOfPixel + k * j;
									let newI = iOfPixel + k * i;

									if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
										//overlookedPixel - это предполагаемая клетка, которая имеет в себе дамку, 
										//которой хотят походить в клетку "blankPixel")
										let overlookedPixel = document.getElementById(`${newJ}${newI}`);

										//найти бижайшую шашку по четырем диагонялям. если она дамка и дальше чем 1 клетка от  (jOfPixel, шOfPixel), то походить ей 
										// console.log(arrIndexColor[index], overlookedPixel);

										if (overlookedPixel.hasChildNodes()) {
											let potentialQueenChecker = overlookedPixel.firstChild;
											if (overlookedPixel.firstChild.hasAttribute('status') &&
												overlookedPixel.firstChild.classList.contains(`board__check_${arrIndexColor[index]}`)) {

												if ((overlookedPixel.style.borderColor = actPixBordColor) && (overlookedPixel.dataset.indexColor == arrIndexColor[index])) {
													blankPixel.append(potentialQueenChecker);
													markCurrentPlayer(blankPixel, overlookedPixel, index, actPixBordColor);
													// снимаем пометки №1 и №2 для предыдущего игрока
													unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);

													//передаем ход другому игроку
													nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
												}
											} else break forIndexK1;

										}
									} else break forIndexK1;
									// if (overlookedPixel.hasAttribute('status'){
									// console.log();
									// }
								}
							}
						}
					}
					// ! 4 случай
					// ! Ход, на котором ДМАКА съедает шашку					
					randNum = rand100();
					for (let j of [-1, 1]) {
						for (let i of [-1, 1]) {
							forIndexK2: for (let k of [1, 2, 3, 4, 5, 6]) {
								// console.log(randNum, "blankPixel:", blankPixel);
								let expFlag = ExpMode;
								let flagExpInner = false;
								// let flagExpInner = true;
								expFlag = expFlag && flagExpInner;

								let newJ = jOfPixel + k * j;
								let newI = iOfPixel + k * i;
								if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {

									//клетка, на которой, возможно находится шашка противника, которую, возможно, съест дамка данного игрока
									let potentialEatenCheckerParent = document.getElementById(`${newJ}${newI}`);
									if (expFlag) console.log('potentialEatenCheckerParent:', potentialEatenCheckerParent);

									if (potentialEatenCheckerParent.hasChildNodes()) {
										let potentialEatenChecker = potentialEatenCheckerParent.firstChild;
										if (expFlag) console.log('potentialEatenChecker:', potentialEatenChecker);
										if (potentialEatenChecker.classList.contains(`board__check_${arrIndexColor[1 - index]}`)) {
											if (expFlag) console.log('Клетка содержит шашку противника:');


											// flagPossibilityToEatEnemyChecker = getFlagPossibilityToEatForQueens([potentialEatenCheckerParent.firstChild], index);

											// console.log(arrIndexColor[index], 'flagPossibilityToEatEnemyChecker', flagPossibilityToEatEnemyChecker);
											//Поиск возможной дамки данного игрока за шашкой противника
											if (expFlag) console.log('arange(k + 1, 8):', arange(k + 1, 8), k + 1);

											for (let r of arange(k + 1, 8)) {
												if (expFlag) console.log('potentialEatenChecker:', potentialEatenChecker);

												let newJmyQueen = jOfPixel + r * j;
												let newImyQueen = iOfPixel + r * i;
												if (expFlag) console.log(newJmyQueen, newImyQueen);

												if ((0 <= newJmyQueen) && (newJmyQueen < 8) && (0 <= newImyQueen) && (newImyQueen < 8)) {
													let myPossibleQueenCheckerParent = document.getElementById(`${newJmyQueen}${newImyQueen}`);
													// console.log('blankPixel:', blankPixel);

													if (expFlag) console.log('myPossibleQueenCheckerParent:', myPossibleQueenCheckerParent);

													if (myPossibleQueenCheckerParent.hasChildNodes()) {
														let myPossibleQueenChecker = myPossibleQueenCheckerParent.firstChild;
														if (expFlag) console.log('myPossibleQueenCheckerParent.style.borderColor:', myPossibleQueenCheckerParent.style.borderColor);

														//Если эта шашка - дамка, и если она является шашкой данного игрока.
														if (myPossibleQueenChecker.hasAttribute('status') && (myPossibleQueenChecker.classList.contains(`board__check_${arrIndexColor[index]}`)) && (myPossibleQueenCheckerParent.style.borderColor == actPixBordColor)) {
															if (expFlag) console.log('Клетка', myPossibleQueenCheckerParent, 'содержит мою дамку');


															if (expFlag) console.log('Дамка съедает шашку');

															blankPixel.append(myPossibleQueenChecker);
															// pixelAnotherColor.removeChild(potentialEatenChecker);
															potentialEatenCheckerParent.innerHTML = '';
															if (potentialEatenChecker.hasAttribute('status')) enemyQueenCheckers.splice(enemyQueenCheckers.indexOf(potentialEatenChecker), 1)

															//TODO проверить, нужно ли удалять: EnemyCheckers.splice(EnemyCheckers.indexOf(potentialEatenChecker), 1)
															if (expFlag) console.log('EnemyCheckers.indexOf(potentialEatenChecker):', EnemyCheckers.indexOf(potentialEatenChecker));
															EnemyCheckers.splice(EnemyCheckers.indexOf(potentialEatenChecker), 1)

															flagPossibilityToEatEnemyCheckerForQueens = getFlagPossibilityToEatForQueens([myPossibleQueenChecker], index);

															if (expFlag) console.log(659, arrIndexColor[index], 'flagPossibilityToEatEnemyCheckerForQueens after eating:', flagPossibilityToEatEnemyCheckerForQueens);

															//если можно, то передаем ход себе
															markCurrentPlayer(blankPixel, myPossibleQueenCheckerParent, index, actPixBordColor)
															//todo этот флаг работает неправильно
															console.log(3, myQueenCheckers);

															if (flagPossibilityToEatEnemyCheckerForQueens) {
																nextMove(myCheckers, EnemyCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, myQueenCheckers, enemyQueenCheckers, moveNum + 1, StartMoveColor);
															}
															else {
																// console.log('document.querySelectorAll(["data-index-color"]):', 
																unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);
																// console.log(potentialEaterChecker, jOfPixel, 'jOfPixel in [0, 7]', jOfPixel in [0, 7]);
																//передаем ход другому игроку
																nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
															}
														} else break forIndexK2;
													}
												} else break forIndexK2;
											}
										} else break forIndexK2;
									}
								} else break forIndexK2;
							}

							// ! Ход, на котором съедается  шашка


						}

					}
				}

			}
		}//! обработка клеток, куда хотят походить
	}
}
function correctSizeOfCheckers(arrWhiteCheckers, arrBlackCheckers) {

	// let flagModifySizeOfCheckers = false;
	// let flagModifySizeOfCheckers = true;

	// if (flagModifySizeOfCheckers){
	let checkerWhite0 = document.querySelector('.board__check_white');
	let pixelWhite0 = document.querySelector('.board__pixel_white');
	let checkerWhiteWidth = parseFloat(getComputedStyle(checkerWhite0).width);
	let pixelWhite0Width = parseFloat(getComputedStyle(pixelWhite0).width);
	let pixelWhite0BorderWidth = parseFloat(getComputedStyle(pixelWhite0).borderWidth);
	let indentChecker_corrected = (pixelWhite0Width - checkerWhiteWidth) / 2 - pixelWhite0BorderWidth;
	console.log('checkerWhiteWidth:', checkerWhiteWidth, 'pixelWhite0Width:', pixelWhite0Width, 'pixelWhite0BorderWidth:', pixelWhite0BorderWidth, ' indentChecker_corrected:', indentChecker_corrected);

	// console.log(23, arrWhiteCheckers.concat(arrBlackCheckers));

	for (let checker of arrWhiteCheckers.concat(arrBlackCheckers)) {
		checker.style.top = indentChecker_corrected + 'px';
		checker.style.left = indentChecker_corrected + 'px';
	}
	// }
}


const arrIndexColor = ['white', 'black'];
// const arrIndexColor = ['black', 'white'];
const whiteChecker = createWhiteChecker();
const blackChecker = createBlackChecker();
const colorWorkPixels = 'black';
const moveNumStart = 1;


let arrWorkPixels;
let par_1, par_2;
// let arrWorkPixels, colorWorkPixels;


let numOfStartLines = 3;
let numOfStartCheckers = 8;
// let numOfStartCheckers = 2;
// let numOfStartLines = 1;
// let indentChecker = 7.375; // см. значение "indentChecker_corrected" по флагу "flagModifySizeOfCheckers"



let index;
let startBoardPosition;
let arrBlackPixels, arrWhitePixels;
let arrWhiteCheckers, arrBlackCheckers;
let actPixBordColor = 'rgb(255, 0, 0)', inactPixBordColor;

//ставить true, если хотим исправлять ошибки или задавать свою стартовую позицию
const ExpMode = false;
// const ExpMode = true;

let jTurning = { 'white': { 'white': 0, 'black': 7 }, 'black': { 'white': 7, 'black': 0 } };
let whiteQueenCheckers = [], blackQueenCheckers = [];


function makeStartPosition(blackPixClassName, whitePixClassName, downsideColor, expMode = false) {
	document.body.innerHTML = '';
	setBoardPixels();
	arrBlackPixels = document.querySelectorAll('.' + blackPixClassName);
	arrWhitePixels = document.querySelectorAll('.' + whitePixClassName);
	// console.log('.' + blackPixClassName);

	inactPixBordColor = getComputedStyle(arrWhitePixels[0]).borderColor;
	// * console.log('arrBlackPixels:', arrBlackPixels);
	// * console.log('arrWhitePixels:', arrWhitePixels);

	if (colorWorkPixels == 'white') {
		par_1 = 0;
		par_2 = 1;
	} else {
		par_1 = 1;
		par_2 = 0;
	}

	arrBlackCheckers = setStartPositionBlack(numOfStartLines, numOfStartCheckers, blackChecker, par_1, par_2, downsideColor, expMode);
	arrWhiteCheckers = setStartPositionWhite(numOfStartLines, numOfStartCheckers, whiteChecker, par_1, par_2, downsideColor, expMode);

	if (colorWorkPixels == 'white') {
		arrWorkPixels = arrWhitePixels;
	} else {
		arrWorkPixels = arrBlackPixels;
	}
}

function dressQueen(checker, color) {

	if (color == 'black') checker.setAttribute('status', 'BlackQueen');
	else checker.setAttribute('status', 'WhiteQueen');
	// console.log('checker:', checker);
	let color1 = getComputedStyle(checker.firstChild).backgroundColor;
	// let color1 = 'green';
	checker.removeChild(checker.firstChild);
	// checker.style.cssText = `
	// background-color: ${color1};
	// //box-shadow: 0px 0px 0px 1.5px black inset;
	// `;
	checker.style.backgroundColor = `${color1}`;
	checker.style.border = '2px solid white';
}



function CheckinfForQueensAtStart(arrWhiteCheckers, arrBlackCheckers, jTurning, downsideColor) {

	for (let checker of arrWhiteCheckers) {
		if (Number(checker.parentElement.getAttribute('id')[0]) == jTurning[downsideColor]['white']) {
			dressQueen(checker, 'white');
			whiteQueenCheckers.push(checker);
		}
	}
	for (let checker of arrBlackCheckers) {
		if (Number(checker.parentElement.getAttribute('id')[0]) == jTurning[downsideColor]['black']) {
			dressQueen(checker, 'black');
			blackQueenCheckers.push(checker);
		}
	}
}

function newGame(StartMoveColor, downsideColor) {
	console.log('newGame(StartMoveColor, downsideColor):', StartMoveColor, downsideColor);

	let flag = confirm("Начать новую игру?");
	console.log('flag :', flag);
	console.log('new pars:', StartMoveColor, downsideColor);

	if (flag) PlayGame(StartMoveColor, downsideColor);
}

function changeColor(StartMoveColor, downsideColor) {
	console.log('StartMoveColor, downsideColor:', StartMoveColor, downsideColor);

	let flag = confirm("Вы хотите сменить цвет?");
	console.log('flag :', flag);
	console.log('new pars:', arrIndexColor[1 - arrIndexColor.indexOf(StartMoveColor)], downsideColor);

	if (flag) PlayGame(arrIndexColor[1 - arrIndexColor.indexOf(StartMoveColor)], downsideColor);
}

function flipBoard(StartMoveColor, downsideColor) {
	console.log('StartMoveColor, downsideColor:', StartMoveColor, downsideColor);

	let flag = confirm("Вы хотите перевернуть доску?");
	console.log('flag :', flag);
	console.log('new pars:', StartMoveColor, arrIndexColor[1 - arrIndexColor.indexOf(downsideColor)]);

	if (flag) PlayGame(StartMoveColor, arrIndexColor[1 - arrIndexColor.indexOf(downsideColor)]);
}


function PlayGame(StartMoveColor, downsideColor = 'white') {

	let index = arrIndexColor.indexOf(StartMoveColor);
	document.body.innerHTML = document_body_innerHTML_INIT; // Стираю все изменения в HTML из JS 

	makeStartPosition('board__pixel_black', 'board__pixel_white', downsideColor, ExpMode);
	//Смотрю, есть ли в стартовой позиции дамки
	if (ExpMode) CheckinfForQueensAtStart(arrWhiteCheckers, arrBlackCheckers, jTurning, downsideColor);

	//Добавляю опции для пользователя
	setupButtnos(StartMoveColor, downsideColor);

	if (StartMoveColor == 'black') nextMove(arrBlackCheckers, arrWhiteCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, blackQueenCheckers, whiteQueenCheckers, moveNumStart);
	else nextMove(arrWhiteCheckers, arrBlackCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, whiteQueenCheckers, blackQueenCheckers, moveNumStart, StartMoveColor);


}


function setupButtnos(StartMoveColor, downsideColor) {
	let buttonNewGame = document.querySelector('[name="new-game"]');
	let buttonChangeColor = document.querySelector('[name="change-color"]');
	let buttonflipBoard = document.querySelector('[name="flip-board"]');
	buttonNewGame.addEventListener('click', newGame.bind(null, StartMoveColor, downsideColor));
	buttonChangeColor.addEventListener('click', changeColor.bind(null, StartMoveColor, downsideColor));
	buttonflipBoard.addEventListener('click', flipBoard.bind(null, StartMoveColor, downsideColor));
}


let StartMoveColor = 'white';
// let StartMoveColor = 'black';
let downsideColor = 'white';
// let downsideColor = 'black';
PlayGame(StartMoveColor, downsideColor);

