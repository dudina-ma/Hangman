import React from "react";

export default class CategoryChoice extends React.Component {
	constructor(props) {
		super(props);
		this.changeCategory = this.changeCategory.bind(this);
	}
	categories = Object.keys(this.props.wordsToGuess);
	categoryNames = this.categories.map((category) =>
	  <option key={category} value={category}>{CATEGORYLOCALIZEDNAMES[category]}</option>
	);

	changeCategory(event) {
		this.props.changeCategory(event.target.value);
	}

	render() {
		return (
			<div className="categories-container">
				<select className="categories" name="categories" value={this.props.chosenCategory} onChange={this.changeCategory}>
					{this.categoryNames}
				</select>
				<button onClick={this.props.startGame} className="game-start">Начать игру</button>
			</div>
		)
	}
}

const CATEGORYLOCALIZEDNAMES = {
    sport: 'спорт',
    animals: 'животные',
    plants: 'растения',
    closes: 'одежда',
    countries: 'страны',
    food: 'еда',
    different: 'разное',
}