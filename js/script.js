const phoneButton = document.getElementById("phoneButton");
const dialogueOverlay = document.getElementById("dialogueOverlay");
const speakerName = document.getElementById("speakerName");
const dialogueText = document.getElementById("dialogueText");
const nextButton = document.getElementById("nextButton");
const ringSound = document.getElementById("ringSound");


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


