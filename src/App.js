import { useState } from "react";
import "./styles/index.css";

function App() {
  const [step, setStep] = useState("x");

  const symbolX = "x";
  const symbolO = "o";
  const [playFields, setPlayFields] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [winner, setWinner] = useState();

  const resetGame = () => {
    setPlayFields ([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ])
    setStep('x');
    setWinner();
  }

  const winnerSymbol = winner ? playFields[winner[0]] : null;

  const getSymbolClassName = (symbol) => {
    if (symbol === symbolO) {
      return "symbol-x";
    } else {
      return "symbol-o";
    }
  };

  const isWin = (playFields) => {
    const winOptions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winOptions.length; i++) {
      const [a, b, c] = winOptions[i];
      if (
        playFields[a] &&
        playFields[a] === playFields[b] &&
        playFields[a] === playFields[c]
      ) {
        return [a, b, c];
      }
    }
  };

  const handleClick = (index) => {
    if (playFields[index] || winner) {
      return;
    }
    const playFieldsCopy = [...playFields];
    playFieldsCopy[index] = step;
    setPlayFields(playFieldsCopy);
    if (step === "x") {
      setStep("o");
    } else setStep("x");

    setWinner(isWin(playFieldsCopy));
  };

  return (
    <div className="App">
      <div className="play-info">
        {winnerSymbol ? "Победитель" : "Ход"}
        <span
          className={`step-now ${
            winnerSymbol ? '' : getSymbolClassName(step)
          }`}
        >
          {winnerSymbol ?? step}
        </span>
      </div>
      <div className="play-field">
        {playFields.map((elm, index) => {
          const winnerCells = winner?.includes(index);
          return (
            <button
              onClick={() => handleClick(index)}
              key={index}
              className={`play-field-elm ${winnerCells ? "winner-cells" : ""}`}
            >
              <span className={`symbol ${getSymbolClassName(elm)}`}>
                {elm ? elm : null}
              </span>
            </button>
          );
        })}
      </div>
      <button onClick={resetGame} className="reset">Сбросить</button>
    </div>
  );
}

export default App;
