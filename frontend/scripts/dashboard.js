// Fetch job listings from your API and populate the job-listings section
async function fetchJobListings() {
    try {
        const response = await fetch('http//localhost:3000/api/get_all_jobs');
        if (!response.ok) {
            throw new Error('Failed to fetch job listings');
        }
        const jobListings = await response.json();
        populateJobListings(jobListings);
    } catch (error) {
        console.error('Error fetching job listings:', error);
    }
}

// Populate job listings on the page
function populateJobListings(jobListings) {
    const jobListingsSection = document.querySelector('.job-listings');
    jobListingsSection.innerHTML = ''; // Clear any existing listings

    if (jobListings.length === 0) {
        jobListingsSection.innerHTML = '<p>No job listings found.</p>';
        return;
    }

    jobListings.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');

        const jobInfo = document.createElement('div');
        jobInfo.classList.add('job-info');

        const jobTitle = document.createElement('h3');
        jobTitle.textContent = job.title;
        jobInfo.appendChild(jobTitle);

        const jobLocation = document.createElement('p');
        jobLocation.textContent = job.location;
        jobInfo.appendChild(jobLocation);

        const jobAuthor = document.createElement('p');
        jobAuthor.textContent = `Posted by: ${job.author}`;
        jobInfo.appendChild(jobAuthor);

        const jobTimestamp = document.createElement('p');
        jobTimestamp.textContent = `Posted on: ${new Date(job.created_at).toLocaleString()}`;
        jobInfo.appendChild(jobTimestamp);

        jobCard.appendChild(jobInfo);

        const applyButton = document.createElement('button');
        applyButton.classList.add('apply-button');
        applyButton.textContent = 'Apply';
        applyButton.addEventListener('click', () => {
            alert('Apply functionality not yet implemented.');
        });
        jobCard.appendChild(applyButton);

        jobListingsSection.appendChild(jobCard);
    });
}

// Filter job listings based on search input
function filterJobListings(jobListings) {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredJobListings = jobListings.filter(job => {
        return job.title.toLowerCase().includes(searchInput) || job.location.toLowerCase().includes(searchInput);
    });
    populateJobListings(filteredJobListings);
}

// Search by popular tags
function searchByTag(tag) {
    document.getElementById('search-input').value = tag;
    filterJobListings(jobListings);
}

// Add event listeners for search functionality
document.getElementById('search-button').addEventListener('click', () => {
    filterJobListings(jobListings);
});

document.getElementById('search-input').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        filterJobListings(jobListings);
    }
});

// Load job listings on page load
let jobListings = [];
window.addEventListener('DOMContentLoaded', async () => {
    jobListings = await fetchJobListings();
});
