const images = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const filterButtons = document.querySelectorAll('.filters button');

let currentIndex = 0;
let imageList = Array.from(images);

// Show Lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showLightbox();
  });
});

function showLightbox() {
  lightbox.style.display = 'flex';
  lightboxImg.src = imageList[currentIndex].src;
}

// Close Lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigation
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageList.length;
  showLightbox();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
  showLightbox();
});

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImg) {
    lightbox.style.display = 'none';
  }
});

// Filter functionality
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Toggle active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    imageList = [];

    images.forEach(img => {
      const category = img.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        img.style.display = 'block';
        imageList.push(img);
      } else {
        img.style.display = 'none';
      }
    });

    // Reset current index
    currentIndex = 0;
  });
});
