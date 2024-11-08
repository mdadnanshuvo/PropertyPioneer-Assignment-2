// Cache DOM elements at the start for frequently accessed elements
const locationSelect = document.getElementById('location');
const currencyInput = document.getElementById('currency');
const locationModal = document.getElementById('location-modal');
const saveLocationButton = document.getElementById('save-location');
const selectedLocationText = document.getElementById('selected-location');
const triggerModalButton = document.getElementById('trigger-modal');
const closeModalButton = document.getElementById('close-modal');
const travelPopup = document.getElementById("travelers-popup");
const saveButton = document.getElementById("save-button");
const heartIcon = saveButton.querySelector(".btn-save-icon");
const modal = document.getElementById("image-gallery-modal");
const galleryImage = document.getElementById("gallery-image");
const imageCount = document.getElementById("image-count");
const imageDescription = document.getElementById("image-description");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const gallerySide = document.querySelector('.gallery-side');
const dots = document.querySelectorAll('.dot');

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
    locationSelect.innerHTML = '<option value="">-- Select Region --</option>';
    Object.keys(currencyData).forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });
}

// Update currency field based on selected location
locationSelect.addEventListener('change', function() {
    const selectedLocation = this.value;
    currencyInput.value = selectedLocation ? currencyData[selectedLocation] : "";
});

// Toggle modal display
function toggleModal(displayState) {
    locationModal.style.display = displayState;
}

// Show the modal
triggerModalButton.addEventListener('click', function(event) {
    event.preventDefault();
    toggleModal('flex');
});

// Hide the modal
closeModalButton.addEventListener('click', function() {
    toggleModal('none');
});

// Save location selection
saveLocationButton.addEventListener('click', function() {
    const selectedLocation = locationSelect.value;
    if (selectedLocation) selectedLocationText.textContent = selectedLocation;
    toggleModal('none');
});

// Initialize locations on page load
window.onload = populateLocations;

// Travelers selection handling
let adultCount = 2, childCount = 0;

function toggleTravelersPopup() {
    travelPopup.style.display = travelPopup.style.display === "none" || travelPopup.style.display === "" ? "block" : "none";
    updateButtonStates();
}

function increment(type) {
    if (type === 'adults') adultCount++;
    else if (type === 'children') childCount++;
    updateTravelers();
}

function decrement(type) {
    if (type === 'adults' && adultCount > 0) adultCount--;
    else if (type === 'children' && childCount > 0) childCount--;
    updateTravelers();
}

function updateTravelers() {
    document.getElementById("adult-count").textContent = adultCount;
    document.getElementById("child-count").textContent = childCount;
    document.getElementById("total-travelers").textContent = adultCount + childCount;
    updateButtonStates();
}

function updateButtonStates() {
    document.querySelector("button[onclick=\"decrement('adults')\"]").disabled = (adultCount <= 0);
    document.querySelector("button[onclick=\"decrement('children')\"]").disabled = (childCount <= 0);
}

window.onclick = function(event) {
    if (event.target !== travelPopup && !travelPopup.contains(event.target) && event.target !== document.querySelector(".travelers-selection-trigger")) {
        travelPopup.style.display = "none";
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
    modal.style.display = "flex";
    currentIndex = 0;
    updateGalleryImage();
}

function closeGallery() {
    modal.style.display = "none";
}

function updateGalleryImage() {
    galleryImage.src = images[currentIndex].src;
    imageDescription.textContent = images[currentIndex].description;
    imageCount.textContent = `${currentIndex + 1} / ${images.length}`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === images.length - 1;
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateGalleryImage();
    }
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateGalleryImage();
    }
}

window.onclick = function(event) {
    if (event.target === modal) closeGallery();
};

// Save state and update icon
if (localStorage.getItem("isSaved") === "true") {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "fa-heart");
}

saveButton.addEventListener("click", () => {
    const isSaved = heartIcon.classList.contains("fa-solid");
    heartIcon.classList.toggle("fa-solid", !isSaved);
    heartIcon.classList.toggle("fa-regular", isSaved);
    localStorage.setItem("isSaved", !isSaved ? "true" : "false");
});

// Share modal
const shareModal = document.getElementById("shareModal");
const copyLinkBtn = document.getElementById("copyLinkBtn");

function showModal() {
    shareModal.style.display = "block";
    const mainImage = document.querySelector(".gallery-main-img");
    const mainHeading = document.querySelector(".property-title");
    if (mainImage && mainHeading) {
        document.getElementById("modalImage").src = mainImage.src;
        document.getElementById("modalHeading").innerText = mainHeading.innerText;
    }
}

function hideModal() {
    shareModal.style.display = "none";
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        document.getElementById("copyConfirmation").style.display = "block";
        const toast = document.getElementById("toastNotification");
        toast.style.display = "block";
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    }).catch(console.error);
}

document.getElementById("shareButton").onclick = showModal;
document.getElementById("closeModal").onclick = hideModal;
window.onclick = (event) => event.target === shareModal ? hideModal() : null;
copyLinkBtn.onclick = copyLink;

// Gallery dots and scrolling
gallerySide.addEventListener('scroll', debounce(() => {
    const index = Math.round(gallerySide.scrollLeft / gallerySide.clientWidth);
    updateDots(index);
}, 100));

function updateDots(index) {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function scrollToImage(index) {
    gallerySide.scrollLeft = index * gallerySide.clientWidth;
    updateDots(index);
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
