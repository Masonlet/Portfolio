let activeLeft = false;
let activeRight = false;
let leftString = "";
let rightString = "";
let disable = false;

window.onload = function() { 
    if (document.getElementById("homePage")) {
        printLeft("about");
    }
    else if (document.getElementById("aboutPage")) {
        printLeft("life");
        printRight("job1");
    }
 };

function printRight(outputType) {
    if(!activeRight){
        switch(outputType){ 
            case "job1":
                rightString = "Insert some text about first job description, job role, skills required for job, etc etc...";
                document.getElementById("job1").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
                document.getElementById("job2").style.backgroundColor = "transparent";
                document.getElementById("job3").style.backgroundColor = "transparent";
                break;
            case "job2":
                rightString = "Insert some text about second job description, job role, skills required for job, etc etc...";
                document.getElementById("job1").style.backgroundColor = "transparent";
                document.getElementById("job2").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
                document.getElementById("job3").style.backgroundColor = "transparent";
                break;
            case "job3":
                rightString = "Insert some text about third job description, job role, skills required for job, etc etc...";
                document.getElementById("job1").style.backgroundColor = "transparent";
                document.getElementById("job2").style.backgroundColor = "transparent";
                document.getElementById("job3").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
                break;
        }
        if(document.getElementById("Output2").innerHTML !== ""){
            document.getElementById("Output2").innerHTML = "";
        }
       
        activeRight = true;
        output(true, 0);
    }
}
function printLeft(outputType) {
    if(!activeLeft){
        switch(outputType){
            case "life":
                leftString = "I was born in London, ontario and have lived in the area my entire life. I have traveled to every province in canada and been around a good chunk of America.<" +
                "Ever since a young age I have been extremely interested in technology, computers, and gaming. I've always had basic knowledge of how to work on computers by building them from a young age.\n" +
                "I dabled in programming in highschool, but I was more interested in automotive and mechanical work so I decided to start my college career at Fanshawe in their automotive technician program. After doing this for a year I realized mechanical work was more of a hobby then a career. I decided to flip the boat and jump straight back into Fanshawe for Computer Programming.\n" +
                "I enjoy programming more then I ever imagined I would. Now that I truly had the chance to dive into coding I have been so intrigued by the complexity and the problem solving that comes with it. I am now in my second year of the program and I am loving every second of it.<";
                break;
            case "about":
                leftString = "Hello and welcome to my portfolio! I am currently enrolled at Fanshawe College pursuing a degree in Computer Programming and Analysis.<" + 
                    "I have a strong passion for learning, problem solving and have been completely engulfed in the deep and complex world that surrounds coding and programming.<" +
                    "I have not found a specialization that I have commited myself to yet. My current objective is to simply expand my knowledge and skills in as many areas as possible.<" +
                    "Thank you very checking out my portfolio, I hope you enjoy exploring my projects and learning about me.<>";
                document.getElementById("about").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
                document.getElementById("skills").style.backgroundColor = "transparent";
                document.getElementById("contacts").style.backgroundColor = "transparent";
                break;
            case "skills":
                leftString = "Front-end languages\n" +
                "- JavaScript\n- CSS\n- HTML\n" +
                "<Back-end languages\n" + 
                "- Java\n- C++\n- SQL";
                document.getElementById("about").style.backgroundColor = "transparent";
                document.getElementById("skills").style.backgroundColor = "rgba(0, 0, 0, 0.15)";
                document.getElementById("contacts").style.backgroundColor = "transparent";
                break;
        }

        if(document.getElementById("Output").innerHTML !== ""){
            document.getElementById("Output").innerHTML = "";
        }

        activeLeft = true;
        output(false, 0);
    }
}

//Function to add the next character to the output text
function output(print2, index){

    let outputDiv = null;

    if(print2) {
        outputDiv = document.getElementById("Output2");
    }
    else {
        outputDiv = document.getElementById("Output");
    }
    
    //End recursive function if we are at the end of the string
    if(index === leftString.length || (print2 && index === rightString.length)){
        if(print2){
            activeRight = false;
        }
        else {
            activeLeft = false;
        }
        return true;
    }


    //Next character to add

    let nextChar;

    if (print2) {
        nextChar = rightString.charAt(index);
    }
    else {
        nextChar = leftString.charAt(index);
    }

    //Add the next character to the output
    if(nextChar === '<'){
        outputDiv.innerHTML += "<div id = 'break'></div>";
    }
    else if (nextChar === '>'){
        outputDiv.innerHTML += "<a id='about' class='hoverColor' style='margin-top:4vh;display:flex; font-size: 2vw;border: 2px solid #004d4d;border-radius: 6%;background: rgba(0, 0, 0, 0.10); width: 100%; justify-content: center; 'href='about.html'>Click for more information about me</a>";
    }
    else if (nextChar === '\n') {
        outputDiv.innerHTML += "<br>";
    }
    else {
        outputDiv.innerHTML += nextChar;
    }
   

    //Recursively call this function with the next index
    const delay = 6;
    setTimeout(() => output(print2, (index + 1)), delay);
    return true;
}