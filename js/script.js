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


    

function updateStatus() {

    document.getElementById("fullness").textContent = cat.fullness;
    document.getElementById("hydration").textContent = cat.hydration;
    document.getElementById("happiness").textContent = cat.happiness;
    document.getElementById("fitness").textContent = cat.fitness;
    document.getElementById("cleanliness").textContent = cat.cleanliness;

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
        document.getElementById("badgeMessage").textContent = "Achievement Unlocked: " + 
        newlyUnlocked.map(function(badge) {
            return badge.icon + " " + badge.name;
        }).join(", ") + "!";
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
    
    
    if (cat.fullness <= 10 || cat.hydration <= 10) {
        cat.happiness -= 5;
        document.getElementById("catMessage").textContent = "Your cat is too hungry or thirsty to play!";
    } else {
        cat.fullness -= 10;
        cat.hydration -= 15;
        cat.happiness += 15;
        cat.fitness += 10;
        cat.cleanliness -= 10;

        document.getElementById("catMessage").textContent = "Your cat had fun playing!";
    }

    limitStats();
    updateStatus();

});

document.getElementById("feedButton").addEventListener("click", function() {
    if (cat.fullness >= 90) {
        document.getElementById("catMessage").textContent = "Your cat is too full to eat!";
    } else {
        cat.fullness += 25;
        cat.happiness += 5;
        cat.fitness -= 10;

        document.getElementById("catMessage").textContent = "Your cat enjoyed its food!";
    }

    limitStats();
    updateStatus();
});

document.getElementById("waterButton").addEventListener("click", function() {
    cat.hydration += 30;
    cat.happiness += 2;

    limitStats();
    updateStatus();

    document.getElementById("catMessage").textContent = "Your cat drank some water!";
});


document.getElementById("cleanButton").addEventListener("click", function() {
    
    cat.happiness -= 10;
    cat.cleanliness += 30; 

    limitStats();
    updateStatus();

    document.getElementById("catMessage").textContent = "You bathed your cat!";
});


//EVENTS

function checkEvents(){

    let events = [];

    const eventMessage = document.getElementById("eventMessage");
    
    // Hydration
    if (cat.hydration <= 10) {
        events.push("Your cat is thirsty!");
    } else if (cat.hydration >= 90) {
        events.push("Your cat is very hydrated!");
    } 


    //fullness
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

    eventMessage.textContent = events.join(" ");

}