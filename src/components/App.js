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
  const [levelIndex, setLevelIndex] = useLocalStorage("levelIndex", 0);
  const [hintCount, setHintCount] = useLocalStorage("hintCount", 16);
  const [inputKeys, setInputKeys] = useLocalStorage("inputKeys", []);
  const [hintedKeys, setHintedKeys] = useLocalStorage("hintedKeys", []);
  const [correctGuess, setCorrectGuess] = useState(false);

  const level = data[levelIndex];

  const handleUseHint = () => {
    if (hintCount <= 0) {
      return;
    }

    const indicies = level.word
      .split("")
      .map((_, i) => i)
      .filter((i) => !hintedKeys[i]);

    if (!indicies.length) {
      return;
    }

    const index = indicies[Math.floor(Math.random() * indicies.length)];

    setHintedKeys(
      produce(hintedKeys, (draftHintedKeys) => {
        draftHintedKeys[index] = level.word[index];
      })
    );

    setHintCount(hintCount - 1);
  };

  useEffect(() => {
    soundsEnabled(true);
    loadSounds();
  }, []);

  useEffect(() => {
    if (inputKeys.join("") === level.word) {
      if (!correctGuess) {
        playSound(SOUND_WIN);
        setCorrectGuess(true);
      }
      setTimeout(() => {
        setLevelIndex((levelIndex) => levelIndex + 1);
        setInputKeys([]);
        setHintedKeys([]);
        setCorrectGuess(false);
        setHintCount((hintCount) => hintCount + 1);
      }, 1000);
    }
  }, [
    level.word,
    inputKeys,
    setLevelIndex,
    correctGuess,
    setHintCount,
    setHintedKeys,
    setInputKeys,
  ]);

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
      <Header
        levelNumber={levelIndex + 1}
        hintCount={hintCount}
        onUseHint={handleUseHint}
      />
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
