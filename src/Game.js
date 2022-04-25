import React from "react";

import Header from './Components/Header/Header';
import GamePicture from './Components/GamePicture/GamePicture';
import CategoryChoice from "./Components/CategoryChoice/CategoryChoice";
import GameField from "./Components/GameField/GameField";
import Description from "./Description";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import screenTypes from "./ScreenTypes";

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: screenTypes.startScreen,
			chosenCategory: Object.keys(this.props.wordsToGuess)[0],
		};
		this.showCategoryChoiceScreen = this.showCategoryChoiceScreen.bind(this);
		this.chooseCategory = this.chooseCategory.bind(this);
		this.startNewGame = this.startNewGame.bind(this);
		this.onCategoryChosen = this.onCategoryChosen.bind(this);
		this.showHint = this.showHint.bind(this);
		this.checkChosenLetter = this.checkChosenLetter.bind(this);
		this.pressDescriptionButton = this.pressDescriptionButton.bind(this);
	}

	showCategoryChoiceScreen() {
		this.setState({
			screen: screenTypes.categoryChoice,
		});
	}

	chooseWordToGuess() {
		const wordsArray = this.props.wordsToGuess[this.state.chosenCategory];

		const randomIndex = Math.floor(Math.random() * wordsArray.length);
		return wordsArray[randomIndex];
	}

	chooseCategory(chosenCategory) {
		this.setState({
			chosenCategory,
		});
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
			screen: screenTypes.gameField,
			guessedLettersNumber: 0,
			misses: 0,
			guessedLetters: new Set(),
			pressedLetters: new Set(),
			wordToGuess: this.chooseWordToGuess(),
			hintIsUsed: false,
		});
	}

	onCategoryChosen(chosenCategory) {
		this.setState({
			chosenCategory,
		});
		this.startNewGame();
	}

	pressDescriptionButton() {
		if (this.state.screen !== screenTypes.description) {
			this.setState({
				screen: screenTypes.description,
				preScreen: this.state.screen,
			})
		} else {
			this.setState({
				screen: this.state.preScreen,
			})
		}
	}

	showHint() {
		let letterHint;

		do {
			const randomIndex = Math.floor(Math.random() * this.state.wordToGuess.length);
			letterHint = this.state.wordToGuess[randomIndex];
		} while (this.state.guessedLetters.has(letterHint));

		const newPressedLetters = new Set(this.state.pressedLetters);
		newPressedLetters.add(letterHint);

		const newGuessedLetters = new Set(this.state.guessedLetters);
		newGuessedLetters.add(letterHint);

		this.setState({
			pressedLetters: newPressedLetters,
			guessedLetters: newGuessedLetters,
			hintIsUsed: true,
			guessedLettersNumber: this.state.guessedLettersNumber + 1,
		});
	}

	checkChosenLetter(guessLetter) {
		const newPressedLetters = new Set(this.state.pressedLetters);
		newPressedLetters.add(guessLetter);

		this.setState({
			pressedLetters: newPressedLetters,
		});

		let isGuessed;

		let guessLetterNumber = 0;

		for (let char of this.state.wordToGuess) {
			if (char === guessLetter) {
				guessLetterNumber++;
				isGuessed = true;
			}
		}

		if (isGuessed) {
			const newGuessedLetters = new Set(this.state.guessedLetters);
			newGuessedLetters.add(guessLetter);
			this.setState(state => ({
				guessedLettersNumber: state.guessedLettersNumber + guessLetterNumber,
				guessedLetters: newGuessedLetters,
			}), () => {
				if (this.checkIfWon()) {
					confirmAlert({
						title: 'Новая игра',
						message: 'Вы выиграли! Сыграете еще раз?',
						buttons: [
							{
								label: 'Да',
								onClick: () => this.startNewGame()
							},
							{
								label: 'Нет',
								onClick: () => this.setState({screen: screenTypes.startScreen})
							}
						]
					});
				}
			});
		} else {
			this.setState(state => ({
				misses: state.misses + 1,
			}), () => {
				if (this.checkIfLost()) {
					setTimeout(() => {
						confirmAlert({
							title: 'Новая игра',
							message: 'Вы проиграли( Сыграете еще раз?',
							buttons: [
							  {
								label: 'Да',
								onClick: () => this.startNewGame()
							  },
							  {
								label: 'Нет',
								onClick: () => this.setState({screen: screenTypes.startScreen})
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
				{this.state.screen === screenTypes.startScreen && <GamePicture />}
				{this.state.screen === screenTypes.categoryChoice &&
					<CategoryChoice
						chosenCategory={this.state.chosenCategory}
						categories={Object.keys(this.props.wordsToGuess)}
						onCategoryChosen={this.onCategoryChosen}
						chooseCategory={this.chooseCategory}
						categoryLocalizedNames={CATEGORY_LOCALIZED_NAMES}/>}
				{this.state.screen === screenTypes.gameField &&
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
						checkChosenLetter={this.checkChosenLetter} />}
				{this.state.screen === screenTypes.description &&
					<Description
						pressDescriptionButton={this.pressDescriptionButton}/>}
			</>
		);
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
};