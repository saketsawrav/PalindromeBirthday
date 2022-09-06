// Function to take a string and reverse it,also log for now to check if the function works

function reverseString (str) {
    var charList = str.split('')
    var reversedList = charList.reverse()
    return reversedList.join('')
}

console.log(reverseString('lol'))

// Function to check if a given input is palindrome or not,also log values for now

function isPalindrome(str) {
    var reversedString = reverseString(str)
    return str === reversedString
}

console.log(isPalindrome('lol'))

// Function to convert a given date object to a String,also if date or month is less than 10 add 0 before it to make sure it is present in the final output string object.Again console log for now to check if the function works as intended.

function dateToStr(date) {
    var strDate = {day: '', month: '', year: ''}
    if (date.day < 10) {
        strDate.day = '0' + date.day
    } else {
        strDate.day = date.day.toString()
    }

    if (date.month < 10) {
        strDate.month = '0' + date.month
    } else {
        strDate.month = date.month.toString()
    }

    strDate.year = date.year.toString()

    return strDate
}

var date = { day: 14, month: 09, year: 2020}
console.log(dateToStr(date))

//Function will return an array of strings for these date formats

// DD-MM-YYYY
// MM-DD-YYYY
// YYYY-MM-DD
// DD-MM-YY
// MM-DD-YY
// YY-MM-DD

// The hyphen (-) is for representation only, return the strings without hyphens

// Input: { day: 10, month: 9, year: 2020 }
// output: ['10092020', '09102020', '20200910', '091020', '100920', '200910']

function dateInAllFormats (date) {
    var ddmmyyyy = date.day + date.month + date.year
    var mmddyyyy = date.month + date.day + date.year
    var yyyymmdd = date.year + date.month + date.day
    var ddmmyy = date.day + date.month + date.year.slice(-2)
    var mmddyy = date.month + date.day + date.year.slice(-2)
    var yymmdd = date.year.slice(-2) + date.month + date.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

console.log(dateInAllFormats(dateToStr(date)))


// Function to check All date formats for palindrome's
function checkPalindromeForAllDateFormats (date) {
    var listOfPalindromesToCheck = dateInAllFormats(dateToStr(date))

    var flag = false

    for (i = 0; i < listOfPalindromesToCheck.length; i++) {
        if(isPalindrome(listOfPalindromesToCheck[i])) {
            flag = true;
            break;
        }
    }
    return flag
}

checkPalindromeForAllDateFormats(date)

function isLeapYear (year) {
    if (year % 400 === 0) 
        return true;

    if (year % 100 === 0) 
        return false;

    if (year % 4 === 0)
        return true;

    return false
}

function checkNextDate(date) {
    var day = date.day + 1
    var month = date.month
    var year = date.year

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 2) {
        if(isLeapYear(year)) {
            if (day > 29) {
                day = 1
                month++
            }
        } else {
            if (day > 28) {
                day = 1
                month++
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}

console.log(checkNextDate(date))

function checkNextPalindromeDate (date) {
    var ctr = 0;
    var nextDate = checkNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);

        if(isPalindrome){
            break;
        }
        nextDate = checkNextDate(nextDate)
    }

    return [ctr, nextDate]
}

console.log(checkNextPalindromeDate(date))