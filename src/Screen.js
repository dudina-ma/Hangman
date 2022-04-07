import React from "react";

export default class Screen extends React.Component {
	render() {
		return (
			<main>
				<div className="game-description hidden">
					<p>В виселице вам предстоит угадывать слова по буквам. Известно только количество букв и тематика, которую вы выбрали.<br /> В игре 7 категорий:</p>
					<ul>
						<li>спорт</li>
						<li>животные</li>
						<li>растения</li>
						<li>одежда</li>
						<li>страны</li>
						<li>еда</li>
						<li>разное</li>
					</ul>
					<p>В каждой категории 10 слов. Если вы указали букву, которая есть в слове, то она появляется в поле с загаданным словом. Если отсутствует - то на виселице рисуется часть человечка, и так до тех пор, пока он не будет нарисован полностью.</p>
				</div>

				<div className="game hidden">
					<div className="man-picture"></div>

					<div className="word-container">
						<div className="word-to-guess"></div>
					</div>

					<div className="category-info">
						<span>Выбрана категория: </span><br /><span className="chosen-category-info"></span>
					</div>

					<div className="alfabet">
						<button className="letter" data-letter-value="а">а</button>
						<button className="letter" data-letter-value="б">б</button>
						<button className="letter" data-letter-value="в">в</button>
						<button className="letter" data-letter-value="г">г</button>
						<button className="letter" data-letter-value="д">д</button>
						<button className="letter" data-letter-value="е">е</button>
						<button className="letter" data-letter-value="ё">ё</button>
						<button className="letter" data-letter-value="ж">ж</button>
						<button className="letter" data-letter-value="з">з</button>
						<button className="letter" data-letter-value="и">и</button>
						<button className="letter" data-letter-value="й">й</button>
						<button className="letter" data-letter-value="к">к</button>
						<button className="letter" data-letter-value="л">л</button>
						<button className="letter" data-letter-value="м">м</button>
						<button className="letter" data-letter-value="н">н</button>
						<button className="letter" data-letter-value="о">о</button>
						<button className="letter" data-letter-value="п">п</button>
						<button className="letter" data-letter-value="р">р</button>
						<button className="letter" data-letter-value="с">с</button>
						<button className="letter" data-letter-value="т">т</button>
						<button className="letter" data-letter-value="у">у</button>
						<button className="letter" data-letter-value="ф">ф</button>
						<button className="letter" data-letter-value="х">х</button>
						<button className="letter" data-letter-value="ц">ц</button>
						<button className="letter" data-letter-value="ч">ч</button>
						<button className="letter" data-letter-value="ш">ш</button>
						<button className="letter" data-letter-value="щ">щ</button>
						<button className="letter" data-letter-value="ъ">ъ</button>
						<button className="letter" data-letter-value="ы">ы</button>
						<button className="letter" data-letter-value="ь">ь</button>
						<button className="letter" data-letter-value="э">э</button>
						<button className="letter" data-letter-value="ю">ю</button>
						<button className="letter" data-letter-value="я">я</button>
					</div>

					<button className="hint">Подсказка</button>
					<button className="game-start">Новая игра</button>
				</div>
			</main>
		)
	}

}