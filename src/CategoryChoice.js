import React from "react";

export default class CategoryChoice extends React.Component {
	constructor(props) {
		super(props);
		this.chooseCategory = this.chooseCategory.bind(this);
	}

	categories = Object.keys(this.props.wordsToGuess);
	categoryNames = this.categories.map((category) =>
	  <option key={category} value={category}>{this.props.categoryLocalizedNames[category]}</option>
	);

	chooseCategory(event) {
		this.props.chooseCategory(event.target.value);
	}

	render() {
		return (
			<div className="categories-container">
				<select className="categories" name="categories" value={this.props.chosenCategory} onChange={this.chooseCategory}>
					{this.categoryNames}
				</select>
				<button onClick={this.props.startNewGame} className="game-start">Начать игру</button>
			</div>
		)
	}
}