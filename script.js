'use strict';

const displayResult = document.querySelector('.display__result');
const displayCalculation = document.querySelector('.display__calculation');
const btnClear = document.querySelector('.btn--clear');
const allBtnNums = Array.from(document.querySelectorAll('.btn__num'));
const allBtnOperators = Array.from(document.querySelectorAll('.btn__operator'));
const btnEquals = document.querySelector('.btn--equals');
const btnDelete = document.querySelector('.btn--del');
const btnPercent = document.querySelector('.btn--percent');

let str1 = ''; // string
let str2 = '';
let answer = '';
let operator;
let symbol;
let operatorClick = 0;

// to extract display info
// allBtns.forEach((btn) => console.log(btn.classList[1].replace(/btn--/g, '')));

// function that populates display when you click on the number btns
// store the 'display value' into a variable

// store the first number that is input into the calculator when uer presses an operator
// and save which operation has been chosen, then oerate() when user presses =

const operate = function (str1, str2, operator) {
	const num1 = +str1;
	const num2 = +str2;

	const result =
		operator === 'add'
			? num1 + num2
			: operator === 'subtract'
			? num1 - num2
			: operator === 'multiply'
			? num1 * num2
			: operator === 'divide'
			? num1 / num2
			: (displayResult.textContent = 0);

	displayValue(result);
	str1 = result;
	str2 = operator = '';
	return result;
};

// display value on screen
const displayValue = function (val) {
	displayResult.textContent = val;
};

btnDelete.addEventListener('click', function () {
	if (str1 && !operator) {
		str1 = str1.slice(0, -1);
		displayCalculation.textContent = str1;
	} else if (str2 && operator) {
		str2 = str2.slice(0, -1);
		displayCalculation.textContent = str1 + symbol + str2;
	} else return;
});

btnPercent.addEventListener('click', function () {
	if (str1 && !operator) {
		str1 = +str1 / 100;
		displayCalculation.textContent = str1;
	} else if (str2 && operator) {
		str2 = +str2 / 100;
		displayCalculation.textContent = str1 + symbol + str2;
	} else return;
});

btnClear.addEventListener('click', function () {
	str1 = str2 = operator = '';
	displayResult.textContent = 0;
	displayCalculation.textContent = '';
});

allBtnNums.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		let clicked = e.target.classList[2].replace(/btn--/g, '');
		if (!operator) {
			if (!str1 && clicked === '0') {
				// no leading zeros
				return;
			} else {
				str1 += clicked;
				displayCalculation.textContent = str1;
			}
		} else if (operator) {
			str2 += clicked;
			displayCalculation.textContent = str1 + symbol + str2;
		} else {
			return;
			// console.error('oops, an error has occured...');
		}
	});
});

allBtnOperators.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		let clicked = e.target.classList[2].replace(/btn--/g, '');
		operator = clicked;

		symbol =
			operator === 'divide'
				? '\u00F7'
				: operator === 'multiply'
				? '\u2715'
				: operator === 'subtract'
				? '\u002D'
				: operator === 'add'
				? '\u002B'
				: 'oops! 2';

		if (!str2) {
			displayCalculation.textContent = str1 + symbol;
		} else if (str2) {
			answer = operate(str1, str2, operator);
			displayCalculation.textContent = answer + symbol;
			str1 = answer;
			str2 = '';
		}
	});
});

btnEquals.addEventListener('click', function () {
	answer = operate(str1, str2, operator);
	str1 = answer;
	str2 = operator = '';
	operatorClick = 1;
});
