/*
  Author: Sonas MacRae
  Date last modified: Sunday 18th February 2018

  The purpose of this class is to hold all the javascript code for the Number cipher
*/

var name,answer,random,newIndex,alphabet,finalword,userInput,decryptedNumber,newInput,original;

// Array of the alphabet which will be used for encrypting and decrypting
alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l',
'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Function which will be used to copy text
function copyFunction()
{
  var copyText = document.getElementById("output");
  copyText.select();
  document.execCommand("Copy");
}

// Saves a string and changes it to lower case and gets rid of any whitespace
function formatInput()
{
  input = document.getElementById("input");
  newInput = input.value;
  input = newInput.toLowerCase();
  userInput = input.replace(' ', '');

  return input;
}

// The function that encrypts the string
function encrypt()
{
  userInput = formatInput();
  finalword = "";

  // Loops through each char in the input string
  for (var i = 0; i < userInput.length; i++)
  {
    // Loops the char through the alphabet array to get the index of the char
    for (var j = 0; j < alphabet.length; j++)
    {
      if(userInput[i] == alphabet[j])
      {
        // Generates a number between 0 and 4
        random = Math.floor(Math.random() * 4);

        // Adds the value of the input char with the value of the generated number
        newIndex = ((random * 26) + j);

        // If the new index is larger than 99 then take off an iteration of the alphabet
        // there can't be 3 digit numbers
        if (newIndex > 99)
        {
          newIndex -= 26;
        }

        // If the new index is lower than 10, add 0 to the start of the variable
        // because there needs to be an even number of numbers to be able to decrypt
        if (newIndex < 10)
        {
          newIndex = ("0" + newIndex);
        }

        // Builds the output
        finalword += newIndex;
      }
    }
  }

  // Print the new output to the output box
  document.getElementById('output').value = finalword;
}

// A function that decrypts the string
function decrypt()
{
  userInput = formatInput();
  finalword = "";

  // Loops through each char in the input
  for (var i = 0; i < userInput.length; i++)
  {
    // Takes 2 integers at a time and turns them into strings
    userInput[i].toString();
    userInput[i+1].toString();

    // Checks if the next 2 values aren't whitespace
    if (userInput[i + 1] != " ")
    {
      // Concatenates the 2 strings
      var combinedValue = userInput[i].concat(userInput[i + 1]);
    }

    // Turn the strings into an integer
    originalValue = parseInt(combinedValue);

    // If the value of the integers is over 25, take off 26 (so z+1 turns back into a)
    if (originalValue > 25)
    {
      do
      {
        originalValue -= 26;
      }
      while(originalValue > 25);
    }

    // Build the encrypted string
    finalword += alphabet[originalValue];
    i++;
  }

  // Print the encrypted message to the output box
  document.getElementById('output').value = finalword;
}
