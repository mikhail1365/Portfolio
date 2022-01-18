
"use strict"


const document_body_innerHTML_INIT = document.body.innerHTML;

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
			let newPixel = document.createElement('div');
			if (i % 2 == 0) {
				newPixel.className = pixelClassesMass[j % 2];
			} else {
				newPixel.className = pixelClassesMass[1 - j % 2];
			}
			newPixel.setAttribute("id", `${j}${i}`);

			boardRawElement.append(newPixel);
		}
		// Добавляем заполненную строку в конец
		lastBoardColumnElement.append(boardRawElement);

		// Добавляем пустой контейнер для средующей строки клеток, если это не последняя строка
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

	let arrJ, arrI;
	if (expMode) {
		//при необходимости можем расставить любую начальную позицию 
		// arrJ = [1, 2];
		// arrI = [4, 3];
	} else {
		// Позиция по умолчанию
		arrJ = arange(numOfStartLines);
		arrI = arange(numOfStartCheckers);
	}

	for (let j of arrJ) {
		for (let i of arrI) {
			if (j % 2 == 0) {
				if (i % 2 == par_1) {
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
					pixel.append(checker);
					arrWhiteCheckers.push(checker);
				}
			}
		}
	}
	return arrWhiteCheckers;
}

function setStartPositionBlack(numOfStartLines, numOfStartCheckers, blackChecker, par_1, par_2, downsideColor = 'black', expMode = false) {
	// Расставляем черне шашки на места
	let arrBlackCheckers = new Array();

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
	for (let lastMovePixel of previousMovePixels) {
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
					if (document.getElementById(`${newJ}${newI}`).hasChildNodes()) {
						//Проверка, что шашка на (newJ, newI) - другого цвета
						if (document.getElementById(`${newJ}${newI}`).firstChild.classList.contains(`board__check_${arrIndexColor[1 - index]}`)) {
							// Проверка на наличие пустой клетки за клеткой "pixelAnotherColor" 
							let emptyPixJ = jOfPixel + 2 * j;
							let emptyPixI = iOfPixel + 2 * i;
							if ((0 <= emptyPixJ) && (emptyPixJ < 8) && (0 <= emptyPixI) && (emptyPixI < 8)) {
								let PotentialEmptyPixel = document.getElementById(`${emptyPixJ}${emptyPixI}`);
								if (!PotentialEmptyPixel.hasChildNodes()) {
									return true;
								}
							}
						}
					}
				}
			}
		}
	}
	return false;
}

function getFlagPossibilityToEatForQueens(myQueens) {
	let flagExp1 = false;
	for (let checker of myQueens) {
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
						//проверка на наличие шашки в клетке (newJ, newI)
						if (flagExp1) console.log('potential pixels:', document.getElementById(`${newJ}${newI}`), 'my Queen color:', color);
						if (document.getElementById(`${newJ}${newI}`).hasChildNodes()) {
							//Проверка, что шашка на (newJ, newI) - шашка противника
							let potentialEnemyChecker = document.getElementById(`${newJ}${newI}`).firstChild;
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

let objActPixBordColor = { 'black': 'rgb(0, 173, 0)', 'white': 'rgb(255, 0, 0)' };
let objButtonColorToNow = { 'black': 'Ход черных', 'white': 'Ход белых' };

function rand100() { return Math.round(Math.random() * 100); }
function nextMove(myCheckers, EnemyCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, myQueenCheckers = [], enemyQueenCheckers = [], moveNum = 0, StartMoveColor) {
	console.log('moveNum:', moveNum);

	let CurrentColor = arrIndexColor[index];

	let buttonColorToNow = document.querySelector('[name="colorToMove"]');

	let flagPossibilityToEatEnemyChecker = false;
	let flagPossibilityToEatEnemyCheckerForQueens = false;

	actPixBordColor = objActPixBordColor[CurrentColor];
	buttonColorToNow.innerHTML = objButtonColorToNow[CurrentColor];

	if (myCheckers.length == 0) {

		if (CurrentColor == 'black') {
			alert("Выиграли белые");
			let flag = confirm("Начать новую игру?");
			if (flag) PlayGame('black', downsideColor, colorWorkPixels);
		} else {
			alert("Выиграли черные");
			let flag = confirm("Начать новую игру?");
			if (flag) PlayGame('white', downsideColor, colorWorkPixels);
		}

	} else {
		if (ExpMode) console.log(index, 'myQueenCheckers:', myQueenCheckers);

		flagPossibilityToEatEnemyChecker = getFlagPossibilityToEat(myCheckers, index);
		flagPossibilityToEatEnemyCheckerForQueens = getFlagPossibilityToEatForQueens(myQueenCheckers, index);

		if (ExpMode) {
			console.log(arrIndexColor[index], 'flagPossibilityToEatEnemyCheckerForQueens:', flagPossibilityToEatEnemyCheckerForQueens, arrIndexColor[index]);
			console.log(arrIndexColor[index], 'flagPossibilityToEatEnemyChecker:', flagPossibilityToEatEnemyChecker);
		}

		//! Обработка нажатия на клетку, с которой хотят походить
		for (let checker of myCheckers) {

			// Отмечаем эту клетку цветом и присваиваем ей атрибут "data-index-color"
			checker.onclick = function (newActivePixel) {
				newActivePixel = checker.parentElement;
				for (let checker of myCheckers) {
					let ActivePixel = checker.parentElement;

					ActivePixel.style.borderColor = inactPixBordColor;
					if (ActivePixel.hasAttribute(['data-index-color'])) ActivePixel.removeAttribute(['data-index-color']);
				}
				newActivePixel.style.borderColor = actPixBordColor;

				newActivePixel.setAttribute("data-index-color", arrIndexColor[index]);
			}
		}

		//! обработка нажатия на клетку, куда хотят походить
		for (let blankPixel of arrWorkPixels) {
			blankPixel.onclick = function () {
				let ID = blankPixel.getAttribute('id');
				let jOfPixel = +ID[0];
				let iOfPixel = +ID[1];

				//Проверка на отсутствие шашки в данной клетке
				if (!blankPixel.hasChildNodes()) {

					// ! 1 случай
					// ! Ход, на котором съедается  шашка, которая может быть съедена любой шашкой (не обязательно дамкой)
					for (let j of [-1, 1]) {
						for (let i of [-1, 1]) {
							//индексы рассматриваемого пикселя
							let newJ = jOfPixel + j;
							let newI = iOfPixel + i;
							//рассматриваем пиксели в пределах доски
							if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
								let potentialEatenCheckerParent = document.getElementById(`${newJ}${newI}`);
								//Если в клетке "potentialEatenCheckerParent" есть шашка
								if (potentialEatenCheckerParent.hasChildNodes()) {
									let potentialEatenChecker = potentialEatenCheckerParent.firstChild;
									let flagNearIsEnemyChecker = potentialEatenChecker.classList.contains(`board__check_${arrIndexColor[1 - index]}`);
									//Если шашка внутри клетки "potentialEatenCheckerParent" является шашкой противника
									if (flagNearIsEnemyChecker) {
										// Проверка наличия моей шашки за клеткой соперника, которая бы съела ее и попала в рассматриваемый пиксель
										let newJ = jOfPixel + 2 * j;
										let newI = iOfPixel + 2 * i;
										let PotentialEaterPixel = document.getElementById(`${newJ}${newI}`);
										if (Boolean(PotentialEaterPixel)) {
											//если клетка "PotentialEaterPixel" содержит шашку противника
											if (PotentialEaterPixel.hasChildNodes()) {
												let potentialEaterChecker = PotentialEaterPixel.firstChild;

												if (PotentialEaterPixel.hasAttribute("data-index-color")) {

													//Если клетка "PotentialEaterPixel" активна и шашка внутри нее не является дамкой (т.е. не имеет атрибута "status")
													if ((PotentialEaterPixel.dataset.indexColor == arrIndexColor[index]) && (!potentialEaterChecker.hasAttribute('status'))) {
														//перемещаем нашу шашку на новую клетку
														blankPixel.append(potentialEaterChecker);
														
														//убираем съеденную шашку с доски 
														potentialEatenCheckerParent.innerHTML = '';
														
														//убираем съеденную шашку из соответствующих массивов, в которых она находилась 
														//( т.е. из массива всех шашек противника или массива всех дамок противника, если съеденная шашка была дамкой)
														EnemyCheckers.splice(EnemyCheckers.indexOf(potentialEatenChecker), 1)
														if (potentialEatenChecker.hasAttribute('status')) enemyQueenCheckers.splice(enemyQueenCheckers.indexOf(potentialEatenChecker), 1)

														//помечаем элементы, соответствующие клеткам, в которую походил и из которой походил данный игрок(пометка №2)
														markCurrentPlayer(blankPixel, PotentialEaterPixel, index, actPixBordColor)

														//проверка, можно ли съесть еще одну пешку этой же шашкой:
														flagPossibilityToEatEnemyChecker = getFlagPossibilityToEat([potentialEaterChecker], index);
														//если flagPossibilityToEatEnemyChecker == true, то передаем ход себе

														//Рассматриваем случай, что наша шашка, съев другую шашку, стала дамкой и может съесть еще одну шашку
														let flagPossibilityToEatEnemyCheckerForBornedQueen = false;
														if (([0, 7].includes(jOfPixel)) && (!potentialEaterChecker.hasAttribute('status'))) {
															//Изменяем внешний вид для новой дамки
															dressQueen(potentialEaterChecker, CurrentColor);
															//Добавляем новую дамку в массив всех дамок
															myQueenCheckers.push(potentialEaterChecker);
															//если новая дамка может съесть еще, то флаг "flagPossibilityToEatEnemyCheckerForBornedQueen" будет равен true
															flagPossibilityToEatEnemyCheckerForBornedQueen = getFlagPossibilityToEatForQueens([blankPixel.firstChild], index);
														}
														//Если данный игрок может съесть еще одну шашку противника
														if ((flagPossibilityToEatEnemyChecker) || (flagPossibilityToEatEnemyCheckerForBornedQueen)) {
															nextMove(myCheckers, EnemyCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, myQueenCheckers, enemyQueenCheckers, moveNum + 1, StartMoveColor);
														}
														else {
															//Если никого больше съесть нельзя, то снимаем пометки клеток от предыдущего хода противника
															unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);
															//передаем ход другому игроку
															nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					// ! 2 случай
					// ! Обычный ход без съедания шашек
					// ! Учет того, что нельзя ходить назад
					if ((!flagPossibilityToEatEnemyChecker) && (!flagPossibilityToEatEnemyCheckerForQueens)) {
						let jValue;
						if (downsideColor == 'white') {
							if (CurrentColor == 'black') jValue = -1;
							else jValue = 1;
						} else {
							if (CurrentColor == 'black') jValue = 1;
							else jValue = -1;
						}

						for (let j of [jValue]) {
							for (let i of [-1, 1]) {
								//индексы рассматриваемого пикселя, где, возможно, находится шашка данного игрока
								let newJ = jOfPixel + j;
								let newI = iOfPixel + i;

								//Пиксель, из которого хочет походить данный игрок в пиксель "blankPixel" должен быть в пределах доски
								if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
									//overlookedPixel - это предполагаемая клетка, которая имеет в себе шашку, 
									let overlookedPixel = document.getElementById(`${newJ}${newI}`);
									//Если клетка "overlookedPixel" помечена, как активная (а, значит, в ней должна находиться шашка данного игрока)
									if (overlookedPixel.dataset.indexColor == arrIndexColor[index]) {
										//шашка, которой хочет походить данный игрок
										let activeChecker = overlookedPixel.firstChild;

										//случай, когда данный игрок походил шашкой на последнюю горизонталь и превратился в дамку
										if (([0, 7].includes(jOfPixel)) && (!activeChecker.hasAttribute('status'))) {
											dressQueen(activeChecker, CurrentColor);
											myQueenCheckers.push(activeChecker)
										}
										//перемещаем шашку в новую клетку
										blankPixel.append(activeChecker);

										//помечаем цветом клетку, куда походили (пометка №1)
										markCurrentPlayer(blankPixel, overlookedPixel, index, actPixBordColor);
										// снимаем пометки для предыдущего игрока
										unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);
										//передаем ход другому игроку
										nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
									}
								}
							}
						}
					}
					//! 3 случай
					//! Обработка клеток, куда хотят походить ДАМКОЙ
					// Идея: найти ближайшую шашку по четырем диагонялям. если она окажется дамкой данного игрока 
					// и находится на расстоянии больше одной клетки от рассматриваемой клетки "blankPixel", то походить ей
					if (!flagPossibilityToEatEnemyCheckerForQueens) {
						for (let j of [-1, 1]) {
							for (let i of [-1, 1]) {
								forIndexK1: for (let k of [1, 2, 3, 4, 5, 6, 7]) {

									let newJ = jOfPixel + k * j;
									let newI = iOfPixel + k * i;

									if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {
										// overlookedPixel - это предполагаемая клетка, которая имеет в себе дамку, 
										// которой хотят походить в клетку "blankPixel")
										let overlookedPixel = document.getElementById(`${newJ}${newI}`);


										if (overlookedPixel.hasChildNodes()) {
											// шашка, которой хотят походить
											let potentialQueenChecker = overlookedPixel.firstChild;
											// если эта шашка является дамкой и она является дамкой данного игрока
											if (overlookedPixel.firstChild.hasAttribute('status') &&
												overlookedPixel.firstChild.classList.contains(`board__check_${arrIndexColor[index]}`)) {
												// если данный игрок хочет походить этой дамкой 
												if ((overlookedPixel.style.borderColor = actPixBordColor) && (overlookedPixel.dataset.indexColor == arrIndexColor[index])) {
													blankPixel.append(potentialQueenChecker);
													markCurrentPlayer(blankPixel, overlookedPixel, index, actPixBordColor);
													// снимаем пометки для предыдущего игрока
													unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);
													// передаем ход другому игроку
													nextMove(EnemyCheckers, myCheckers, 1 - index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, enemyQueenCheckers, myQueenCheckers, moveNum + 1, StartMoveColor);
												}
											} else break forIndexK1;
										}
									} else break forIndexK1;
								}
							}
						}
					}
					// ! 4 случай
					// ! Ход, на котором ДМАКА съедает шашку
					for (let j of [-1, 1]) {
						for (let i of [-1, 1]) {
							forIndexK2: for (let k of [1, 2, 3, 4, 5, 6]) {
								let newJ = jOfPixel + k * j;
								let newI = iOfPixel + k * i;
								if ((0 <= newJ) && (newJ < 8) && (0 <= newI) && (newI < 8)) {

									// клетка, на которой, возможно находится шашка противника, которую, возможно, съест дамка данного игрока
									let potentialEatenCheckerParent = document.getElementById(`${newJ}${newI}`);

									if (potentialEatenCheckerParent.hasChildNodes()) {
										// шашка внутри клетки "potentialEatenCheckerParent"
										let potentialEatenChecker = potentialEatenCheckerParent.firstChild;
										// Если шашка potentialEatenChecker является шашкой противника
										if (potentialEatenChecker.classList.contains(`board__check_${arrIndexColor[1 - index]}`)) {
											//Поиск потенциальной дамки данного игрока за шашкой противника "potentialEatenChecker"
											for (let r of arange(k + 1, 8)) {

												let newJmyQueen = jOfPixel + r * j;
												let newImyQueen = iOfPixel + r * i;
												// потенциальная дамка должна быть в пределах доски
												if ((0 <= newJmyQueen) && (newJmyQueen < 8) && (0 <= newImyQueen) && (newImyQueen < 8)) {

													// клетка, в которой может находиться дамка данного игрока
													let myPossibleQueenCheckerParent = document.getElementById(`${newJmyQueen}${newImyQueen}`);
													// проверка наличия шашки в этой клетке
													if (myPossibleQueenCheckerParent.hasChildNodes()) {
														let myPossibleQueenChecker = myPossibleQueenCheckerParent.firstChild;

														//Если эта шашка является дамкой, и если она является дамкой данного игрока.
														if (myPossibleQueenChecker.hasAttribute('status') && (myPossibleQueenChecker.classList.contains(`board__check_${arrIndexColor[index]}`)) && (myPossibleQueenCheckerParent.style.borderColor == actPixBordColor)) {
															//перемещаем дамку данного игрока, изменяем соответствующие массивы
															blankPixel.append(myPossibleQueenChecker);
															potentialEatenCheckerParent.innerHTML = '';
															if (potentialEatenChecker.hasAttribute('status')) enemyQueenCheckers.splice(enemyQueenCheckers.indexOf(potentialEatenChecker), 1)
															EnemyCheckers.splice(EnemyCheckers.indexOf(potentialEatenChecker), 1)
															// проверяем возможность съедания еще одной шашки этой дамкой
															flagPossibilityToEatEnemyCheckerForQueens = getFlagPossibilityToEatForQueens([myPossibleQueenChecker], index);
															//если это возможно, то передаем ход себе
															markCurrentPlayer(blankPixel, myPossibleQueenCheckerParent, index, actPixBordColor)
															if (flagPossibilityToEatEnemyCheckerForQueens) {
																nextMove(myCheckers, EnemyCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, myQueenCheckers, enemyQueenCheckers, moveNum + 1, StartMoveColor);
															}
															else {
																unmarkPreviousPlayer(myCheckers, arrWorkPixels, index, inactPixBordColor);
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
						}
					}
				}
			}
		}//! обработка клеток, куда хотят походить
	}
}


const arrIndexColor = ['white', 'black'];
const whiteChecker = createWhiteChecker();
const blackChecker = createBlackChecker();
const moveNumStart = 1;


let arrWorkPixels;
let par_1, par_2;
let numOfStartLines = 3;
let numOfStartCheckers = 8;
let index;
let startBoardPosition;
let arrBlackPixels, arrWhitePixels;
let arrWhiteCheckers, arrBlackCheckers;
let actPixBordColor = 'rgb(255, 0, 0)', inactPixBordColor;

// ставить ExpMode = true, если хотим исправлять ошибки или задавать свою стартовую позицию
const ExpMode = false;
// const ExpMode = true;

let jTurning = { 'white': { 'white': 0, 'black': 7 }, 'black': { 'white': 7, 'black': 0 } };
let whiteQueenCheckers = [], blackQueenCheckers = [];


function makeStartPosition(blackPixClassName, whitePixClassName, downsideColor, colorWorkPixels, expMode = false) {
	document.body.innerHTML = '';
	// Отрисовываем клетки доски
	setBoardPixels();

	arrBlackPixels = document.querySelectorAll('.' + blackPixClassName);
	arrWhitePixels = document.querySelectorAll('.' + whitePixClassName);
	inactPixBordColor = getComputedStyle(arrWhitePixels[0]).borderColor;

	if (colorWorkPixels == 'white') {
		par_1 = 0;
		par_2 = 1;
	} else {
		par_1 = 1;
		par_2 = 0;
	}
	
	// Расставляем шашки белых и черных, помещая их в массивы
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
	let color1 = getComputedStyle(checker.firstChild).backgroundColor;
	checker.removeChild(checker.firstChild);
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

function newGame(StartMoveColor, downsideColor, colorWorkPixels) {
	let flag = confirm("Начать новую игру?");
	if (flag) PlayGame(StartMoveColor, downsideColor, colorWorkPixels);
}

// Поменять цвет
function changeColor(StartMoveColor, downsideColor, colorWorkPixels) {

	let flag = confirm("Вы хотите сменить цвет?");
	if (flag) PlayGame(arrIndexColor[1 - arrIndexColor.indexOf(StartMoveColor)], downsideColor, colorWorkPixels);
}

// Перевернуть доску
function flipBoard(StartMoveColor, downsideColor) {
	let flag = confirm("Вы хотите перевернуть доску?");
	if (flag) PlayGame(StartMoveColor, arrIndexColor[1 - arrIndexColor.indexOf(downsideColor)], colorWorkPixels);
}

// Сменить цвет рабочих клеток
function changeColorOfWorkPixels(StartMoveColor, downsideColor, colorWorkPixels) {
	let flag = confirm("Вы хотите сменить цвет рабочих клеток?");
	if (flag) PlayGame(StartMoveColor, downsideColor, arrIndexColor[1 - arrIndexColor.indexOf(colorWorkPixels)]);
}
// Начать игру
function PlayGame(StartMoveColor, downsideColor = 'white', colorWorkPixels = 'white') {

	let index = arrIndexColor.indexOf(StartMoveColor);
	document.body.innerHTML = document_body_innerHTML_INIT; // Стираю все изменения в HTML из JS 

	makeStartPosition('board__pixel_black', 'board__pixel_white', downsideColor, colorWorkPixels, ExpMode);
	// Смотрю, есть ли в стартовой позиции дамки
	if (ExpMode) CheckinfForQueensAtStart(arrWhiteCheckers, arrBlackCheckers, jTurning, downsideColor);

	// Добавляю опции для пользователя
	setupButtnos(StartMoveColor, downsideColor, colorWorkPixels);

	if (StartMoveColor == 'black') nextMove(arrBlackCheckers, arrWhiteCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, blackQueenCheckers, whiteQueenCheckers, moveNumStart);
	else nextMove(arrWhiteCheckers, arrBlackCheckers, index, arrWorkPixels, actPixBordColor, inactPixBordColor, downsideColor, whiteQueenCheckers, blackQueenCheckers, moveNumStart, StartMoveColor);


}

// Задаем действия при нажатии на кнопки
function setupButtnos(StartMoveColor, downsideColor, colorWorkPixels) {
	let buttonNewGame = document.querySelector('[name="new-game"]');
	let buttonChangeColor = document.querySelector('[name="change-color"]');
	let buttonChangeColorWorkPixels = document.querySelector('[name="change-color-work-pixels"]');
	console.log(buttonChangeColorWorkPixels);
	let buttonflipBoard = document.querySelector('[name="flip-board"]');
	buttonNewGame.addEventListener('click', newGame.bind(null, StartMoveColor, downsideColor, colorWorkPixels));
	buttonChangeColor.addEventListener('click', changeColor.bind(null, StartMoveColor, downsideColor, colorWorkPixels));
	buttonflipBoard.addEventListener('click', flipBoard.bind(null, StartMoveColor, downsideColor, colorWorkPixels));
	buttonChangeColorWorkPixels.addEventListener('click', changeColorOfWorkPixels.bind(null, StartMoveColor, downsideColor, colorWorkPixels));
}

// цвет игрока, который ходит первым
let StartMoveColor = 'white';
// let StartMoveColor = 'black';

// цвет игрока внизу
let downsideColor = 'white';
// let downsideColor = 'black';

// цвет рабочих клеток
// let colorWorkPixels = 'white';
let colorWorkPixels = 'black';

PlayGame(StartMoveColor, downsideColor, colorWorkPixels);

