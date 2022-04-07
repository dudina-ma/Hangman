import React from "react";

import Header from './Header';
import GamePicture from './GamePicture';
import CategoryChoice from "./CategoryChoice";

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'startScreen',
			guessedLettersNumber: 0,
			misses: 0,
			chosenCategory: Object.keys(this.props.wordsToGuess)[0],
		}
		this.showCategoryChoiceScreen = this.showCategoryChoiceScreen.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
	}

	showCategoryChoiceScreen() {
		this.setState({
			screen: 'categoryChoice',
		})
	}

	startGame() {

	}

	changeCategory(chosenCategory) {
		this.setState({
			chosenCategory,
		})
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
						startGame={this.startGame}
						changeCategory={this.changeCategory}/>}
			</>
		)
	}
}