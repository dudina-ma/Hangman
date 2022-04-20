import React from "react";

import Header from './Header';
import GamePicture from './GamePicture';
import CategoryChoice from "./CategoryChoice";
import GameField from "./GameField";
import Description from "./Description";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'startScreen',
			chosenCategory: Object.keys(this.props.wordsToGuess)[0],
			rulesAreShown: false,
		}
		this.showCategoryChoiceScreen = this.showCategoryChoiceScreen.bind(this);
		this.chooseCategory = this.chooseCategory.bind(this);
		this.startNewGame = this.startNewGame.bind(this);
		this.showHint = this.showHint.bind(this);
		this.onClick = this.onClick.bind(this);
		this.pressDescriptionButton = this.pressDescriptionButton.bind(this);
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

	pressDescriptionButton() {
		if (!this.state.rulesAreShown) {
			this.setState({
				screen: 'description',
				preScreen: this.state.screen,
				rulesAreShown: true,
			})
		} else {
			this.setState({
				screen: this.state.preScreen,
				rulesAreShown: false,
			})
		}

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
						shouldStartNewGame = confirmAlert({
							title: 'Новая игра',
							message: 'Вы выиграли! Сыграете еще раз?',
							buttons: [
							  {
								label: 'Да',
								onClick: () => this.startNewGame()
							  },
							  {
								label: 'Нет',
								onClick: () => this.setState({screen: "startScreen"})
							  }
							]
						});
					}, 0);

				}
			});
		} else {
			this.setState(state => ({
				misses: state.misses + 1,
			}), () => {
				if (this.checkIfLost()) {
					setTimeout(() => {
						shouldStartNewGame = confirmAlert({
							title: 'Новая игра',
							message: 'Вы проиграли( Сыграете еще раз?',
							buttons: [
							  {
								label: 'Да',
								onClick: () => this.startNewGame()
							  },
							  {
								label: 'Нет',
								onClick: () => this.setState({screen: "startScreen"})
							  }
							]
						});
					}, 0);
				}
			});
		}
	}

	render() {
		return (
			<>
				<Header
					showCategoryChoiceScreen={this.showCategoryChoiceScreen}
					pressDescriptionButton={this.pressDescriptionButton}
					screen={this.state.screen}/>
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
				{this.state.screen === 'description' &&
					<Description
						pressDescriptionButton={this.pressDescriptionButton}/>}
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