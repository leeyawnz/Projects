// CSS Related Variables
let filterSelect = document.getElementById('filter-select');
let filterTypes = document.getElementById('filter-types');
let randomFilter = document.getElementById('random-filter');
let complementaryFilter = document.getElementById('com-filter');
let monochromaticFilter = document.getElementById('mono-filter');
let generateButton = document.getElementById('generate-btn');

// CSS Related Event Listener
filterSelect.addEventListener('click', function() {
    if (filterTypes.classList.contains('no-show')) {
        filterTypes.classList.remove('no-show');
    } else {
        filterTypes.classList.add('no-show');
    }
})

randomFilter.addEventListener('click', function() {
    if (complementaryFilter.classList.contains('selected') || monochromaticFilter.classList.contains('selected')) {
        complementaryFilter.classList.remove('selected');
        monochromaticFilter.classList.remove('selected');
        randomFilter.classList.add('selected');
    }

    if (generateButton.classList.contains('com')) {
        generateButton.classList.replace('com', 'random');
    } else if (generateButton.classList.contains('mono')) {
        generateButton.classList.replace('mono', 'random');
    }
})

complementaryFilter.addEventListener('click', function() {
    if (randomFilter.classList.contains('selected') || monochromaticFilter.classList.contains('selected')) {
        randomFilter.classList.remove('selected');
        monochromaticFilter.classList.remove('selected');
        complementaryFilter.classList.add('selected');
    }

    if (generateButton.classList.contains('random')) {
        generateButton.classList.replace('random', 'com');
    } else if (generateButton.classList.contains('mono')) {
        generateButton.classList.replace('mono', 'com');
    }
})

monochromaticFilter.addEventListener('click', function() {
    if (randomFilter.classList.contains('selected') || complementaryFilter.classList.contains('selected')) {
        randomFilter.classList.remove('selected');
        complementaryFilter.classList.remove('selected');
        monochromaticFilter.classList.add('selected');
    }

    if (generateButton.classList.contains('random')) {
        generateButton.classList.replace('random', 'mono');
    } else if (generateButton.classList.contains('com')) {
        generateButton.classList.replace('com', 'mono');
    }
})

// Misc Functions
function combineLetters(combinedWord, letters) {
    return combinedWord + letters;
}

// Hexcode Generator Function
// Returns string Hexcode (without '#')
function randomHexCodeGenerator() {
    var hexCodeArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var hexCodeList = [];
    for (let i = 0; i < 6; i++) {
        let randomElement = hexCodeArray[Math.floor(Math.random() * hexCodeArray.length)];
        hexCodeList.push(randomElement);
    }
    var hexCode = hexCodeList.reduce(combineLetters);
    return hexCode;
}

// Conversion Functions
// Hexcode to RGB
// Returns numerical RGB array
function hexCodeToRGB(hexCode) {
    var dictionary = {
        '0' : 0, '1' : 1, '2' : 2, '3' : 3, '4' : 4, '5' : 5,
        '6' : 6, '7' : 7, '8' : 8, '9' : 9, 'A' : 10,
        'B' : 11, 'C' : 12, 'D' : 13, 'E' : 14, 'F' : 15
    }
    var array = [];
    var first = (dictionary[hexCode[0]] * 16) + (dictionary[hexCode[1]] * 1);
    var second = (dictionary[hexCode[2]] * 16) + (dictionary[hexCode[3]] * 1);
    var third = (dictionary[hexCode[4]] * 16) + (dictionary[hexCode[5]] * 1);
    array.push(first, second, third);
    return array;
}
// RGB to HSL
// Returns numerical HSL array
function RGBToHSL(RGBArray) {
    var HSLArray = [];
    var red = RGBArray[0] / 255;
    var green = RGBArray[1] / 255;
    var blue = RGBArray[2] / 255;
    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);

    // Hue
    if (red >= green && green >= blue) {
        if (green - blue == 0) {
            var hue = 0;
        } else {
            var hue = 60 * ((green - blue) / (red - blue));
        }
    } else if (green > red && red >= blue) {
        if (red - blue == 0) {
            var hue = 120;
        } else {
            var hue = 60 * (2 - ((red - blue) / (green - blue)));
        }
    } else if (green >= blue && blue > red) {
        if (blue - red == 0) {
            var hue = 180;
        } else {
            var hue = 60 * (2 + ((blue - red) / (green - red)));
        }
    } else if (blue > green && green >= red) {
        if (green - red == 0) {
            var hue = 240;
        } else {
            var hue = 60 * (4 - ((green - red) / (blue - red)));
        }
    } else if (blue > red && blue >= green) {
        if (red - green == 0) {
            var hue = 300;
        } else {
            var hue = 60 * (4 + ((red - green) / (blue - green)));
        }
    } else if (red >= blue && blue > green) {
        if (blue - green == 0) {
            var hue = 0;
        } else {
            var hue = 60 * (6 - ((blue - green) / (red - green)));
        }
    }

    // Lightness
    var lightness = (1/2) * (max + min);
    var lightnessPercentage = lightness * 100;

    // Saturation
    if (lightness < 1) {
        if (max - min == 0) {
            var saturation = 0;
        } else {
            var saturation = (max - min) / (1 - Math.abs((2 * lightness) - 1));
        }
    } else {
        var saturation = 0;
    }
    var saturationPercentage = saturation * 100;
    
    var hue = Math.round(hue);
    var saturationPercentage = Math.round(saturationPercentage);
    var lightnessPercentage = Math.round(lightnessPercentage);
    HSLArray.push(hue, saturationPercentage, lightnessPercentage);
    return HSLArray;
}
// HSL to RGB
// Returns numerical RGB array
function HSLToRGB(HSLArray) {
    var RGBArray = [];
    var hue = HSLArray[0];
    var saturationPercentage = HSLArray[1];
    var lightnessPercentage = HSLArray[2];

    var tempHue = hue / 360;

    if (lightnessPercentage == 0 && saturationPercentage == 0) {
        var red = 0;
        var green = 0;
        var blue = 0;
    } else if (lightnessPercentage != 0 && saturationPercentage == 0) {
        var lightness = lightnessPercentage / 100;
        var red = lightness;
        var green = lightness;
        var blue = lightness;
    } else if (lightnessPercentage == 0 && saturationPercentage != 0) {
        var red = 0;
        var green = 0;
        var blue = 0;
    } else if (lightnessPercentage != 0 && saturationPercentage != 0) {
        var lightness = lightnessPercentage / 100;
        var saturation = saturationPercentage / 100;

        // temporary variable 1
        if (lightness < 0.5) {
            var temp1 = lightness * (1 + saturation);
        } else {
            var temp1 = lightness + saturation - (lightness * saturation);
        }

        // temporary variable 2
        var temp2 = (2 * lightness) - temp1;

        // temporary red
        var tempRed = tempHue + (1/3);
        if (tempRed > 1) {
            var tempRed = tempRed - 1;
        }
        // temporary green
        var tempGreen = tempHue;
        // temporary blue
        var tempBlue = tempHue - (1/3);
        if (tempBlue < 0) {
            var tempBlue = tempBlue + 1;
        }
        
        // testing temporary red
        if ((tempRed * 6) < 1) {
            var red = temp2 + (temp1 - temp2) * 6 * tempRed;
        } else if ((tempRed * 2) < 1) {
            var red = temp1;
        } else if ((tempRed * 3) < 2) {
            var red = temp2 + (temp1 - temp2) * (4 - (6 * tempRed));
        } else {
            var red = temp2;
        }

        // testing temporary green
        if ((tempGreen * 6) < 1) {
            var green = temp2 + (temp1 - temp2) * 6 * tempGreen;
        } else if ((tempGreen * 2) < 1) {
            var green = temp1;
        } else if ((tempGreen * 3) < 2) {
            var green = temp2 + (temp1 - temp2) * (4 - (6 * tempGreen));
        } else {
            var green = temp2;
        }

        // testing temporary blue
        if ((tempBlue * 6) < 1) {
            var blue = temp2 + (temp1 - temp2) * 6 * tempBlue;
        } else if ((tempBlue * 2) < 1) {
            var blue = temp1;
        } else if ((tempBlue * 3) < 2) {
            var blue = temp2 + (temp1 - temp2) * (4 - (6 * tempBlue));
        } else {
            var blue = temp2;
        }
    }
    var red = Math.round(red * 255);
    var green = Math.round(green * 255);
    var blue = Math.round(blue * 255);
    RGBArray.push(red, green, blue);
    return RGBArray;
}
// RGB to Hexcode
// Returns string Hexcode (without '#')
function RGBToHexCode(RGBarray) {
    let hexCodeNumericalArray = [];
    let first = Math.floor(RGBarray[0] / 16);
    let second = ((RGBarray[0] / 16) - first) * 16;
    let third = Math.floor(RGBarray[1]/16);
    let fourth = ((RGBarray[1] / 16) - third) * 16;
    let fifth = Math.floor(RGBarray[2]/16);
    let sixth = ((RGBarray[2] / 16) - fifth) * 16;
    hexCodeNumericalArray.push(first, second, third, fourth, fifth, sixth)
    
    let hexCodeStringArray = [];
    for (items in hexCodeNumericalArray) {
        if (hexCodeNumericalArray[items] > 9) {
            if (hexCodeNumericalArray[items] == 10) {
                hexCodeStringArray.push('A');
            } else if (hexCodeNumericalArray[items] == 11) {
                hexCodeStringArray.push('B');
            } else if (hexCodeNumericalArray[items] == 12) {
                hexCodeStringArray.push('C');
            } else if (hexCodeNumericalArray[items] == 13) {
                hexCodeStringArray.push('D');
            } else if (hexCodeNumericalArray[items] == 14) {
                hexCodeStringArray.push('E');
            } else if (hexCodeNumericalArray[items] == 15) {
                hexCodeStringArray.push('F');
            }
        } else {
            let string = (hexCodeNumericalArray[items]).toString();
            hexCodeStringArray.push(string);
        }
    }
    let hexCode = hexCodeStringArray.reduce(combineLetters);
    return hexCode;
}


// Color Variables
let colorOne = document.getElementById('color-1');
let colorTwo = document.getElementById('color-2');
let colorThree = document.getElementById('color-3');
let colorFour = document.getElementById('color-4');
let colorFive = document.getElementById('color-5');
// Hexcode Variables
let hexCodeOne = document.getElementById('hexcode-1');
let hexCodeTwo = document.getElementById('hexcode-2');
let hexCodeThree = document.getElementById('hexcode-3');
let hexCodeFour = document.getElementById('hexcode-4');
let hexCodeFive = document.getElementById('hexcode-5');

// Color Related Functions
// Greyscale complement
function complementaryRGBGreyScale(RGBArray) {
    var comRGBGS = [];
    var minVal = Math.min(...RGBArray);
    var maxVal = Math.max(...RGBArray);
    var greyScale = minVal + maxVal;
    var first = greyScale - RGBArray[0];
    var second = greyScale - RGBArray[1];
    var third = greyScale - RGBArray[2];
    comRGBGS.push(first, second, third);
    return comRGBGS;
}
// White complement
function complementaryRGBWhite(RGBArray) {
    var comRGBW = [];
    var first = 255 - RGBArray[0];
    var second = 255 - RGBArray[1];
    var third = 255 - RGBArray[2];
    comRGBW.push(first, second, third);
    return comRGBW;
}
// Random complement chooser
function randomComplement(RGBarray){
    var randomInt = Math.floor(Math.random() * 2);
    if (randomInt == 0) {
        var comRGBGS = complementaryRGBGreyScale(RGBarray);
        var comRGBArray = comRGBGS;
    } else {
        var comRGBW = complementaryRGBWhite(RGBarray);
        var comRGBArray = comRGBW;
    }

    return comRGBArray;
}
// Monochrome Function
function randomMonochrome(HSLArray) {
    // changes by percentage
    var hue = HSLArray[0];
    var saturation = HSLArray[1];
    var lightness = HSLArray[2];
    // hue remains unchanged
    // saturation and lightness increases and decreases in the same percentage

    // saturation = 0, lightness != 0
    if (saturation == 0 && lightness == 0) {
        // can increase the saturation and lightness only
        var upperDelta = Math.floor(Math.random() * 100 + 1);
        var newSaturation = saturation + upperDelta;
        var newLightness = lightness + upperDelta;

    } else if (saturation == 0 && lightness != 0) {
        var upperDelta = Math.floor(Math.random() * 100 + 1);
        var lowerDelta = Math.floor(Math.random() * lightness + 1);

        var randomInt = Math.floor(Math.random() * 2);

        if (randomInt == 0) {
            var newSaturation = saturation + upperDelta;
            var newLightness = lightness + upperDelta;
            if (newLightness > 100) {
                newLightness = 100;
            }
        } else {
            var newSaturation = 0;
            var newLightness = lightness - lowerDelta;
        }
        // you can increase the saturation only
        // you can decrease the lightness
        // you can increase the lightness
    } else {
        var max = Math.max(saturation, lightness);
        var maxDelta = 100 - max;
        var upperDelta = Math.floor(Math.random() * maxDelta + 1);
        var min = Math.min(saturation, lightness);
        var minDelta = min;
        var lowerDelta = Math.floor(Math.random() * minDelta + 1);

        var randomInt = Math.floor(Math.random() * 2);

        if (randomInt == 0) {
            var newSaturation = saturation + upperDelta;
            var newLightness = lightness + upperDelta;
            if (newSaturation > 100) {
                newSaturation = 100;
            }
            if (newLightness > 100) {
                newLightness = 100;
            }
        } else {
            var newSaturation = saturation - lowerDelta;
            var newLightness = lightness - lowerDelta;
            if (newSaturation < 0) {
                newSaturation = 0;
            }
            if (newLightness < 0) {
                newLightness = 0;
            }
        }
        // you can increase the saturation and lightness by same percent
        // you can decrease the saturation and lightness by same percent
    }

    return [hue, newSaturation, newLightness];

}

// Color Filter Functions
// Random Filter Function
function randomFilterFunction() {
    let randomHexCodeSet = new Set();
    while (randomHexCodeSet.size < 5) {
        randomHexCodeSet.add(randomHexCodeGenerator());
    }

    let randomHexCodeArray = [...randomHexCodeSet];

    hexCodeOne.innerHTML = '#' + randomHexCodeArray[0];
    colorOne.style.backgroundColor = `#${randomHexCodeArray[0]}`;
    hexCodeTwo.innerHTML = '#' + randomHexCodeArray[1];
    colorTwo.style.backgroundColor = `#${randomHexCodeArray[1]}`;
    hexCodeThree.innerHTML = '#' + randomHexCodeArray[2];
    colorThree.style.backgroundColor = `#${randomHexCodeArray[2]}`;
    hexCodeFour.innerHTML = '#' + randomHexCodeArray[3];
    colorFour.style.backgroundColor = `#${randomHexCodeArray[3]}`;
    hexCodeFive.innerHTML = '#' + randomHexCodeArray[4];
    colorFive.style.backgroundColor = `#${randomHexCodeArray[4]}`;
}

// Complementary Filter Function
function complementaryFilterFunction() {
    let comHexCodeSet = new Set();
    // getting one
    let one = randomHexCodeGenerator();
    let RGB1 = hexCodeToRGB(one);
    let HSL1 = RGBToHSL(RGB1);
    comHexCodeSet.add(one);
    // comHexCodeSet contains one element;

    // getting complement (five)
    while (comHexCodeSet.size < 2) {
        let RGB5 = randomComplement(RGB1);
        let five = RGBToHexCode(RGB5);
        comHexCodeSet.add(five);
    }
    // comHexCodeSet contains two elements;

    let comHexCodeArray = [...comHexCodeSet];
    let RGB5 = hexCodeToRGB(comHexCodeArray[1]);
    let HSL5 = RGBToHSL(RGB5);

    while (comHexCodeSet.size < 5) {
        let randomInt = Math.floor(Math.random() * 2);
        if (randomInt == 0) {
            let HSL2 = randomMonochrome(HSL1);
            let RGB2 = HSLToRGB(HSL2);
            let two = RGBToHexCode(RGB2);
            comHexCodeSet.add(two);
        } else {
            let HSL2 = randomMonochrome(HSL5);
            let RGB2 = HSLToRGB(HSL2);
            let two = RGBToHexCode(RGB2);
            comHexCodeSet.add(two);
        }
    }

    let comHexCodeArray2 = [...comHexCodeSet];

    hexCodeOne.innerHTML = '#' + comHexCodeArray2[0];
    colorOne.style.backgroundColor = `#${comHexCodeArray2[0]}`;
    hexCodeTwo.innerHTML = '#' + comHexCodeArray2[2];
    colorTwo.style.backgroundColor = `#${comHexCodeArray2[2]}`;
    hexCodeThree.innerHTML = '#' + comHexCodeArray2[3];
    colorThree.style.backgroundColor = `#${comHexCodeArray2[3]}`;
    hexCodeFour.innerHTML = '#' + comHexCodeArray2[4];
    colorFour.style.backgroundColor = `#${comHexCodeArray2[4]}`;
    hexCodeFive.innerHTML = '#' + comHexCodeArray2[1];
    colorFive.style.backgroundColor = `#${comHexCodeArray2[1]}`;
}

// Monochromatic Filter Function
function monochromaticFilterfunction() {
    let monoHexCodeSet = new Set();
    // getting one
    let one = randomHexCodeGenerator();
    let RGB1 = hexCodeToRGB(one);
    let HSL1 = RGBToHSL(RGB1);
    console.log(HSL1);
    monoHexCodeSet.add(one);

    while (monoHexCodeSet.size < 5) {
        let HSL2 = randomMonochrome(HSL1);
        console.log(HSL2);
        let RGB2 = HSLToRGB(HSL2);
        let two = RGBToHexCode(RGB2);
        monoHexCodeSet.add(two);
    }

    let monoHexCodeArray = [...monoHexCodeSet];
    console.log(monoHexCodeArray);
    
    hexCodeOne.innerHTML = '#' + monoHexCodeArray[0];
    colorOne.style.backgroundColor = `#${monoHexCodeArray[0]}`;
    hexCodeTwo.innerHTML = '#' + monoHexCodeArray[1];
    colorTwo.style.backgroundColor = `#${monoHexCodeArray[1]}`;
    hexCodeThree.innerHTML = '#' + monoHexCodeArray[2];
    colorThree.style.backgroundColor = `#${monoHexCodeArray[2]}`;
    hexCodeFour.innerHTML = '#' + monoHexCodeArray[3];
    colorFour.style.backgroundColor = `#${monoHexCodeArray[3]}`;
    hexCodeFive.innerHTML = '#' + monoHexCodeArray[4];
    colorFive.style.backgroundColor = `#${monoHexCodeArray[4]}`;
}

// Generate Button

randomFilterFunction();

generateButton.addEventListener('click', function() {
    if (generateButton.classList.contains('random')) {
        randomFilterFunction();
    } else if (generateButton.classList.contains('com')) {
        complementaryFilterFunction();
    } else {
        monochromaticFilterfunction();
    }
})
