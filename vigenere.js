/*
  Author: Sonas MacRae
  Date last modified: Monday 19th February 2018

  The purpose of this class is to hold all the javascript code for the Vigenere cipher
*/

var keyWord,userInput,random,newIndex,finalword,alphabet,keywordIndex,keywordValues;

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

// Saves a string and changes it to lower case and gets rid of whitespace
function formatInput()
{
  var input = document.getElementById("input");
  input = input.value;
  input = input.toLowerCase();

  if (input == '')
  {
    alert("Please enter an input to encrypt")
  }

  input = input.replace(' ', '');

  return input;
}

// Builds an array of values based on the keyword, it will be used for
// encrypting and decrypting
function key()
{
  var keywordInput = document.getElementById("keyword");
  keywordInput = keywordInput.value;

  if (keywordInput == '')
  {
    alert("Please enter a keyword");
  }
  keywordInput = keywordInput.toLowerCase();
  keyword = keywordInput.replace(' ', '');

  var keywordValues = [];

  for (var i = 0; i < keyword.length; i++)
  {
    for (var j = 0; j < alphabet.length; j++)
    {
      if(keyword[i] == alphabet[j])
      {
        keywordValues.push(j);
      }
    }
  }

  return keywordValues;
}

// The function that encrypts a string
function encrypt()
{
  userInput = formatInput();
  keywordValues = key();

  if (keywordValues == '' || userInput == '')
  {
    return;
  }

  finalword = "";

  // This variable will be used to keep track of the index of the
  // keyword-values array
  keywordIndex = 0;

  // Loop through every char in the input string
  for (var i = 0; i < userInput.length; i++)
  {
    // Loop char through alphabet array looking for a match, save the index
    for (var j = 0; j < alphabet.length; j++)
    {
      if(userInput[i] == alphabet[j])
      {
        // Create a new index by combining the value of the current key
        // letter with the input letter
        newIndex = keywordValues[keywordIndex] + j;
        if (newIndex > 25)
        {
          newIndex -= 26;
        }

        finalword += alphabet[newIndex];
        keywordIndex++;

        // If the end of the keyword-values array is met, reduce the index back to zero
        if (keywordIndex == keywordValues.length)
        {
          keywordIndex = 0;
        }
      }
    }
  }
  // Output the new string to the output box on the webpage
  document.getElementById("output").value = finalword;
}

// The function that decrypts a string
function decrypt()
{
  userInput = formatInput();
  keywordValues = key();

  if (keywordValues == '' || userInput == '')
  {
    return;
  }

  finalword = "";
  keywordIndex = 0;

  for (var i = 0; i < userInput.length; i++)
  {
    for (var j = 0; j < alphabet.length; j++)
    {
      if(userInput[i] == alphabet[j])
      {
        newIndex = j - keywordValues[keywordIndex];
        if (newIndex < 0)
        {
          newIndex += 26;
        }

        finalword += alphabet[newIndex];
        keywordIndex++;

        if (keywordIndex == keywordValues.length)
        {
          keywordIndex = 0;
        }
      }
      else
      {
        finalword += userInput[i];
      }
    }
  }
  document.getElementById("demo").innerHTML = finalword;
}
