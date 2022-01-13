// Random color generator
let hexcode1 = gettingHexcode();
let hexcode2 = gettingHexcode();
let hexcode3 = gettingHexcode();
let hexcode4 = gettingHexcode();
let hexcode5 = gettingHexcode();

document.getElementById("color-name1").innerHTML = hexcode1;
document.querySelector("#row1").style.backgroundColor = `${hexcode1}`;
document.getElementById("color-name2").innerHTML = hexcode2;
document.querySelector("#row2").style.backgroundColor = `${hexcode2}`;
document.getElementById("color-name3").innerHTML = hexcode3;
document.querySelector("#row3").style.backgroundColor = `${hexcode3}`;
document.getElementById("color-name4").innerHTML = hexcode4;
document.querySelector("#row4").style.backgroundColor = `${hexcode4}`;
document.getElementById("color-name5").innerHTML = hexcode5;
document.querySelector("#row5").style.backgroundColor = `${hexcode5}`;

// Functions
function combineLetters(combinedWord, letter) {
    return combinedWord +letter;
}

function gettingHexcode() {
    const array = ["0", "1", "2", "3", "4", "5", "6", "7" , "8", "9", "A", "B", "C", "D", "E", "F"];
    let hexcodeList = ["#"]
    for (let i = 0; i < 6; i++) {
        let randomElement = array[Math.floor(Math.random() * array.length)];
        hexcodeList.push(randomElement);
    }
    let hexcode = hexcodeList.reduce(combineLetters);
    return hexcode;
}

// Generate button
document.querySelector("#generate-button").onclick = function() {
    let hexcode1 = gettingHexcode();
    let hexcode2 = gettingHexcode();
    let hexcode3 = gettingHexcode();
    let hexcode4 = gettingHexcode();
    let hexcode5 = gettingHexcode();

    document.getElementById("color-name1").innerHTML = hexcode1;
    document.querySelector("#row1").style.backgroundColor = `${hexcode1}`;
    document.getElementById("color-name2").innerHTML = hexcode2;
    document.querySelector("#row2").style.backgroundColor = `${hexcode2}`;
    document.getElementById("color-name3").innerHTML = hexcode3;
    document.querySelector("#row3").style.backgroundColor = `${hexcode3}`;
    document.getElementById("color-name4").innerHTML = hexcode4;
    document.querySelector("#row4").style.backgroundColor = `${hexcode4}`;
    document.getElementById("color-name5").innerHTML = hexcode5;
    document.querySelector("#row5").style.backgroundColor = `${hexcode5}`;
}
