import React from "react";
import gameLogo from './images/game.jpg';

export default function GamePicture() {
	return (
		<img className="game-picture" src={gameLogo} alt="Картинка игры" />
	)
}