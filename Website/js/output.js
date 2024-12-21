let activeLeft = false;
let activeRight = false;
let leftString = "";
let rightString = "";
const TYPING_SPEED = 8;

window.onload = function () { 
    if (document.getElementById("homePage")) {
        if (sessionStorage.getItem("aboutLoaded") === "true") {
            document.getElementById("output").innerHTML = getAbout("about");
            document.getElementById("output").innerHTML += createFooter();
        } else {
            printLeft("about");
            sessionStorage.setItem("aboutLoaded", true);
        }
    }
    else if (document.getElementById("aboutPage")) {
        printLeft("life");
        printRight("job1");
        sessionStorage.setItem("life", true);
        sessionStorage.setItem("job1", true);
    }
 };

function getJob(selectedJob) {
    switch (selectedJob) {
        case "job1":
            return "Insert some text about first job description, job role, skills required for job, etc etc..."
        case "job2":
            return "Insert some text about second job description, job role, skills required for job, etc etc...";
        case "job3":
            return "Insert some text about third job description, job role, skills required for job, etc etc...";
    }
}
function updateJob(selectedJob) {
    document.getElementById("job1").style.backgroundColor = selectedJob ? "rgba(0, 0, 0, 0.15)" : "transparent";
    document.getElementById("job2").style.backgroundColor = selectedJob ? "rgba(0, 0, 0, 0.15)" : "transparent";
    document.getElementById("job3").style.backgroundColor = selectedJob ? "rgba(0, 0, 0, 0.15)" : "transparent";
}

function getAbout(selectedSection) {
    switch (selectedSection) {
        case "life":
            return `I was born in London, ontario and have lived in the surrounding area my entire life. I have traveled to every province in Canada and have been around a good chunk of America.<br>
                From a young age, I have always been extremely interested in technology, computers, and gaming. I've always had basic knowledge of how to work on computers by building them from a young age.<br>
                I dabled in programming in highschool, but I was more interested in automotive and mechanical work so I decided to start my college career at Fanshawe in their automotive technician program. After doing this for a year I realized mechanical work was more of a hobby than a career. I decided to flip the boat from the physcial work of a mechanic and pursue Computer Programming.<br>
                I enjoy programming more then I ever imagined I would. Now that I truly had the chance to dive into coding I have been so intrigued by the complexity and the problem solving that comes with it. I am now in my second year of the program and I am loving every second of it.<br>`;
        case "about":
            return `Hello and welcome to my portfolio. I am currently a student at Fanshawe College, pursuing a degree in Computer Programming and Analysis.<br>
                I have a strong passion for learning, problem solving and have been completely deeply immersed in the fascinating and complex world that surrounds coding and programming.<br>
                While I have not yet commited to a specific specialization, my current objective is to broaden my knowledge and skills across as many areas as possible.<br>
                Thank you very taking the time to explore my portfolio, I hope you enjoy learning about my projects and getting to know me.<br>`;
        case "skills":
            return `Front-end languages<br>- HTML<br>- CSS<br>- JavaScript<br><br>Back-end languages<br>- Java<br>- C++<br>- C#<br>- SQL`;
    }
}
function updateAbout(selectedSection) {
    document.getElementById("about").style.backgroundColor = selectedSection ? "rgba(0, 0, 0, 0.15)" : "transparent";
    document.getElementById("skills").style.backgroundColor = selectedSection ? "rgba(0, 0, 0, 0.15)" : "transparent";
    document.getElementById("contacts").style.backgroundColor = selectedSection ? "rgba(0, 0, 0, 0.15)" : "transparent";
}

function createFooter() {
    return `<footer><a id="button" class="hoverColor" style="margin-top:4vh;display:flex; font-size: 2vw;border: 2px solid #004d4d;border-radius: 6%;background: rgba(0, 0, 0, 0.10); width: 100%; justify-content: center;" href="about.html">Click for more information</a></footer>`;
}

function printRight(outputType) {
    if(!activeRight){
        rightString = getJob(outputType);
        updateJob(outputType);

        if (sessionStorage.getItem(`${outputType}Seen`) === "true") {
            document.getElementById("output2").innerHTML = rightString;
            activeRight = false;
        }
        else {
            document.getElementById("output2").innerHTML = "";
            activeRight = true;
            output(true, 0);
            sessionStorage.setItem(`${outputType}Seen`, "true");
        }
    }
}
function printLeft(outputType) {
    if(!activeLeft){
        leftString = getAbout(outputType);

        if (sessionStorage.getItem(`${outputType}Seen`) === "true") {
            document.getElementById("output").innerHTML = leftString;
        }
        else {
            document.getElementById("output").innerHTML = "";
            activeLeft = true;
            output(false, 0);
            sessionStorage.setItem(`${outputType}Seen`, "true");
        }
    }
}

//Function to add the next character to the output text
function output(printRight, index){
    const outputDiv = printRight ? document.getElementById("output2") : document.getElementById("output");
    const currentString = printRight ? rightString : leftString;

    //End recursive function if we are at the end of the string
    if (index >= currentString.length){
        if (printRight) activeRight = false;
        else activeLeft = false;
        return true;
    }

    //Next character to add
    const nextChar = currentString.charAt(index);

    if (nextChar === '<') {
        let tagEnd = currentString.indexOf('>', index);
        let fullTag = currentString.substring(index, tagEnd + 1);
        outputDiv.innerHTML += fullTag;
        setTimeout(() => output(printRight, tagEnd + 1), TYPING_SPEED);
    }
    else {
        //Add the next character to the output
        outputDiv.innerHTML += nextChar;

        //Recursively call this function with the next index
        setTimeout(() => output(printRight, index + 1), TYPING_SPEED);
    }
    return true;
}