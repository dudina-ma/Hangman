import React from "react";

import Header from './Header';
import GamePicture from './GamePicture';
import CategoryChoice from "./CategoryChoice";
import GameField from "./GameField";

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'startScreen',
			chosenCategory: Object.keys(this.props.wordsToGuess)[0],
		}
		this.showCategoryChoiceScreen = this.showCategoryChoiceScreen.bind(this);
		this.chooseCategory = this.chooseCategory.bind(this);
		this.startNewGame = this.startNewGame.bind(this);
		this.showHint = this.showHint.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	showCategoryChoiceScreen() {
		this.setState({
			screen: 'categoryChoice',
		})
	}

	chooseWordToGuess() {
		let wordsArray = this.props.wordsToGuess[this.state.chosenCategory];

		let randomIndex = Math.floor(Math.random() * wordsArray.length);
		return wordsArray[randomIndex];
	}

	chooseCategory(chosenCategory) {
		this.setState({
			chosenCategory,
		})
	}

	checkIfWon() {
		return this.state.guessedLettersNumber === this.state.wordToGuess.length;
	}

	checkIfLost() {
		const triesNumber = 6;
		return this.state.misses === triesNumber;
	}

	startNewGame() {
		this.setState({
			screen: 'gameField',
			guessedLettersNumber: 0,
			misses: 0,
			guessedLetters: new Set(),
			pressedLetters: new Set(),
			wordToGuess: this.chooseWordToGuess(),
			hintIsUsed: false,
		})
	}

	showHint() {
		let letterHint;

		do {
			let randomIndex = Math.floor(Math.random() * this.state.wordToGuess.length);
			letterHint = this.state.wordToGuess[randomIndex];
		} while (this.state.guessedLetters.has(letterHint));

		let newPressedLetters = new Set(this.state.pressedLetters);
		newPressedLetters.add(letterHint);

		let newGuessedLetters = new Set(this.state.guessedLetters);
		newGuessedLetters.add(letterHint);

		this.setState({
			pressedLetters: newPressedLetters,
			guessedLetters: newGuessedLetters,
			hintIsUsed: true,
		});
	}

	onClick(guessLetter) {
		let newPressedLetters = new Set(this.state.pressedLetters);
		newPressedLetters.add(guessLetter);

		this.setState({
			pressedLetters: newPressedLetters,
		})

		let isGuessed;

		let guessLetterNumber = 0;

		for (let char of this.state.wordToGuess) {

			if (char === guessLetter) {
				guessLetterNumber++;
				isGuessed = true;
			}
		}

		let shouldStartNewGame;

		if (isGuessed) {
			let newGuessedLetters = new Set(this.state.guessedLetters);
			newGuessedLetters.add(guessLetter);
			this.setState(state => ({
				guessedLettersNumber: state.guessedLettersNumber + guessLetterNumber,
				guessedLetters: newGuessedLetters,
			}), () => {
				if (this.checkIfWon()) {
					setTimeout(() => {
						shouldStartNewGame = window.confirm('Вы выиграли! Сыграете еще раз?');
						if (shouldStartNewGame) {
							this.startNewGame();
						}
					}, 0);

				}
			});
		} else {
			this.setState(state => ({
				misses: state.misses + 1,
			}), () => {
				if (this.checkIfLost()) {
					setTimeout(() => {
						shouldStartNewGame = window.confirm('Вы проиграли( Сыграете еще раз?');
						if (shouldStartNewGame) {
							this.startNewGame();
						}
					}, 0);
				}
			});
		}

		// притащить свой модал
	}

	render() {
		return (
			<>
				<Header showCategoryChoiceScreen={this.showCategoryChoiceScreen}/>
				{this.state.screen === 'startScreen' && <GamePicture />}
				{this.state.screen === 'categoryChoice' &&
					<CategoryChoice
						chosenCategory={this.state.chosenCategory}
						wordsToGuess={this.props.wordsToGuess}
						startNewGame={this.startNewGame}
						chooseCategory={this.chooseCategory}
						categoryLocalizedNames={CATEGORY_LOCALIZED_NAMES}/>}
				{this.state.screen === 'gameField' &&
					<GameField
						wordToGuess={this.state.wordToGuess}
						chosenCategory={this.state.chosenCategory}
						categoryLocalizedNames={CATEGORY_LOCALIZED_NAMES}
						guessedLetters={this.state.guessedLetters}
						pressedLetters={this.state.pressedLetters}
						misses={this.state.misses}
						startNewGame={this.startNewGame}
						hintIsUsed={this.state.hintIsUsed}
						showHint={this.showHint}
						onClick={this.onClick} />}
			</>
		)
	}
}

const CATEGORY_LOCALIZED_NAMES = {
    sport: 'спорт',
    animals: 'животные',
    plants: 'растения',
    closes: 'одежда',
    countries: 'страны',
    food: 'еда',
    different: 'разное',
}