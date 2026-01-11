// Run this function every time the page loads
window.onload = function() {
    displaySavedCards();
};

function openModal() {
    document.getElementById('submitModal').style.display = "block";
}

function closeModal() {
    document.getElementById('submitModal').style.display = "none";
}

function addNewCard() {
    const cardData = {
        name: document.getElementById('userName').value,
        role: document.getElementById('userRole').value,
        bio: document.getElementById('userBio').value,
        img: document.getElementById('userImg').value || 'https://via.placeholder.com/500',
        tag: document.getElementById('userTag').value,
        id: Date.now() // Unique ID for each card
    };

    if (!cardData.name || !cardData.bio) {
        alert("দয়া করে নাম এবং গল্পটি পূরণ করুন।");
        return;
    }

    // 1. Get existing cards from LocalStorage, or start empty array
    const savedCards = JSON.parse(localStorage.getItem('userStories')) || [];
    
    // 2. Add new card to the list
    savedCards.push(cardData);
    
    // 3. Save back to LocalStorage
    localStorage.setItem('userStories', JSON.stringify(savedCards));

    // 4. Refresh display
    displaySavedCards();
    closeModal();
    
    // Reset form
    document.querySelectorAll('.form-grid input, .form-grid textarea').forEach(i => i.value = "");
}

function displaySavedCards() {
    const archiveGrid = document.querySelector('.archive-content');
    const savedCards = JSON.parse(localStorage.getItem('userStories')) || [];

    // Clear grid of previously generated user cards to prevent duplicates
    // Note: This won't remove your hardcoded HTML cards
    const existingUserCards = document.querySelectorAll('.user-contributed');
    existingUserCards.forEach(card => card.remove());

    savedCards.forEach(card => {
        const cardHTML = `
            <div class="card user-contributed">
                <div class="card-image">
                    <img src="${card.img}">
                    <div class="card-badge">নতুন গল্প</div>
                </div>
                <div class="card-details">
                    <h2 class="person-name">${card.name}</h2>
                    <p class="person-role">${card.role}</p>
                    <p class="person-bio">${card.bio}</p>
                    <div class="card-footer">
                        <a href="#" class="read-more">গল্পটি পড়ুন →</a>
                        <span class="incident-tag">${card.tag}</span>
                    </div>
                </div>
            </div>
        `;
        archiveGrid.insertAdjacentHTML('afterbegin', cardHTML);
    });
}