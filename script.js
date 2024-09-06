'use strict';

//Smooth Lerp to selected element ID
function ScrollToElement(elementID) {
    const element = document.getElementById(elementID);
    const targetY = element.getBoundingClientRect().top + window.scrollY; // Get the target Y position.
    smoothScrollTo(targetY);
}

function smoothScrollTo(targetY) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 750; // Duration of the scroll in milliseconds.
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

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}


//Google Analytics
window.addEventListener('DOMContentLoaded', function () {

    // Show the consent banner or has it already been shown
    if (localStorage.getItem('cookie-consent-clicked') == null) {

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <h6 class="pb-2">This site uses cookies to enhance your experience. Do you consent to our use of
                cookies?
            </h6>
            <button id="accept-cookies">Accept</button>
            <button id="decline-cookies">Decline</button>
        `;
        document.body.appendChild(banner);

        document.getElementById('cookie-consent-banner').style.display = 'block';

        // Set up the event listener for the consent button
        document.getElementById('accept-cookies').addEventListener('click', function () {
            // Save consent in localStorage
            localStorage.setItem('cookie-consent', 'true');
            localStorage.setItem('cookie-consent-clicked', 'true');

            // Hide the consent banner
            document.getElementById('cookie-consent-banner').style.display = 'none';

            // Load Google Analytics
            loadGoogleAnalytics();
        });

        // Set up the event listener for the decline consent button
        document.getElementById('decline-cookies').addEventListener('click', function () {
            // Save consent in localStorage
            localStorage.setItem('cookie-consent', 'false');
            localStorage.setItem('cookie-consent-clicked', 'true');

            // Hide the consent banner
            document.getElementById('cookie-consent-banner').style.display = 'none';
        });

    } else {

        if (localStorage.getItem('cookie-consent') === 'true') {
            loadGoogleAnalytics();
        }
    }


    function loadGoogleAnalytics() {
        // Dynamically load the Google Tag Manager script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JY5FRSGYY4';
        document.head.appendChild(script);

        // Initialize the dataLayer and gtag function
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }

        // Once the script is loaded, configure Google Analytics
        script.onload = function () {
            gtag('js', new Date());
            gtag('config', 'G-JY5FRSGYY4');
        };
    }
});

//Footer and Nav
document.addEventListener("DOMContentLoaded", function () {
    // Get the current page's file name.
    const currentPage = window.location.pathname;

    // console.log(currentPage);


    // Log the current page path to debug.
    console.log("Current page path:", currentPage);

    // Check if the current page is not the index page, index page will have minimal javascript just in case.
    if (!currentPage.endsWith("index.html") && !currentPage.endsWith("/")) {

        console.log("Not the index page, adding elements...");
        AddRepeatElement("nav");
        AddRepeatElement("footer");

    } else {
        console.log("On the index page, skipping nav/footer injection.");
    }
});

function AddRepeatElement(elementID) {


    if (elementID) {
        const element = document.createElement('div');
        element.id = elementID;

        let html = '';

        switch (elementID) {
            case "nav":
                html = `
                     <nav class="d-flex justify-content-end navbar navTextSpacing headerColor navShadow">
                        <div class=" d-flex flex-row pe-5">
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
                    <div class="pb-5 pt-5"> </div>
                `;
                break;

            case "footer":
                html = `
                    <div class="pb-5 pt-5"> </div>
                    <footer class="contact " id="contactInfo">
                        <div class="row text-center pt-4 pb-4">
                            <div class="col sectionDivider largeLH">
                                <h3 class="pb-4">Contact</h3>
                                <p>07484 810759</p>
                                <p>Alex.Bloor@Hotmail.co.uk</p>
                                <p>[<a href="/Files/Alex-Bloor-CV.pdf" download="/Files/Alex-Bloor-CV.pdf" class="bold noTextDec">Download</a>] Resume</p>
                            </div>
                        </div>
                    </footer>
                `;
                break;
        }

        // Set the inner HTML
        element.innerHTML = html;

        if (elementID === "nav") {
            // Insert the nav element at the top of the body
            document.body.insertBefore(element, document.body.firstChild);
        } else {
            // Append the footer element to the end of the body
            document.body.appendChild(element);
        }
    }
}