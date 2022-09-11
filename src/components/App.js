import { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import data from "../assets/data.json";
import produce from "immer";
import Keyboard from "./Keyboard";
import Header from "./Header";
import Input from "./Input";
import Display from "./Display";
import { useLocalStorage } from "../hooks";
import { loadSounds, playSound, soundsEnabled, SOUND_WIN } from "../sounds";

function App() {
  const [levelIndex, setLevelIndex] = useLocalStorage("LEVEL_INDEX", 0);
  const [inputKeys, setInputKeys] = useState([]);
  const [hintedKeys, setHintedKeys] = useState([]);
  const [correctGuess, setCorrectGuess] = useState(false);

  const level = data[levelIndex];

  useEffect(() => {
    soundsEnabled(true);
    loadSounds();
  }, []);

  useEffect(() => {
    setHintedKeys(Array(level.word.length).fill(null));

    const interval = setInterval(() => {
      if (!document.hasFocus()) {
        return;
      }
      setHintedKeys((hintedKeys) => {
        const indicies = hintedKeys
          .map((value, i) => [value, i])
          .filter(([value, _]) => !value)
          .map(([_, i]) => i);
        if (indicies.length <= level.word.length / 2) {
          return hintedKeys;
        }
        if (!indicies.length) {
          return hintedKeys;
        }
        const index = indicies[Math.floor(Math.random() * indicies.length)];
        return produce(hintedKeys, (draftHintedKeys) => {
          draftHintedKeys[index] = level.word[index];
        });
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [level.word]);

  useEffect(() => {
    if (inputKeys.join("") === level.word) {
      if (!correctGuess) {
        playSound(SOUND_WIN);
        setCorrectGuess(true);
      }
      setTimeout(() => {
        setLevelIndex((levelIndex) => levelIndex + 1);
        setInputKeys([]);
        setCorrectGuess(false);
      }, 1000);
    }
  }, [level.word, inputKeys, setLevelIndex, correctGuess]);

  const handleKeyPress = (key) => {
    setInputKeys(
      produce(inputKeys, (draftInputKeys) => {
        if (key === "<") {
          draftInputKeys.pop();
          return;
        }
        if (draftInputKeys.length < level.word.length) {
          draftInputKeys.push(key);
        }
      })
    );
    return;
  };

  return (
    <div className="App">
      <Header levelNumber={levelIndex + 1} />
      <TransitionGroup className="display-container">
        <CSSTransition
          key={levelIndex}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="move"
        >
          <Display hints={level.hints}>
            <Input
              maxLength={level.word.length}
              keys={inputKeys}
              hintedKeys={hintedKeys}
              isCorrect={correctGuess}
            />
          </Display>
        </CSSTransition>
      </TransitionGroup>

      <Keyboard disabled={correctGuess} onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
