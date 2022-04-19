import React from "react";

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<h1 className="game-name">Игра "Виселица"</h1>
				<div className="game-controls">
					<button onClick={this.props.showCategoryChoiceScreen} className="choose-category">Выбрать категорию</button>
					<button onClick={this.props.pressDescriptionButton} className="show-rules">
						{this.props.screen === 'description' ? 'Скрыть правила' : 'Показать правила'}</button>
				</div>
			</header>
		)
	}
}