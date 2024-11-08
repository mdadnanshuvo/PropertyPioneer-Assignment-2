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
    "Lebanon": "LBP",
    "Bangladesh" : "BDT"
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




// Function to show the modal and dynamically update it
function showModal() {
    // Get the modal element
    const modal = document.getElementById("shareModal");

    // Get the modal image and heading elements
    const modalImage = document.getElementById("modalImage");
    const modalHeading = document.getElementById("modalHeading");

    // Get the main image and heading from your gallery (based on class names)
    const mainImage = document.querySelector(".gallery-main-img"); // Select the main image element
    const mainHeading = document.querySelector(".property-title"); // Select the main heading element

    // Check if the main image and heading exist
    if (mainImage && mainHeading) {
        // Update the modal image and heading with the content of the main image and heading
        modalImage.src = mainImage.src; // Set the modal image source to the main image's source
        modalHeading.innerText = mainHeading.innerText; // Set the modal heading text to the main heading's text
    }

    // Display the modal
    modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
    const modal = document.getElementById("shareModal");
    modal.style.display = "none";
}

// Function to copy the website link
function copyLink() {
    const copyText = window.location.href; // Use the current page's URL
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Change button text to "Link Copied!"
    const copyButton = document.getElementById("copyLinkBtn");
    copyButton.innerText = "Link Copied!";

    // Reset the button text after 3 seconds
    setTimeout(function() {
        copyButton.innerText = "Copy Website Link"; // Reset back to original text
    }, 3000); // 3 seconds delay
}

// Event listener for the share button
document.getElementById("shareButton").onclick = function() {
    showModal(); // Show the modal when the share button is clicked
};

// Event listener for closing the modal
document.getElementById("closeModal").onclick = function() {
    hideModal(); // Close the modal when the close button is clicked
};

// Event listener for closing the modal if the user clicks outside the modal
window.onclick = function(event) {
    const modal = document.getElementById("shareModal");
    if (event.target === modal) {
        hideModal(); // Close the modal if the user clicks outside of it
    }
};

// Event listener for copying the link
document.getElementById("copyLinkBtn").onclick = function() {
    copyLink(); // Copy the link when the "Copy Link" button is clicked
};


const gallerySide = document.querySelector('.gallery-side');
const dots = document.querySelectorAll('.dot');

gallerySide.addEventListener('scroll', () => {
    const index = Math.round(gallerySide.scrollLeft / gallerySide.clientWidth);
    updateDots(index);
});

function updateDots(index) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function scrollToImage(index) {
    gallerySide.scrollLeft = index * gallerySide.clientWidth;
    updateDots(index);
}



document.getElementById("copyLinkBtn").addEventListener("click", function() {
    // Copy the current page URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
        // Show confirmation message in modal
        document.getElementById("copyConfirmation").style.display = "block";

        // Show toast notification
        const toast = document.getElementById("toastNotification");
        toast.style.display = "block";
        
        // Hide the toast after 3 seconds
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    }).catch((error) => {
        console.error("Error copying text: ", error);
    });
});
