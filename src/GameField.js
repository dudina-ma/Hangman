import React from "react";

export default class GameField extends React.Component {
	constructor(props) {
		super(props);
		this.onClick=this.onClick.bind(this);
	}

	alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
	alphabetLetters = this.alphabet.split('');

	onClick(event) {
		this.props.onClick(event.target.dataset.letterValue);
	}

	render() {
		const letters = this.props.wordToGuess.split('');
		const lettersDivs = letters.map((letter) =>
	  		<div className="word-letter">{this.props.guessedLetters.has(letter) ? letter : ''}</div>
		);

		const alphabetLettersButtons = this.alphabetLetters.map((letter) =>
	  		<button className="letter" disabled={this.props.pressedLetters.has(letter)} data-letter-value={letter}>{letter}</button>
		);

		return (
			<>
				<div className="game">
					<div className={"man-picture misses-" + this.props.misses} />

					<div className="word-container">
						<div className="word-to-guess">
							{lettersDivs}
						</div>
					</div>
				</div>

				<div className="category-info">Выбрана категория: {this.props.categoryLocalizedNames[this.props.chosenCategory]}</div>

				<div className="alphabet" onClick={this.onClick}>
					{alphabetLettersButtons}
				</div>

				<button onClick={this.props.showHint} disabled={this.props.hintIsUsed} className="hint">Подсказка</button>
				<button onClick={this.props.startNewGame} className="game-start">Новая игра</button>
				</>
		)
	}
}