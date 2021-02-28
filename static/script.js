let nav = document.getElementById("myNav");
let links = nav.getElementsByClassName("navlink");

/* Loops through the links and adds the active class to the current link. */
for (let i = 0; i < links.length; i++) {
    if (window.location.href === links[i].href) {
        let current = document.getElementsByClassName("active");
        if (current[0]) {
            current[0].className = current[0].className.replace(" active", "");
        }
        links[i].className += " active";
    }
} 
