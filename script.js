'use strict';

const displayResult = document.querySelector('.display__result');
const displayCalculation = document.querySelector('.display__calculation');
const btnClear = document.querySelector('.btn--clear');
const btnEquals = document.querySelector('.btn--equals');
const btnDelete = document.querySelector('.btn--del');
const btnPercent = document.querySelector('.btn--percent');
const allBtnNums = document.querySelectorAll('[data-num');
const allBtnOperators = document.querySelectorAll('[data-operator]');

let firstNum = '';
let secondNum = '';
let operator = '';
let operatorSymbol = '';

btnClear.addEventListener('click', function () {
	return allClear();
});

allBtnNums.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		const num = e.target.textContent;

		if (operator === '') {
			if (num === '.' && firstNum.includes('.')) return;
			firstNum += num;
		} else {
			if (num === '.' && secondNum.includes('.')) return;
			secondNum += num;
		}

		updateCalculationUI();
	});
});

allBtnOperators.forEach((btn) => {
	btn.addEventListener('click', function (e) {
		if (!firstNum || firstNum === '.' || secondNum === '.') return;
		if (secondNum && operator) {
			let result = operate(firstNum, secondNum, operator);
			firstNum = result;
			secondNum = '';
		}
		operator = e.target.dataset.operator;
		operatorSymbol = e.target.textContent;
		updateCalculationUI();
	});
});

btnEquals.addEventListener('click', function () {
	if (!operator || !secondNum || secondNum === '.') return;
	let answer = operate(firstNum, secondNum, operator);
	firstNum = answer;
	secondNum = '';
	operator = '';
});

btnDelete.addEventListener('click', function () {
	if (!operator) return;
	if (firstNum && !operator) {
		firstNum = firstNum.slice(0, -1);
	} else if (operator && secondNum) {
		secondNum = secondNum.slice(0, -1);
	} else return;
	updateCalculationUI();
});

btnPercent.addEventListener('click', function () {
	if (firstNum && !operator) {
		firstNum = +firstNum / 100;
	} else if (operator && secondNum) {
		secondNum = +secondNum / 100;
	} else return;
});

const allClear = function () {
	firstNum =
		secondNum =
		operator =
		operatorSymbol =
		displayResult.textContent =
		displayCalculation.textContent =
			'';
};
allClear();

const operate = function (firstNum, secondNum, operator) {
	firstNum = +firstNum;
	secondNum = +secondNum;

	const result =
		operator === 'add'
			? firstNum + secondNum
			: operator === 'subtract'
			? firstNum - secondNum
			: operator === 'multiply'
			? firstNum * secondNum
			: operator === 'divide'
			? firstNum / secondNum
			: console.log('something went wrong!!!');

	displayResult.textContent = result;
	firstNum = result;
	secondNum = '';
	operator = '';
	return result;
};

const updateCalculationUI = function () {
	displayCalculation.textContent = `${firstNum} ${operatorSymbol} ${secondNum}`;
};
