let cat = {
    fullness: 50,
    hydration: 30,
    happiness: 50,
    fitness: 50,
    cleanliness: 70,
}

let actionCounts = {
    feed: 0,
    water: 0,
    play: 0,
    clean: 0,
}

let achievements = [
    {
        id: "foodLover",
        name: "Food Lover",
        icon: "🍗",
        description: "Feed your cat 5 times.",
        unlocked: false
    },
    {
        id: "hydrationHero",
        name: "Hydration Hero",
        icon: "💧",
        description: "Give your cat water 5 times.",
        unlocked: false
    },
    {
        id: "playfulPaws",
        name: "Playful Paws",
        icon: "🧶",
        description: "Play with your cat 5 times.",
        unlocked: false
    },
    {
        id: "cleanKitty",
        name: "Clean Kitty",
        icon: "🛁",
        description: "Clean your cat 5 times.",
        unlocked: false
    },
    {
        id: "happyCat",
        name: "Happy Cat",
        icon: "😻",
        description: "Make your cat's happiness reach 90.",
        unlocked: false
    },
    {
        id: "overfedCat",
        name: "Overfed Cat",
        icon: "🍽️",
        description: "Make your cat's fullness reach 100.",
        unlocked: false
    },
    {
        id: "fitnessStar",
        name: "Fitness Star",
        icon: "🏋️‍♂️",
        description: "Make your cat's fitness reach 100.",
        unlocked: false
    },
    {
        id: "superCaretaker",
        name: "Super Caretaker",
        icon: "🌟",
        description: "Perform 15 care actions in total.",
        unlocked: false
    }
]

// updates the image of the cat depending on context
function updateCatImage(path) {
    document.getElementById('catImage').src = path;
}

// to delay the image change in checkEvents
function delayImageChange(path) {
    setTimeout(function() {
        updateCatImage(path)
    }, 2000); // 2 seconds
}

// update progress bars
function updateCatBars() {
    const stats = ['fullness', 'hydration', 'happiness', 'fitness', 'cleanliness'];

    stats.forEach(function(stat) {
        const value = cat[stat];
        const bar = document.getElementById(stat + 'Bar');

        bar.style.width = value + '%';
    });
}

function updateStatus() {

    document.getElementById("fullness").textContent = cat.fullness;
    document.getElementById("hydration").textContent = cat.hydration;
    document.getElementById("happiness").textContent = cat.happiness;
    document.getElementById("fitness").textContent = cat.fitness;
    document.getElementById("cleanliness").textContent = cat.cleanliness;

    updateCatBars();
    checkEvents();
    checkAchievements();
}

function limitStats() {
    cat.fullness = Math.max(0, Math.min(100, cat.fullness));
    cat.hydration = Math.max(0, Math.min(100, cat.hydration));
    cat.happiness = Math.max(0, Math.min(100, cat.happiness));
    cat.fitness = Math.max(0, Math.min(100, cat.fitness));
    cat.cleanliness = Math.max(0, Math.min(100, cat.cleanliness));
}

// ACHIEVEMENTS

function checkAchievements() {
    let totalActions=
    actionCounts.feed +
    actionCounts.water +
    actionCounts.play +
    actionCounts.clean;

    let newlyUnlocked = [];

    achievements.forEach(function(badge) {
        let earned = false;

        if (badge.id === "foodLover" && actionCounts.feed >= 5) {
            earned = true;
        } else if (badge.id === "hydrationHero" && actionCounts.water >= 5) {
            earned = true;
        } else if (badge.id === "playfulPaws" && actionCounts.play >= 5) {
            earned = true;
        }
        else if (badge.id === "cleanKitty" && actionCounts.clean >= 5) {
            earned = true;
        } else if (badge.id === "happyCat" && cat.happiness >= 90) {
            earned = true;
        } else if (badge.id === "overfedCat" && cat.fullness >= 100) {
            earned = true;
        } else if (badge.id === "fitnessStar" && cat.fitness >= 100) {
            earned = true;
        } else if (badge.id === "superCaretaker" && totalActions >= 15) {
            earned = true;
        }

        if (earned && !badge.unlocked) {
            badge.unlocked = true;
            newlyUnlocked.push(badge);
        }

    })

    if (newlyUnlocked.length > 0) {
        new Audio("sounds/badge.mp3").play();
        
        document.getElementById("badgeMessage").textContent = "Achievement Unlocked: " + 
        newlyUnlocked.map(function(badge) {
            return badge.icon + " " + badge.name; 
        }).join(", ") + "!";
        alert("New Achievement Unlocked!!");
        
    } else {
        let unlockedCount = achievements.filter(function(badge) {
            return badge.unlocked;
        }).length;

        document.getElementById("badgeMessage").textContent = 
        "Badges unlocked: " + unlockedCount +
         " / " + achievements.length;
        }
    displayAchievements();
    }

// DISPLAY BADGES 

function displayAchievements() {
    let container = document.getElementById("badgeContainer");
    container.innerHTML = "";
    
    achievements.forEach(function(badge) {
        let badgeCard= document.createElement("div");
        badgeCard.className = badge.unlocked ? "badge unlocked" : "badge locked";
        let icon = badge.unlocked ? badge.icon: "🔒";

        let status = badge.unlocked ? "Unlocked" : "Not unlocked yet";

        badgeCard.innerHTML = `
            <div class= "badgeIcon">${icon}</div>
            <h3>${badge.name}</h3>
            <p>${badge.description}</p>
            <p>${status}</p>
        `;

        container.appendChild(badgeCard);
    });
}
        

//INTERACTIVE BUTTONS

document.getElementById("playButton").addEventListener("click", function() { 
    actionCounts.play++;
    new Audio("sounds/squeak.mp3").play();
    cat.fullness -= 10;
    cat.hydration -= 15;
    cat.happiness += 15;
    cat.fitness += 10;
    cat.cleanliness -= 10;

    document.getElementById('catMessage').textContent = 'Your cat had fun playing!';
    updateCatImage('images/happy-cat.jpg');
    
    limitStats();
    updateStatus();
});

document.getElementById("feedButton").addEventListener("click", function() {
    actionCounts.feed++;
    new Audio("sounds/eat.mp3").play();
    cat.fullness += 25;
    cat.happiness += 5;
    cat.fitness -= 10;

    document.getElementById('catMessage').textContent = 'Your cat enjoyed its food :)';
    updateCatImage('images/eating-cat.jpg');
    
    limitStats();
    updateStatus();
});

document.getElementById("waterButton").addEventListener("click", function() {
    actionCounts.water++;
    new Audio("sounds/water.mp3").play();
    cat.hydration += 30;
    cat.happiness += 2;

    document.getElementById("catMessage").textContent = "Your cat drank some water!";
    updateCatImage('images/drinking-cat.jpg');
    
    limitStats();
    updateStatus();
});


document.getElementById("cleanButton").addEventListener("click", function() {
    actionCounts.clean++;
    new Audio("sounds/bubbles.mp3").play();
    cat.happiness -= 10;
    cat.cleanliness += 30; 
    
    document.getElementById("catMessage").textContent = "You bathed your cat!";
    updateCatImage('images/clean-cat.jpg');
    
    limitStats();
    updateStatus();  
});


//EVENTS

function checkEvents(){

    let events = [];
    let catImage = 'images/content-cat.jpg'; // default image

    const eventMessage = document.getElementById("eventMessage");
    
    // Hydration
    if (cat.hydration <= 10) {
        events.push("Your cat is thirsty!");
    } else if (cat.hydration >= 90) {
        events.push("Your cat is very hydrated!");
    } 


    // Fullness
    if (cat.fullness <= 10) {
        events.push("Your cat is hungry!");
    } else if (cat.fullness >= 90) {
        events.push("Your cat is way too full!");
    }
    

    // Cleanliness
    if (cat.cleanliness <= 10) {
        events.push("Your cat needs a bath!");
    } else if (cat.cleanliness >= 90) {
        events.push("Your cat is very clean!");
    }


    // Happiness
    if (cat.happiness <= 10) {
        events.push("Your cat is unhappy!");
    } else if (cat.happiness >= 90) {
        events.push("Your cat is very happy!");
    }


    // Fitness
    if (cat.fitness <= 10) {
        events.push("Your cat is unfit!");
    } else if (cat.fitness >= 90) {
        events.push("Your cat is very fit!");
    }

    // checks to update the image
    // these checks are here to ensure these conditions have priority
    if (cat.hydration <= 10 || cat.fullness <= 10 || cat.fullness >= 90 || cat.cleanliness <= 10 || cat.happiness <= 10 || cat.fitness <= 10) {
        catImage = 'images/sad-cat.jpg';
    }
    else if (cat.happiness >= 90 || cat.fitness >= 90) {
        catImage = 'images/happy-cat.jpg';
    }

    // update cat's image accordingly with a delay, to allow for the button-click image-change to show
    delayImageChange(catImage);

    eventMessage.textContent = events.join(" ");

}

 // PET FEATURE: MEOW WHEN CAT IS CLICKED 

    const catImage = document.getElementById("catImage");

    const meowSounds = [ "sounds/meow1.mp3","sounds/meow2.mp3","sounds/meow3.mp3"]

    catImage.addEventListener("click", function(){
        const meowSound = new Audio(meowSounds[Math.floor(Math.random() * meowSounds.length)]);
        cat.happiness += 5; 
        limitStats();
        updateStatus(); 

        meowSound.play();
    })

updateStatus();