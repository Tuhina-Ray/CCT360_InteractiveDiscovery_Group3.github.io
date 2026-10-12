let cat = {
    fullness: 50,
    hydration: 30,
    happiness: 50,
    fitness: 50,
    cleanliness: 70,

}

function updateStatus() {

    document.getElementById("fullness").textContent = cat.fullness;
    document.getElementById("hydration").textContent = cat.hydration;
    document.getElementById("happiness").textContent = cat.happiness;
    document.getElementById("fitness").textContent = cat.fitness;
    document.getElementById("cleanliness").textContent = cat.cleanliness;

    checkEvents();

}

function limitStats() {
    cat.fullness = Math.max(0, Math.min(100, cat.fullness));
    cat.hydration = Math.max(0, Math.min(100, cat.hydration));
    cat.happiness = Math.max(0, Math.min(100, cat.happiness));
    cat.fitness = Math.max(0, Math.min(100, cat.fitness));
    cat.cleanliness = Math.max(0, Math.min(100, cat.cleanliness));
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