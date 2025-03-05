// Tab Switching Logic
const tabs = {
  rating: document.getElementById('rating-tab'),
  landlordDirectory: document.getElementById('landlord-directory-tab'),
  addLandlord: document.getElementById('add-landlord-tab')
};

const buttons = {
  rating: document.getElementById('tab-rating'),
  landlordDirectory: document.getElementById('tab-landlord-directory'),
  addLandlord: document.getElementById('tab-add')
};

// Pre-populated Landlord Data
const landlords = [
  {
    name: "The Related Companies",
    phone: "(212) 801-1000",
    email: "contact@related.com",
    property: "Hudson Yards",
    photo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Hudson_Yards_%28Manhattan%29_1.jpg"
  },
  {
    name: "Tishman Realty & Construction",
    phone: "(212) 453-2500",
    email: "info@tishmanrealty.com",
    property: "The MetLife Building",
    photo: "https://upload.wikimedia.org/wikipedia/commons/2/26/MetLife_Building%2C_NYC.jpg"
  },
  {
    name: "Silverstein Properties",
    phone: "(212) 266-4500",
    email: "info@silversteinproperties.com",
    property: "World Trade Center",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/One_World_Trade_Center_September_2018.jpg"
  },
];

// Helper function to switch tabs
function switchTab(tabKey) {
  Object.values(tabs).forEach(tab => tab.classList.remove('active'));
  Object.values(buttons).forEach(button => button.classList.remove('active'));

  tabs[tabKey].classList.add('active');
  buttons[tabKey].classList.add('active');
}

// Event Listeners for Tab Switching
buttons.rating.addEventListener('click', () => switchTab('rating'));
buttons.landlordDirectory.addEventListener('click', () => switchTab('landlordDirectory'));
buttons.addLandlord.addEventListener('click', () => switchTab('addLandlord'));

// Display Landlord List
function displayLandlordList() {
  const landlordListUl = document.getElementById('landlord-list-ul');
  landlordListUl.innerHTML = ''; // Clear the list
  landlords.forEach(landlord => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img class="landlord-image" src="${landlord.photo}" alt="${landlord.property}" />
      <div>
        <p><strong>${landlord.name}</strong> (${landlord.property})</p>
        <p>${landlord.phone} | ${landlord.email}</p>
      </div>
    `;
    landlordListUl.appendChild(listItem);
  });
}

// Initialize landlord list on page load
window.onload = displayLandlordList;

// Rating Logic
let selectedRating = 0;
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    updateStars();
    updateRatingInfo();
  });
});

function updateStars() {
  stars.forEach(star => {
    if (parseInt(star.dataset.value) <= selectedRating) {
      star.style.color = '#ffcc00';
    } else {
      star.style.color = '#ddd';
    }
  });
}

function updateRatingInfo() {
  document.getElementById('average-rating').textContent = selectedRating;
  document.getElementById('total-ratings').textContent = 1; // For now, set to 1
}

// Comment Submission Logic
const commentBox = document.getElementById('comment-box');
const commentsList = document.getElementById('comments-list');
document.getElementById('submit-comment').addEventListener('click', () => {
  const comment = commentBox.value;
  if (comment) {
    const commentItem = document.createElement('p');
    commentItem.textContent = comment;
    commentsList.appendChild(commentItem);
    commentBox.value = ''; // Clear the comment box
  }
});

// Add Landlord Form Logic
document.getElementById('add-landlord-form').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('landlord-name').value;
  const phone = document.getElementById('landlord-phone').value;
  const email = document.getElementById('landlord-email').value;
  const property = document.getElementById('landlord-property').value;
  const photo = document.getElementById('landlord-photo').files[0];

  const newLandlord = {
    name,
    phone,
    email,
    property,
    photo: URL.createObjectURL(photo)
  };

  landlords.push(newLandlord);
  displayLandlordList();
});
