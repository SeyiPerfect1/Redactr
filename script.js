var startTime = performance.now()
let unscrambledWords = document.getElementById("form-field") //catches the first input
let words_to_be_scrambled = document.getElementById("specify-field") //catches the desired scrambled words
let wordReplacement = document.getElementById("replacement-field") //catches the replacement input
let submission = document.querySelector("button")  //catches the redactr button
let dateOfBirth = document.getElementById("age") //catches the date of birth button
let form = document.querySelector("form") //catches the form


unscrambledWords.focus()

wordReplacement.addEventListener("keydown", prevent_space_in_replacement) //prevent adding more than one word to wordreplacement
wordReplacement.addEventListener("paste", e=>e.preventDefault()) //prevent pasting words to wordreplacement


submission.addEventListener("click", scrambleWords) //redactr click event


function prevent_space_in_replacement(e){
    if (e.which === 32){
        e.preventDefault();
    }
}


//function to scramble the provided words from the input
let wordCount1 = 0
let wordCount2
let charCount 
let count2 = 0

function scrambleWords(){
    let dateOfBirthString = dateOfBirth.value
    
    let wordReplacement1 = wordReplacement.value
    let unscrambledWords1 = unscrambledWords.value
    let words_to_be_scrambled1 = words_to_be_scrambled.value.split(/\W/)
    let transformedChar;
    
    if ((getAge(dateOfBirthString)<18)||(Object.is(getAge(dateOfBirthString), NaN))){
   
        for (let item of words_to_be_scrambled1){

            //calculate totel number of words scrambled
            let regex = new RegExp(`\\b${item}\\b`, 'gmi')
            let wordCount = unscrambledWords1.match(regex)
            try{
            wordCount1 += wordCount.length
            } catch(TypeError){
                let tag = document.createElement("span")
                let text = document.createTextNode(`Word(s) provided is/are not in text`)
                tag.prepend(text)
                successMsg.prepend(tag)
                displayMsg()
            }
            wordCount2 = wordCount1
           

            // calucate total numbers of characters scrambled
            let charCount1 = wordCount.toString() 
            for (let i in charCount1){
                if(only_contains(charCount1[i])){
                    count2++
                }
            }
            charCount = count2
            
            
            if((only_contains(item)) && unscrambledWords1.match(regex)!=null){ 

                //if user provides alphanumeric word as wordreplacement
                if (only_contains(wordReplacement1)){
                    transformedChar = wordReplacement1
                    
                }

                else{
                    let word = item.split("")
                    
                    //if user provide a specific character as wordreplacement e.g * , $ etc
                    if (wordReplacement1){
                        transformedChar = word.map(x => x = wordReplacement1).join("")
                    }

                    //if user did not provide wordreplacement 
                    else{
                        transformedChar = word.map(x => x = '*').join("")
                    }
                }   

                
                let unscrambledWords2 =  unscrambledWords1.replace(regex, transformedChar)
                unscrambledWords1 = unscrambledWords2
                
            }
        }
        unscrambledWords.value = unscrambledWords1
        let tag = document.createElement("span")
        let text = document.createTextNode(`${wordCount2} word(s), ${charCount} character(s) scrambled in ${(Math.round(endTime-startTime)/1000).toFixed(4)}sec`)
        tag.prepend(text)
        successMsg.prepend(tag)
        displayMsg()
        
    }

    else{
        for (let item of words_to_be_scrambled1){
    
            //calculate totel number of words scrambled
            let regex = new RegExp(`\\b${item}\\b`, 'gmi')
            let wordCount = unscrambledWords1.match(regex)
            try{
                wordCount1 += wordCount.length
                } catch(TypeError){
                    let tag = document.createElement("span")
                    let text = document.createTextNode(`Word(s) provided is/are not in text`)
                    tag.prepend(text)
                    successMsg.prepend(tag)
                    displayMsg()
                }
            wordCount2 = wordCount1
           
    
            // calucate total numbers of characters scrambled
            let charCount1 = wordCount.toString() 
            for (let i=1; i<charCount1.length; i+=2){
                if(only_contains(charCount1[i])){
                    count2++
                }
            }
            charCount = count2
            
            
            if((only_contains(item)) && unscrambledWords1.match(regex)!=null){ 
    
                //if user provides alphanumeric word as wordreplacement
                if (only_contains(wordReplacement1)){
                    transformedChar = wordReplacement1
                    
                }
    
                else if(getAge(dateOfBirthString)>=18){
                    let word = item.split("")
                    //if user provide a specific character as wordreplacement e.g * , $ etc
                    if (wordReplacement1){
                        for (let i in word){
                            if (i%2==1){
                                word[i]=wordReplacement1
                            }
                        }
                        transformedChar = word.join("")
                        
                        
                    }
    
                    //if user did not provide wordreplacement 
                    else{
                        for (let i in word){
                            if (i%2==1){
                                word[i]="*"
                            }
                        }
                        transformedChar = word.join("")
                    }
                }   
    
                
                let unscrambledWords2 =  unscrambledWords1.replace(regex, transformedChar)
                unscrambledWords1 = unscrambledWords2
                
            }
        }
        unscrambledWords.value = unscrambledWords1
        let tag = document.createElement("span")
        tag.className = "newcontent"
        let text = document.createTextNode(`${wordCount2} word(s), ${charCount} character(s) scrambled in ${(Math.round(endTime-startTime)/1000).toFixed(4)}sec`)
        tag.prepend(text)
        successMsg.prepend(tag)
        displayMsg()

         
    }

} 

//display success message after scrambling
let successMsg = document.querySelector(".alert")
function displayMsg (){

    if(unscrambledWords.value&&words_to_be_scrambled.value){
    successMsg.style.opacity = "1"
    successMsg.style.animation = 'fadeIn 2s'

    }
}


// //This function returns true if a string contains alphabets only...
function only_contains(str){
    return /[A-Za-z0-9]+$/.test(str)
}


//function to get age of the user
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var endTime = performance.now()

// close success message
let closeButton = document.querySelector(".closebtn")
closeButton.addEventListener('click', closeBtn) //close success msg event 
function closeBtn(){

    closeButton.parentElement.style.opacity='0';
    let newContent = document.querySelector("span")
    newContent.remove()
}


