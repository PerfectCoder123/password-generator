import React, { useState } from 'react';
import './temp.css';
import arrow from './components/right-arrow.png';
import copyGrey from './components/copy-grey.png';
import copyGreen from './components/copy.png';

export default function PasswordContainer() {

  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState();
  const [copy,SetCopy] = useState(copyGrey);

  const generatePassword = () => {
    let characters = "";
    while (characters.length < parseInt(passwordLength)) {
      let num = Math.floor(Math.random() * 91) + 33;
      if (isValidNumber(num)) characters += String.fromCharCode(num);
    }
    setPassword(characters);
    console.log(characters);
  }

  function isValidNumber(number) {
    if (document.getElementById('special-character').checked === true
      && (number === 33 || number === 35 || number === 36 || number === 64)) return true;
    else if (document.getElementById('number').checked === true && number >= 48 && number <= 57) return true;
    else if (document.getElementById('upper-case').checked === true && number >= 65 && number <= 90) return true;
    else if (document.getElementById('lower-case').checked === true && number >= 97 && number <= 122) return true;
    else if (document.getElementById('lower-case').checked === false && document.getElementById('upper-case').checked === false
      && document.getElementById('number').checked === false && document.getElementById('special-character').checked === false && number >= 97 && number <= 122) return true;
    return false;
  }

  const updatePasswordStrength = () =>{
  let strength = 0;
  if(document.getElementById('lower-case').checked === true || document.getElementById('upper-case').checked === true) strength++;
  if(document.getElementById('special-character').checked === true) strength++;
  if(document.getElementById('number').checked === true) strength++;

  if(strength === 1){ document.getElementById('password-easy-box').style.backgroundColor = "#FFD700";
  document.getElementById('password-easy-box').style.borderColor = "#FFD700";}
  if(strength === 2){ document.getElementById('password-medium-box').style.backgroundColor = "#FFD700";
  document.getElementById('password-medium-box').style.borderColor = "#FFD700"}
  if(strength === 3) {document.getElementById('password-hard-box').style.backgroundColor = "#FFD700";
  document.getElementById('password-hard-box').style.borderColor = "#FFD700";}

  if(strength < 1){ document.getElementById('password-easy-box').style.backgroundColor = "#434A4F";
  document.getElementById('password-easy-box').style.borderColor = "#FFFFFF";}
  if(strength < 2){ document.getElementById('password-medium-box').style.backgroundColor = "#434A4F";
  document.getElementById('password-medium-box').style.borderColor = "#FFFFFF";}
  if(strength < 3){ document.getElementById('password-hard-box').style.backgroundColor = "#434A4F";
  document.getElementById('password-hard-box').style.borderColor = "#FFFFFF";}

  }

  const sliderCallback = (event) => {
    setPasswordLength(event.target.value);
  }

  const copyText = () => {
    navigator.clipboard.writeText(password);
    alert("Copied the text: " + password);
  }

  const changeCopy  = () =>{
    if(copy === copyGreen)  SetCopy(copyGrey);
    else SetCopy(copyGreen);
  }

  return (
    <>
      <link rel="stylesheet" href="temp.css" />
      <div className="main-container">
        <div className="password-container">
          <div className="password-title">Password Generator</div>
          <div className="password-text-box">
            {password}
            <img src={copy} alt="copy" id="password-copy-image-btn" onClick={copyText} onMouseEnter={changeCopy} onMouseLeave = {changeCopy}/>
          </div>
          <div className="password-main-body">
            <div className="character-counter">Character Length</div>
            <div className="password-slider">
              <input
                id="rangeSlider"
                type="range"
                min="0"
                max="16"
                value={passwordLength}
                onChange={sliderCallback}

              />
              <p id="rangeValue">{passwordLength}</p>
            </div>
            <div className="password-constraints">
              <div className="upper-case">
                <input
                  type="checkbox"
                  className="checkbox-body"
                  id="upper-case"
                  name="upper-case"
                  value="upper-case"
                  onClick={updatePasswordStrength}
                />
                <label htmlFor="upper-case">Include Uppercase Letters</label>
              </div>
              <div className="lower-case">
                <input
                  type="checkbox"
                  className="checkbox-body"
                  id="lower-case"
                  name="lower-case"
                  value="lower-case"
                  onClick={updatePasswordStrength}
                />
                <label htmlFor="lower-case">Include Lowercase Letters</label>
              </div>
              <div className="number">
                <input
                  type="checkbox"
                  className="checkbox-body"
                  id="number"
                  name="number"
                  value="number"
                  onClick={updatePasswordStrength}
                />
                <label htmlFor="number">Include Numbers</label>
              </div>
              <div className="special-character">
                <input
                  type="checkbox"
                  className="checkbox-body"
                  id="special-character"
                  name="special-character"
                  value="special-character"
                  onClick={updatePasswordStrength}
                />
                <label htmlFor="special-character">Include Special Character</label>
              </div>
            </div>
            <div className="password-strength-box">
              STRENGTH
              <div id="password-easy-box"></div>
              <div id="password-medium-box"></div>
              <div id="password-hard-box"></div>
            </div>
            <div className="password-generate-btn-box">
              <button className="password-generate-button" onClick={generatePassword}>
                GENERATE
                <img src={arrow} alt="right-arrow" id="password-btn-left-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}