console.log("settings.js loaded");

function chroma_saving() {
    console.log("chroma_saving");
    current_black_color = localStorage.getItem("tracker_black_badge");
    current_show_badge = localStorage.getItem("tracker_show_badge");
    current_speed = localStorage.getItem("tracker_speed");

    chrome.storage.local.set({ "tracker_speed": [current_speed] }, () => {
        console.log("tracker_speed settings saved");
    });

    chrome.storage.local.set({ "tracker_show_badge": [current_show_badge] }, () => {
        console.log(" tracker_show_badge settings saved");
    });

    chrome.storage.local.set({ "tracker_black_badge": [current_black_color] }, () => {
        console.log("tracker_black_badge settings saved");
    });

}

chroma_saving();

// DEVLOG
function devlog_changes() {
    current_black_color = localStorage.getItem("tracker_black_badge");
    current_show_badge = localStorage.getItem("tracker_show_badge");
    current_speed = localStorage.getItem("tracker_speed");

    console.log("SETTINGS UPDATED");
    console.log("current_black_color: " + current_black_color);
    console.log("current_show_badge: " + current_show_badge);
    console.log("current_speed: " + current_speed);
}
/* END */

// update based off current settings
current_black_color = localStorage.getItem("tracker_black_badge");
current_show_badge = localStorage.getItem("tracker_show_badge");
current_speed = localStorage.getItem("tracker_speed");

devlog_changes();

if (current_black_color == "true") {
    document.getElementById("black_only_gastracker").innerHTML = "Green and Red badge";
} 

if (current_show_badge == "false") {
    document.getElementById("hide_badge_gastracker").innerHTML = "show badge";
}

localStorage.setItem("tracker_speed", current_speed)

const slider = document.getElementById('badge_reload_time');
slider.value = current_speed;

function changed() {
    document.getElementById("change-text").innerHTML = "Saved Changes 👍";
    chroma_saving();
    setTimeout(() => {
        document.getElementById("change-text").innerHTML = "Nothing else to save...";
    }, 3000);
}

//Reset 
function Reset_settings() {
    localStorage.setItem("tracker_black_badge", "false")
    localStorage.setItem("tracker_show_badge", "true")
    localStorage.setItem("tracker_speed", "3")
    changed();
    devlog_changes();
    document.getElementById("reset_gastracker").innerHTML = "Has been reset";
    setTimeout(() => {
        document.getElementById("reset_gastracker").innerHTML = "Reset Settings";
    }, 1000);
    location.reload();
}

const button = document.getElementById("reset_gastracker");
button.addEventListener("click", Reset_settings);
// End of Reset


//Black Badge 
function Black_badge() {
    if ( localStorage.getItem("tracker_black_badge") == "false" ) {
        localStorage.setItem("tracker_black_badge", "true")
        document.getElementById("black_only_gastracker").innerHTML = "Green and Red badge";
    } else {
        localStorage.setItem("tracker_black_badge", "false")
        document.getElementById("black_only_gastracker").innerHTML = "Black only badge";
    }
    changed();
    devlog_changes();
}

const button1 = document.getElementById("black_only_gastracker");
button1.addEventListener("click", Black_badge);
// End of Black Badge

//Show Badge 
function Hide_badge() {
    if ( localStorage.getItem("tracker_show_badge") == "false" ) {
        localStorage.setItem("tracker_show_badge", "true")
        document.getElementById("hide_badge_gastracker").innerHTML = "Hide badge";

    } else {
        localStorage.setItem("tracker_show_badge", "false")
        document.getElementById("hide_badge_gastracker").innerHTML = "Show badge";
    }
    changed();
    devlog_changes();
}

const button2 = document.getElementById("hide_badge_gastracker");
button2.addEventListener("click", Hide_badge);
// End of Show Badge

// speed slider
document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('badge_reload_time');
    
    function handleSliderInput(event) {
        const value = event.target.value;
        console.log(`Slider value: ${value}`);
        localStorage.setItem("tracker_speed", value)
        changed()
    }

    slider.addEventListener('input', handleSliderInput);
});
// end of speed slider

// Reload Extension
document.getElementById('reload_extension').addEventListener('click', function() {
    chrome.runtime.reload();
});