let activeLeft = false;
let activeRight = false;
let leftString = "";
let rightString = "";
const TYPING_SPEED = 20;

window.onload = function () { 
    if (document.getElementById("homePage")) {
        if (sessionStorage.getItem("aboutLoaded") === "true") {
            document.getElementById("leftOutput").innerHTML = getAbout("about") + createFooter();
            setTimeout(() => { document.getElementById("footerButton").style.opacity = 1; }, 50);
        } else {
            printLeft("about");
            sessionStorage.setItem("aboutLoaded", true);
        }
    }
    else if (document.getElementById("aboutPage")) {
        printLeft("life");
        printRight("fanshawe");
        sessionStorage.setItem("life", true);
        sessionStorage.setItem("job1", true);
    }
 };

function getJob(selectedJob) {
    switch (selectedJob) {
        case "fanshawe":
            return `Throughout my time at fanshawe I have completed multiple projects that have spanned across various programs and languages, giving me a good hands-on experience in different areas of computer science.<br>
            These projects have allowed me to translate theoretical knowledge into practical solutions for real-world problems, ranging from creating CRUD applications to developing mathematical expression evaluators.<br>
            Throughout this process, I have gained valuable experience with tools such as Visual Studio, Visual Studio Code, SQL Server Management Studio (SSMS), and have strengthened my understanding of fundamnetal concepts in debugging and problem solving.`
    }
}
function getAbout(selectedSection) {
    switch (selectedSection) {
        case "life":
            return `I was born in London, Ontario and have lived in the surrounding area my entire life.<br>
                From a young age, I have always been extremely interested in technology, computers, and gaming. I've had a good understanding of how to work on computers from a young age by building them.<br>
                I dabled in programming in highschool, but I was more interested in automotive careers so I decided to start my college career at Fanshawe in their automotive technician program. After doing this for a year I realized mechanical work was more of a hobby than a career. I decided to flip the boat from the physcial work of a mechanic and pursue Computer Programming, and I've enjoyed programming more then I ever imagined I would. <br>
                Now that I truly had the chance to dive into coding I have been so intrigued by the complexity and the problem solving that comes with it. I am now in my second year of the program and I am loving every second of it.<br>`;
        case "about":
            return `Welcome to my portfolio.<br>
                I am deeply invested in learning, problem-solving and exploring the fascinating world of programming.<br>
                While I have not yet commited to a specific specialization, my current focus is broadening my knowledge and skills across as many areas as possible.<br>
                I hope you enjoy learning about my projects and getting to know me.<br>`;
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
    return `<footer id ="footerButton"><a id="button" class="hoverColor" href="about.html">Click for more information about me</a></footer>`;
}

function createImage(selectedImage) {
    switch (selectedImage) { 
        case "html":
            return ` <img src="img/languages/html.png" alt="HTML">`;
        case "css":
            return ` <img src="img/languages/css.png" alt="CSS">`
        case "js":
            return ` <img src="img/languages/js.png" alt="JavaScript">`
    }
}

async function printRight(outputType) {
    if (!activeRight) {
        await new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (!activeLeft) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 1);
        });

        rightString = getJob(outputType);

        const outputDiv = document.getElementById("rightOutput");

        if (sessionStorage.getItem(`${outputType}Seen`) === "true") {
            outputDiv.innerHTML = rightString;
            activeRight = false;
        }
        else {
            outputDiv.innerHTML = "";
            activeRight = true;
            output(true, 0);
            sessionStorage.setItem(`${outputType}Seen`, "true");
        }
    }
}
async function printLeft(outputType) {
    if (!activeLeft) {
        leftString = getAbout(outputType);
        if (document.getElementById("homePage")) updateAbout(leftString);

        const outputDiv = document.getElementById("leftOutput");

        if (sessionStorage.getItem(`${outputType}Seen`) === "true") {
            outputDiv.innerHTML = leftString;
            if (outputType === "about") {
                setTimeout(() => {
                    outputDiv.innerHTML += createFooter();
                    document.getElementById("footerButton").style.opacity = 1;
                }, 50);
            }
        }
        else {
            outputDiv.innerHTML = "";
            activeLeft = true;
            output(false, 0);
            sessionStorage.setItem(`${outputType}Seen`, "true");
        }
    }
}

//Function to add the next character to the output text
function output(printRight, index){
    const outputDiv = printRight ? document.getElementById("rightOutput") : document.getElementById("leftOutput");
    const currentString = printRight ? rightString : leftString;

    //End recursive function if we are at the end of the string
    if (index >= currentString.length){
        if (printRight) activeRight = false;
        else {
            activeLeft = false;
            if (document.getElementById("homePage")) {
                outputDiv += createFooter();
                setTimeout(() => { document.getElementById("footerButton").style.opacity = 1; }, 50);
            }
        }
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