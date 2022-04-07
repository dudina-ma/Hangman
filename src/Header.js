import React from "react";

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<h1 className="game-name">Игра "Виселица"</h1>
				<div className="game-controls">
					<button onClick={this.props.showCategoryChoiceScreen} className="choose-category">Выбрать категорию</button>
					<button className="show-rules">Показать правила</button>
				</div>
			</header>
		)
	}
}