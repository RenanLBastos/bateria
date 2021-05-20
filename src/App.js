import React, {useState, useEffect} from 'react';

const sons = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];
const Button = props => (
  <button
    style={props.style}
    onClick={props.onClick}
    className="drum-pad"
    id={props.id}
  >
    {props.text}
    <audio
      keyCode={props.keyCode}
      src={props.src}
      className="clip"
      id={props.text}
    />
  </button>
);

function App () {
  const [color, setColor] = useState ('red');
  const [name, setName] = useState ('Heater-1');
  const teclado = sons.map (sons => (
    <Button
      id={sons.id}
      text={sons.keyTrigger}
      src={sons.url}
      keyCode={sons.keyCode}
      style={{backgroundColor: color}}
      onClick={playSound}
    />
  ));
  var randomColor = Math.floor (Math.random () * 16777215).toString (16);
  function playSound (e) {
    if (e.keyCode === sons.keyCode) {
      const sound = e.target.children[0];
      sound.currentTime = 0;
      sound.play ();
      document.querySelector ('h2').innerHTML = e.target.id;
      setColor ('#' + randomColor);
      setTimeout (function () {
        setColor ('#' + randomColor);
      }, 100);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handlePress (e) {
    // eslint-disable-next-line array-callback-return
    sons.map (sons => {
      if (e.keyCode === sons.keyCode) {
        const play = document.getElementById (sons.keyTrigger);
        play.currentTime = 0;
        play.play ();
        setName (sons.id);
        setColor ('#' + randomColor);
        setTimeout (function () {
          setColor ('#' + randomColor);
        }, 100);
      }
    });
  }
  useEffect (
    () => {
      document.addEventListener ('keydown', handlePress);
      return () => {
        // Limpa a assinatura antes do componente deixar a tela
        document.removeEventListener ('keydown', handlePress);
      };
    },
    [handlePress]
  );
  return (
    <div id="drum-machine">
      <div className="buttons">{teclado}</div>
      <div id="display" style={{backgroundColor: color}}>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default App;
