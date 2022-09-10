import { useState, useEffect, useMemo } from "react";
import data from "../data/data.json";
import produce from "immer";
import Keyboard from "./Keyboard";
import Header from "./Header";
import Input from "./Input";
import HintsDisplay from "./HintsDisplay";

function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [inputKeys, setInputKeys] = useState([]);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [hintCount, setHintCount] = useState(0);

  const level = data[levelIndex];

  const hintedKeys = useMemo(() => {
    return level.word.slice(0, hintCount);
  }, [level.word, hintCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintCount(hintCount => hintCount + 1);
    }, 10000);
  
    return () => clearInterval(interval);
  }, [level.word, setHintCount]);

  useEffect(() => {
    if (inputKeys.join("") === level.word) {
      setInputDisabled(true);
      setTimeout(() => {
        setLevelIndex(levelIndex => levelIndex + 1);
        setInputKeys([]);
        setInputDisabled(false);
        setHintCount(0);
      }, 500);
    }
  }, [level.word, inputKeys, setLevelIndex]);

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
      <HintsDisplay hints={level.hints} />
      <Input maxLength={level.word.length} keys={inputKeys} hintedKeys={hintedKeys} />
      <Keyboard disabled={inputDisabled} onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
