var input,updatedOutput,newInput,key,alphabet,morseAlphabet,secondMorseAlphabet;
var temp = "";
var tempArray = [];

alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l',
'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];

morseAlphabet = ['.-','-...','-.-.','-..','.','..-.','--.','....',
'..','.---','-.-','.-..','--','-.','---','.--.','--.-','.-.',
'...','-','..-','...-','.--','-..-','-.--','--..'];

var decryptAlphabet = { "-----":"0",".----":"1","..---":"2","...--":"3","....-":"4",
".....":"5","-....":"6","--...":"7","---..":"8","----.":"9",".-":"a","-...":"b",
"-.-.":"c","-..":"d",".":"e","..-.":"f","--.":"g","....":"h","..":"i",".---":"j",
"-.-":"k",".-..":"l","--":"m","-.":"n","---":"o",".--.":"p","--.-":"q",".-.":"r",
"...":"s","-":"t","..-":"u","...-":"v",".--":"w","-..-":"x","-.--":"y","--..":"z",
"/":" ","-·-·--":"!","·-·-·-":".","--··--":","
};

secondMorseAlphabet = ['...','..-','..x','.-.','.--','.-x','.x.','.x-',
'.xx','-..','-.-','-.x','--.','---','--x','-x.','-x-','-xx',
'x..','x.-','x.x','x-.','x--','x-x','xx.','xx-'];

// A function that copies text
function copyFunction()
{
  var copyText = document.getElementById("output");
  copyText.select();
  document.execCommand("Copy");
}

function formatInput()
{
  input = document.getElementById('input');
  newInput = input.value;
  input = newInput.toLowerCase();

  return input;
}

function toMorse(input)
{
  var output = "";
  for (var i = 0; i < input.length; i++)
  {
    for (var j = 0; j < alphabet.length; j++)
    {
      if (input[i] == alphabet[j])
      {
        output += morseAlphabet[j] + 'x';
      }
      else if (input[i] == " ")
      {
        output += "x";
        break;
      }
    }
  }

  return output;
}

function generateKey()
{
  var keyArray = [];
  var addOn = '';

  var keywordInput = document.getElementById('keyword');
  keywordInput = keywordInput.value;
  keyword = keywordInput.toLowerCase();

  var duplicate = 0;

  for (var i = 0; i < keyword.length; i++)
  {
    for (var j = 0; j < keyword.length; j++)
    {
      if (keyword[i] == keyword[j] && j != i)
      {
        duplicate = 1;
        break;
      }
    }
  }

  if (keyword == ''|| duplicate == 1)
  {
    alert('Please enter a valid keyword');
    return;
  }

  for (var i = 0; i < alphabet.length; i++)
  {
    var counter = 0;

    for (var j = 0; j < keyword.length; j++)
    {
      if (alphabet[i] != keyword[j])
      {
        counter++;
      }
    }

    if (counter == keyword.length)
    {
      addOn += alphabet[i];
    }
  }

  keyword += addOn;

  for (var i = 0; i < keyword.length; i++)
  {
    keyArray.push(keyword[i]);
  }

  return keyArray;
}

function encrypt()
{
  key = generateKey();
  input = formatInput();
  updatedOutput = toMorse(input);

  var threeBlock = "";

  for (var i = 0; i < updatedOutput.length; i ++)
  {
    var current = "";

    current = (updatedOutput[i] + updatedOutput[i + 1] + updatedOutput[i + 2]);

    for (var j = 0; j < key.length; j++)
    {
      if (current == secondMorseAlphabet[j])
      {
        threeBlock += key[j];
      }
    }

    i += 2;
  }

  document.getElementById('output').value = threeBlock;
}

function decrypt()
{
  key = generateKey();
  input = formatInput();

  var firstStageDecryption = "";

  for (var i = 0; i < input.length; i++)
  {
    for (var j = 0; j < key.length; j++)
    {
      if (input[i] == key[j])
      {
        firstStageDecryption += secondMorseAlphabet[j];
      }
    }
  }

  var secondStageDecryption = "";

  for (var i = 0; i < firstStageDecryption.length; i++)
  {
    if (firstStageDecryption[i] == 'x' && firstStageDecryption [i + 1] == 'x')
    {
      secondStageDecryption += "  ";
      i++;
    }

    else if (firstStageDecryption[i] != 'x')
    {
      secondStageDecryption += firstStageDecryption[i];
    }

    else
    {
      secondStageDecryption += " ";
    }
    var thirdStageDecryption = "";
    var convertedMessage = [];

    var message = secondStageDecryption;

    secondStageDecryption.split("   ").map(function (word)
    {
        word.split(" ").map(function (letter)
        {
            convertedMessage.push(decryptAlphabet[letter]);
        });
        convertedMessage.push(" ");
    });

  }
  document.getElementById('output').value = (convertedMessage.join(""));
}
