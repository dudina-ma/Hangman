import React from "react";
import gameLogo from '../../images/game.jpg';
import './GamePicture.css';

export default function GamePicture() {
	return (
		<img className="game-picture" src={gameLogo} alt="Картинка игры" />
	);
}