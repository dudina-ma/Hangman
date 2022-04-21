import React from "react";

export default class CategoryChoice extends React.Component {
	constructor(props) {
		super(props);
		this.chooseCategory = this.chooseCategory.bind(this);
		this.onCategoryChosen = this.onCategoryChosen.bind(this);
		this.state = {
			chosenCategory: this.props.chosenCategory,
		}
	}

	categoryNames = this.props.categories.map((category) =>
	  <option key={category} value={category}>{this.props.categoryLocalizedNames[category]}</option>
	);

	chooseCategory(event) {
		this.setState({
			chosenCategory: event.target.value,
		});
	}

	onCategoryChosen() {
		this.props.onCategoryChosen(this.state.chosenCategory);
	}

	render() {
		return (
			<div className="categories-container">
				<select className="categories" name="categories" value={this.state.chosenCategory} onChange={this.chooseCategory}>
					{this.categoryNames}
				</select>
				<button onClick={this.onCategoryChosen} className="game-start">Начать игру</button>
			</div>
		)
	}
}