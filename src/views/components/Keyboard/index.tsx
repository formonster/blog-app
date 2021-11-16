import React, { useEffect, useState } from "react";
import CubeRounded from "@/views/components/CubeRounded";
import { css } from "@emotion/css";

const keyboardStyle = css`
  .keyboard-face {
    padding: 0.5vw;
  }
  .key {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: black;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.3vw;
    min-width: 2vw;
    padding: 0 0.5vw;
    height: 2vw;
    color: rgba(255, 255, 255, 0.5);
    /* box-shadow: 0 0 px 1px rgba(255, 255, 255, .6); */
  }
  .key.space {
    width: 7vw;
  }
  .key.key-sm {
  }
  .key.down {
    color: rgba(255, 255, 255, 1);
  }
`;

interface KeyboardProps {
  style?: React.CSSProperties;
}

const keyData = [
  [
    { label: "Esc", value: "Escape" },
    { label: "F1", value: "F1" },
    { label: "F2", value: "F2" },
    { label: "F3", value: "F3" },
    { label: "F4", value: "F4" },
    { label: "F5", value: "F5" },
    { label: "F6", value: "F6" },
    { label: "F7", value: "F7" },
    { label: "F8", value: "F8" },
    { label: "F9", value: "F9" },
    { label: "F10", value: "F10" },
    { label: "F11", value: "F11" },
    { label: "F12", value: "F12" },
  ],
  [
    { label: "`", value: "Backquote" },
    { label: "1", value: "Digit1" },
    { label: "2", value: "Digit2" },
    { label: "3", value: "Digit3" },
    { label: "4", value: "Digit4" },
    { label: "5", value: "Digit5" },
    { label: "6", value: "Digit6" },
    { label: "7", value: "Digit7" },
    { label: "8", value: "Digit8" },
    { label: "9", value: "Digit9" },
    { label: "0", value: "Digit0" },
    { label: "-", value: "Minus" },
    { label: "+/=", value: "Equal" },
    { label: "⌫", value: "Backspace", className: "flex-grow" },
  ],
  [
    { label: "⇥", value: "Tab", className: "flex-grow" },
    { label: "Q", value: "KeyQ" },
    { label: "W", value: "KeyW" },
    { label: "E", value: "KeyE" },
    { label: "R", value: "KeyR" },
    { label: "T", value: "KeyT" },
    { label: "Y", value: "KeyY" },
    { label: "U", value: "KeyU" },
    { label: "I", value: "KeyI" },
    { label: "O", value: "KeyO" },
    { label: "P", value: "KeyP" },
    { label: "[", value: "BracketLeft" },
    { label: "]", value: "BracketRight" },
    { label: "|", value: "Backslash" },
  ],
  [
    { label: "中/英", value: "CapsLock", className: "flex-grow" },
    { label: "A", value: "KeyA" },
    { label: "S", value: "KeyS" },
    { label: "D", value: "KeyD" },
    { label: "F", value: "KeyF" },
    { label: "G", value: "KeyG" },
    { label: "H", value: "KeyH" },
    { label: "J", value: "KeyJ" },
    { label: "K", value: "KeyK" },
    { label: "L", value: "KeyL" },
    { label: ";", value: "Semicolon" },
    { label: '"', value: "Quote" },
    { label: "⏎", value: "Enter", className: "flex-grow" },
  ],
  [
    { label: "⇧", value: "ShiftLeft", className: "flex-grow" },
    { label: "Z", value: "KeyZ" },
    { label: "X", value: "KeyX" },
    { label: "C", value: "KeyC" },
    { label: "V", value: "KeyV" },
    { label: "B", value: "KeyB" },
    { label: "N", value: "KeyN" },
    { label: "M", value: "KeyM" },
    { label: "<", value: "Comma" },
    { label: ">", value: "Period" },
    { label: "?", value: "Slash" },
    { label: "⇧", value: "ShiftRight", className: "flex-grow" },
  ],
  [
    { label: "fn", value: "ShiftLeft" },
    { label: "⌃", value: "ControlLeft" },
    { label: "⌥", value: "AltLeft" },
    { label: "⌘", value: "MetaLeft" },
    { label: "", value: "Space", className: "flex-grow" },
    { label: "⌘", value: "MetaRight" },
    { label: "⌥", value: "AltRight" },
    { label: "←", value: "ArrowLeft" },
    {
      label: (
        <>
          <p className="h-1/2" style={{ transform: "scale(.5)" }}>
            ↑
          </p>
          <p className="h-1/2" style={{ transform: "scale(.5)" }}>
            ↓
          </p>
        </>
      ),
      value: "Comma",
      className: "flex-col",
    },
    { label: "→", value: "ArrowRight" },
  ],
];

const Keyboard: React.FC<KeyboardProps> = function ({ style }) {
  const [downKeys, setDownKeys] = useState<string[]>([]);

  useEffect(() => {
    window.onkeydown = keydown;
    window.onkeyup = keyup;
    function keydown(e: KeyboardEvent) {
      if (downKeys.includes(e.code)) return;
      downKeys.push(e.code);
      setDownKeys([...downKeys]);
    }
    function keyup(e: KeyboardEvent) {
      const index = downKeys.findIndex((item) => item === e.code);
      downKeys.splice(index, 1);
      setDownKeys([...downKeys]);
    }
  }, []);

  return (
    <CubeRounded
      unit="vw"
      inset
      radius={1}
      className={`${keyboardStyle} absolute left-0 top-0`}
      width={30}
      height={0.5}
      depth={13}
      style={style}
      faceStyle={{
        backgroundColor: "#333333",
      }}
      faceTop={{
        style: {
          border: "1px solid rgba(255, 255, 255, .5)",
        },
        content: (
          <div className="absolute flex flex-col justify-between w-full h-full keyboard-face">
            {keyData.map((arr, i) => (
              <div key={i} className="flex justify-between">
                {arr.map(({ label, value, className = "" }) => (
                  <div
                    key={value}
                    className={`key ${className} ${
                      downKeys.includes(value) && "down"
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ),
      }}
    />
  );
};
export default Keyboard;
