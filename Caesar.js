/*
  Author: Sonas MacRae
  Date last modified: Monday 19th February 2018

  The purpose of this class is to hold all the javascript code for the Caesar cipher
*/

var newIndex,alphabet,finalword,keyIndex,newLetter,Key,input,userInput,inputKey;

// Array of the alphabet which will be used for encrypting and decrypting
alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l',
'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// A function that copies text
function copyFunction()
{
  var copyText = document.getElementById("output");
  copyText.select();
  document.execCommand("Copy");
}

// Saves a string and changes it to lower case
function formatInput()
{
  input = document.getElementById("input");
  newInput = input.value;

  if (newInput == '')
  {
    alert("Please enter an input to encrypt")
  }

  userInput = newInput.toLowerCase();

  return userInput;
}

// Works out the index of the key in the alphabet
function index()
{
  var e = document.getElementById("dropDown");
  Key = e.options[e.selectedIndex].value;

  var keyIndex;
  for (var i = 0; i < alphabet.length; i++)
  {
    if (alphabet[i] == Key)
    {
      keyIndex = i;
    }
  }
  return keyIndex;
}

// The function that encrypts the input
function encrypt()
{
  finalword = "";
  userInput = formatInput();
  keyIndex = index()

  for (var i = 0; i < userInput.length; i++)
  {
    if (userInput[i] == " ")
    {
      finalword += " ";
      continue;
    }

    for (var j = 0; j < alphabet.length; j++)
    {
      if(userInput[i] == alphabet[j])
      {
        newIndex = j + keyIndex;
        if (newIndex > 25)
        {
          newIndex -= 26;
        }
        newLetter = alphabet[newIndex];
        finalword = finalword + newLetter;
      }
    }
  }

  // Print the encrypted message to the output box
  document.getElementById("output").value = finalword;
}

// The function that decrypts the output
function decrypt()
{
  finalword = "";
  userInput = formatInput();
  keyIndex = index()

  for (var i = 0; i < userInput.length; i++)
  {
    if (userInput[i] == " ")
    {
      finalword += " ";
      continue;
    }

    for (var j = 0; j < alphabet.length; j++)
    {
      if(userInput[i] == alphabet[j])
      {
        newIndex = j - keyIndex;
        if (newIndex < 0)
        {
          newIndex += 26;
        }
        newLetter = alphabet[newIndex];
        finalword = finalword + newLetter;
      }
    }
  }
  // Print the decrypted message to the output box
  document.getElementById("output").value = finalword;
}
