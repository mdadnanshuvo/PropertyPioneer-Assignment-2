// Sample data for locations and currencies
const currencyData = {
    "Portugal": "EUR",
    "United States": "USD",
    "United Kingdom": "GBP",
    "Japan": "JPY",
    "Canada": "CAD",
    "Australia": "AUD",
    "Brazil": "BRL",
    "China": "CNY",
    "Denmark": "DKK",
    "Egypt": "EGP",
    "France": "EUR",
    "Germany": "EUR",
    "Hong Kong": "HKD",
    "India": "INR",
    "Indonesia": "IDR",
    "Italy": "EUR",
    "Malaysia": "MYR",
    "Mexico": "MXN",
    "Netherlands": "EUR",
    "New Zealand": "NZD",
    "Norway": "NOK",
    "Pakistan": "PKR",
    "Philippines": "PHP",
    "Russia": "RUB",
    "Saudi Arabia": "SAR",
    "Singapore": "SGD",
    "South Africa": "ZAR",
    "South Korea": "KRW",
    "Spain": "EUR",
    "Sweden": "SEK",
    "Switzerland": "CHF",
    "Taiwan": "TWD",
    "Thailand": "THB",
    "Turkey": "TRY",
    "United Arab Emirates": "AED",
    "Vietnam": "VND",
    "Argentina": "ARS",
    "Bangladesh": "BDT",
    "Chile": "CLP",
    "Colombia": "COP",
    "Czech Republic": "CZK",
    "Hungary": "HUF",
    "Iceland": "ISK",
    "Kenya": "KES",
    "Morocco": "MAD",
    "Nigeria": "NGN",
    "Poland": "PLN",
    "Qatar": "QAR",
    "Romania": "RON",
    "Sri Lanka": "LKR",
    "Ukraine": "UAH",
    "Venezuela": "VES",
    "Greece": "EUR",
    "Austria": "EUR",
    "Ireland": "EUR",
    "Luxembourg": "EUR",
    "Finland": "EUR",
    "Belgium": "EUR",
    "Croatia": "HRK",
    "Serbia": "RSD",
    "Bulgaria": "BGN",
    "Georgia": "GEL",
    "Peru": "PEN",
    "Jordan": "JOD",
    "Kuwait": "KWD",
    "Lebanon": "LBP"
};

// Populate dropdown with countries
function populateLocations() {
    const locationSelect = document.getElementById('location');
    locationSelect.innerHTML = '<option value="">-- Select Region --</option>';
    Object.keys(currencyData).forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });
}

// Update the currency field based on selected location
document.getElementById('location').addEventListener('change', function() {
    const selectedLocation = this.value;
    document.getElementById('currency').value = selectedLocation ? currencyData[selectedLocation] : "";
});

// Show the modal when the trigger link is clicked
document.getElementById('trigger-modal').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('location-modal').style.display = 'flex';
});

// Hide the modal when the close button is clicked
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('location-modal').style.display = 'none';
});

// Save the selected location and update the displayed link text
document.getElementById('save-location').addEventListener('click', function() {
    const locationSelect = document.getElementById('location');
    const selectedLocation = locationSelect.value;

    if (selectedLocation) {
        // Update the link text with the selected location
        document.getElementById('selected-location').textContent = selectedLocation;
    }

    // Hide the modal after saving
    document.getElementById('location-modal').style.display = 'none';
});

// Initialize locations on page load
window.onload = populateLocations;




let adultCount = 2;
let childCount = 0;

function toggleTravelersPopup() {
    const popup = document.getElementById("travelers-popup");
    popup.style.display = popup.style.display === "none" || popup.style.display === "" ? "block" : "none";
    updateButtonStates(); // Call this function to update button states when the popup opens
}

function increment(type) {
    if (type === 'adults') {
        adultCount++;
        document.getElementById("adult-count").textContent = adultCount;
    } else if (type === 'children') {
        childCount++;
        document.getElementById("child-count").textContent = childCount;
    }
    updateTotalTravelers();
    updateButtonStates(); // Update button states after incrementing
}

function decrement(type) {
    if (type === 'adults' && adultCount > 0) {
        adultCount--;
        document.getElementById("adult-count").textContent = adultCount;
    } else if (type === 'children' && childCount > 0) {
        childCount--;
        document.getElementById("child-count").textContent = childCount;
    }
    updateTotalTravelers();
    updateButtonStates(); // Update button states after decrementing
}

function updateTotalTravelers() {
    const totalTravelers = adultCount + childCount;
    document.getElementById("total-travelers").textContent = totalTravelers;
}

function updateButtonStates() {
    // Disable the decrement button for adults if the count is at minimum (1)
    document.querySelector("button[onclick=\"decrement('adults')\"]").disabled = (adultCount <= 0);

    // Disable the decrement button for children if the count is at minimum (0)
    document.querySelector("button[onclick=\"decrement('children')\"]").disabled = (childCount <= 0);
}

// Close the popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById("travelers-popup");
    if (event.target !== popup && !popup.contains(event.target) && event.target !== document.querySelector(".travelers-selection-trigger")) {
        popup.style.display = "none";
    }
};



// Array of image URLs and descriptions for the gallery
const images = [
    { src: "./assets/images/house1.jpg", description: "Beautiful view of the lake with surrounding trees." },
    { src: "./assets/images/house2.jpg", description: "Sunny day on the wooden deck with red chairs." },
    { src: "./assets/images/house3.jpg", description: "A cozy interior with a fireplace and sofa." },
    { src: "./assets/images/house4.jpg", description: "Gorgeous mountain landscape covered in mist." },
    { src: "./assets/images/house5.jpg", description: "Beautiful view of the lake with surrounding trees." },
    { src: "./assets/images/house6.jpg", description: "Sunny day on the wooden deck with red chairs." },
    { src: "./assets/images/house7.jpg", description: "A cozy interior with a fireplace and sofa." },
    { src: "./assets/images/house8.jpg", description: "Gorgeous mountain landscape covered in mist." }
];

let currentIndex = 0;

function openGallery() {
    const modal = document.getElementById("image-gallery-modal");
    modal.style.display = "flex";
    currentIndex = 0; // Start at the first image
    updateGalleryImage();
}

function closeGallery() {
    const modal = document.getElementById("image-gallery-modal");
    modal.style.display = "none";
}

function updateGalleryImage() {
    const galleryImage = document.getElementById("gallery-image");
    const imageCount = document.getElementById("image-count");
    const imageDescription = document.getElementById("image-description");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // Update image source and description
    galleryImage.src = images[currentIndex].src;
    imageDescription.textContent = images[currentIndex].description;
    imageCount.textContent = `${currentIndex + 1} / ${images.length}`;

    // Disable the previous button on the first image
    prevButton.disabled = currentIndex === 0;

    // Disable the next button on the last image
    nextButton.disabled = currentIndex === images.length - 1;
}

function prevImage() {
    // Only go to the previous image if it's not the first one
    if (currentIndex > 0) {
        currentIndex--;
        updateGalleryImage();
    }
}

function nextImage() {
    // Only go to the next image if it's not the last one
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateGalleryImage();
    }
}

// Close modal when clicking outside of the image
window.onclick = function(event) {
    const modal = document.getElementById("image-gallery-modal");
    if (event.target === modal) {
        closeGallery();
    }
}


// Get the button and icon elements
const saveButton = document.getElementById("save-button");
const heartIcon = saveButton.querySelector(".btn-save-icon");

// Check if the state is saved in localStorage
if (localStorage.getItem("isSaved") === "true") {
    // If the state is saved, update the icon to red
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "fa-heart");
}

// Add click event listener to toggle the state
saveButton.addEventListener("click", () => {
    const isSaved = heartIcon.classList.contains("fa-solid");

    if (isSaved) {
        // If already saved (icon is red), revert it and remove from localStorage
        heartIcon.classList.remove("fa-solid", "fa-heart");
        heartIcon.classList.add("fa-regular", "fa-heart");
        localStorage.setItem("isSaved", "false");
    } else {
        // If not saved, update the icon to red and save the state to localStorage
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid", "fa-heart");
        localStorage.setItem("isSaved", "true");
    }
});




// Open modal when the button is clicked
document.getElementById('shareButton').onclick = function() {
    document.getElementById('shareModalUnique').style.display = "block";
};

// Close modal when 'X' is clicked
document.getElementById('closeModal').onclick = function() {
    document.getElementById('shareModalUnique').style.display = "none";
};

// Close modal if the user clicks anywhere outside the modal
window.onclick = function(event) {
    if (event.target == document.getElementById('shareModalUnique')) {
        document.getElementById('shareModalUnique').style.display = "none";
    }
};

// Share on social media
document.getElementById('facebookShare').onclick = function() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.getElementById('siteUrl').innerText), '_blank');
};

document.getElementById('twitterShare').onclick = function() {
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(document.getElementById('siteUrl').innerText), '_blank');
};

document.getElementById('linkedinShare').onclick = function() {
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.getElementById('siteUrl').innerText), '_blank');
};

// Copy URL to clipboard
document.getElementById('copyUrlBtn').onclick = function() {
    const url = document.getElementById('siteUrl').innerText;
    navigator.clipboard.writeText(url).then(function() {
        alert("URL copied to clipboard!");
    }).catch(function(err) {
        console.error('Error copying URL: ', err);
    });
};











