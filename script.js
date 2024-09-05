'use strict';

const duration = 750; // Duration of the scroll in milliseconds.

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function smoothScrollTo(targetY) {
    const startY = window.scrollY;
    const distance = targetY - startY;

    let startTime = null;

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const percentage = Math.min((timestamp - startTime) / duration, 1);
        const interpolatedY = lerp(startY, targetY, percentage);

        window.scrollTo(0, interpolatedY);

        if (percentage < 1) {
            requestAnimationFrame(animationStep); // Continue the animation.
        }
    }

    requestAnimationFrame(animationStep);
}

function ScrollToElement(elementID) {
    const element = document.getElementById(elementID);
    const targetY = element.getBoundingClientRect().top + window.scrollY; // Get the target Y position.
    smoothScrollTo(targetY);
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the current page's file name.
    const currentPage = window.location.pathname;

    // Log the current page path to debug.
    console.log("Current page path:", currentPage);

    // Check if the current page is not the index page, index page will have minimal javascript just in case.
    if (!currentPage.endsWith("index.html")) {
        console.log("Not the index page, adding elements...");
        AddRepeatElement("nav");
        AddRepeatElement("footer");
    } else {
        console.log("On the index page, skipping nav/footer injection.");
    }
});

function AddRepeatElement(elementID) {
    const element = document.getElementById(elementID);

    // Check if the element exists on the page.
    if (element) {
        let html = ''; // Define as empty, will fill with HTML in switch cases.

        switch (elementID) {
            case "nav":
                html = `
                    <nav class="d-flex justify-content-end navbar navTextSpacing headerColor navShadow">
                        <div class="d-flex flex-row pe-5">
                            <div class="text-end col">
                                <a class="navbar-brand fontColor" href="/index.html">Home</a>
                            </div>
                            <div class="text-center navDivider">
                                <a>|</a>
                            </div>
                            <div class="text-start col">
                                <a class="navbar-brand fontColor" onclick="ScrollToElement('contactInfo')">Contact</a>
                            </div>
                        </div>
                    </nav>
                     <div class=" pb-5 pt-5"> </div>
                    `;
                break;

            case "footer":
                html = `<div class=" pb-5 pt-5"> </div>
                
                      <footer class="contact " id="contactInfo">
        <div class="row text-center pt-4 pb-4">
            <div class="col sectionDivider largeLH">
                <h3 class="pb-4">Contact</h3>
                <p>07484 810759</p>
                <p>Alex.Bloor@Hotmail.co.uk</p>
                <!-- <a class="bold noTextDec" href="">Download</a> -->
                <p>[<a href="/Files/Alex-Bloor-CV.pdf" download="/Files/Alex-Bloor-CV.pdf"
                        class="bold noTextDec">Download</a>] Resume</p>
            </div>
        </div>
    </footer>`;
                break;
        }

        // Check if the correct element is targeted.
        // console.log(`Inserting HTML for ${elementID}...`);

        // Insert the HTML content before the element.
        element.insertAdjacentHTML('afterbegin', html);
    } else {
        // Log if the element does not exist on the page.
        console.log(`${elementID} element not found.`);
    }
}
