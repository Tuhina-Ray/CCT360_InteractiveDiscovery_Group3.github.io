const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const phoneButton = document.getElementById("phoneButton");
const dialogueOverlay = document.getElementById("dialogueOverlay");
const speakerName = document.getElementById("speakerName");
const dialogueText = document.getElementById("dialogueText");
const nextButton = document.getElementById("nextButton");
const ringSound = document.getElementById("ringSound");



// const placeholderClue = document.getElementById("placeholderClue");

const clueOverlay = document.getElementById("clueOverlay");
const clueImage = document.getElementById("clueImage");
const clueTitle = document.getElementById("clueTitle");
const clueDescription = document.getElementById("clueDescription");
const backToBoardButton = document.getElementById("backToBoardButton");

const clues = {

    placeholderClue: {
        image: "images/placeholder.png",
        alt: "Evidence bag",
        title: "Evidence #01",
        description: "A sealed evidence bag containing an unidentified item."
    },

    secondClue: {
        image: "images/placeholder.png",
        alt: "Case report",
        title: "Case Report",
        description: "An official report containing details about the case."
    }



}



startButton.addEventListener("click", () => {
    startScreen.hidden = true;

    
    document.querySelector(".gameLayout").hidden = false;

    ringSound.play().catch(error => {
        console.log("Could not play ringing sound.");
    });
});


ringSound.play().catch(error => {
    console.log("The browser blocked automatic audio playback.");
});

// THIS IS AN ARRAY FOR THE DIALOGUE
const introduction = [
    {
        speaker: "Lieutenant",
        text: "Hello? Is this the detective assigned to the case?"
    },
    {
        speaker: "Lieutenant",
        text: "We've got a situation that needs your attention. I need you to examine the evidence carefully."
    },
    {
        speaker: "Lieutenant",
        text: "Review the clues on your board. When you're ready to report your findings, call me back."
    }
];

let dialogueIndex = 0;




// Clicking the phone to answer call
phoneButton.addEventListener("click", () => {
    ringSound.pause();
    ringSound.currentTime = 0;
    

    dialogueIndex = 0;
    dialogueOverlay.hidden = false;

    showDialogue();
});

// Display the current dialogue
function showDialogue() {
    const line = introduction[dialogueIndex];

    speakerName.textContent = line.speaker;
    dialogueText.textContent = line.text;

    if (dialogueIndex === introduction.length - 1) {
        nextButton.textContent = "Begin investigation";
    } else {
        nextButton.textContent = "Continue";
    }
}

// Continue dialogue
nextButton.addEventListener("click", () => {
    dialogueIndex++;

    if (dialogueIndex < introduction.length) {
        showDialogue();
    } else {
        dialogueOverlay.hidden = true;
    }
});

//THIS IS THE CLUE BUTTON

document.querySelectorAll(".clueButton").forEach((button) => {
    button.addEventListener("click", () => {
        const clue = clues[button.id];

        clueImage.src = clue.image;
        clueImage.alt = clue.alt;
        clueTitle.textContent = clue.title;
        clueDescription.textContent = clue.description;

        clueOverlay.hidden = false;
    });
});

backToBoardButton.addEventListener("click", () => {
    clueOverlay.hidden = true;
});

