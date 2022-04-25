import React, { useState } from "react";
import './CategoryChoice.css';

export default function CategoryChoice(props) {
	const [category, setCategory] = useState(props.chosenCategory);

	const categoryNames = props.categories.map((category) =>
	  <option key={category} value={category}>{props.categoryLocalizedNames[category]}</option>
	);

	function onCategoryChosen() {
		props.onCategoryChosen(category);
	}

	return (
		<div className="categories-container">
			<select className="categories" name="categories" value={category} onChange={(event) => setCategory(event.target.value)}>
				{categoryNames}
			</select>
			<button onClick={onCategoryChosen} className="game-start">Начать игру</button>
		</div>
	);
}