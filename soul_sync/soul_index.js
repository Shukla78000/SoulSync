
document.addEventListener("scroll", function() {
    let scrollValue = window.scrollY;
    document.querySelector(".planet1").style.transform = `translateY(${scrollValue * 0.2}px)`;
    document.querySelector(".planet2").style.transform = `translateY(${scrollValue * -0.2}px)`;
});

document.addEventListener("mousemove", (event) => {
    let planets = document.querySelectorAll(".planet");
    planets.forEach((planet, index) => {
        let speed = (index + 1) * 0.02;
        let x = (window.innerWidth - event.pageX * speed) / 100;
        let y = (window.innerHeight - event.pageY * speed) / 100;
        planet.style.transform = `translate(${x}px, ${y}px)`;
    });
});
function generateKundli() {
    let birthDate = document.getElementById("birth-date").value;
    let birthTime = document.getElementById("birth-time").value;

    if (birthDate && birthTime) {
        document.getElementById("kundli-output").innerHTML = 
            `Kundli generated for birth date ${birthDate} and time ${birthTime}.`;
    } else {
        alert("Please enter both Date and Time of Birth.");
    }
}

// Match Kundli
function matchKundli() {
    let boyBirthDate = document.getElementById("boy-birth-date").value;
    let boyBirthTime = document.getElementById("boy-birth-time").value;
    let girlBirthDate = document.getElementById("girl-birth-date").value;
    let girlBirthTime = document.getElementById("girl-birth-time").value;

    if (boyBirthDate && boyBirthTime && girlBirthDate && girlBirthTime) {
        document.getElementById("match-output").innerHTML = 
            `Kundli matched successfully for given birth details.`;
    } else {
        alert("Please enter all birth details for both Boy and Girl.");
    }
}

// Check Horoscope
function checkHoroscope() {
    let sign = document.getElementById("zodiac-sign").value;
    document.getElementById("horoscope-output").innerHTML = 
        `Fetching horoscope for ${sign}...`;
}
async function generateKundli() {
    const birthDate = document.getElementById("birth-date").value;
    const birthTime = document.getElementById("birth-time").value;

    const response = await fetch("http://localhost:5000/generate-kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, birthTime })
    });
    
    const result = await response.json();
    document.getElementById("kundli-output").innerText = result.message;
}

async function matchKundli() {
    const boyBirthDate = document.getElementById("boy-birth-date").value;
    const boyBirthTime = document.getElementById("boy-birth-time").value;
    const girlBirthDate = document.getElementById("girl-birth-date").value;
    const girlBirthTime = document.getElementById("girl-birth-time").value;

    const response = await fetch("http://localhost:5000/match-kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boyBirthDate, boyBirthTime, girlBirthDate, girlBirthTime })
    });

    const result = await response.json();
    document.getElementById("match-output").innerText = result.message;
}

async function checkHoroscope() {
    const zodiacSign = document.getElementById("zodiac-sign").value;

    const response = await fetch("http://localhost:5000/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zodiacSign })
    });

    const result = await response.json();
    document.getElementById("horoscope-output").innerText = result.message;
}

function chatWithAstrologer() {
    window.open("https://wa.me/+919876543210", "_blank");
}

function talkToAstrologer() {
    window.location.href = "tel:+919876543210";
}
