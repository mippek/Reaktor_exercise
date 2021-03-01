const nav = document.getElementById("myNav");
const links = nav.getElementsByClassName("navlink");

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

const loadDiv = document.getElementById("loadDiv")
const loadText = loadDiv.getElementsByTagName("h2")[0].textContent;

/* If there is a loading text 'Loading...' a timeout for refreshing the page is set for 2 minutes 
 * as that is the time it takes to fetch the data when the application is started. If there is no text,
 * the timeout is set to 5 minutes as that is the time between data updates. */
if (loadText !== "") {
    setTimeout("location.reload();", 2 * 60 * 1000);
} else {
    setTimeout("location.reload();", 5 * 60 * 1000);
}