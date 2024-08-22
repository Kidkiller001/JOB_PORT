// Fetch job listings from MongoDB and populate the job-listings section
axios.get('/api/joblistings')
    .then(response => {
        const jobListings = response.data;

        // Function to filter job listings based on search input
        const filterJobListings = () => {
            const searchInput = document.getElementById('search-input').value.toLowerCase();
            const filteredJobListings = jobListings.filter(job => {
                return job.title.toLowerCase().includes(searchInput) || job.location.toLowerCase().includes(searchInput);
            });

            // Clear existing job listings
            document.querySelector('.job-listings').innerHTML = '';

            // Loop through the filtered job listings and create HTML elements dynamically
            filteredJobListings.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');

                const jobImage = document.createElement('div');
                jobImage.classList.add('job-image');
                jobCard.appendChild(jobImage);

                const jobInfo = document.createElement('div');
                jobInfo.classList.add('job-info');

                const jobTitle = document.createElement('h3');
                jobTitle.textContent = job.title;
                jobInfo.appendChild(jobTitle);

                const jobLocation = document.createElement('p');
                jobLocation.textContent = job.location;
                jobInfo.appendChild(jobLocation);

                const jobAuthor = document.createElement('p');
                jobAuthor.textContent = job.author;
                jobInfo.appendChild(jobAuthor);

                const jobTimestamp = document.createElement('p');
                jobTimestamp.textContent = job.timestamp;
                jobInfo.appendChild(jobTimestamp);

                jobCard.appendChild(jobInfo);

                const applyButton = document.createElement('button');
                applyButton.classList.add('apply-button');
                applyButton.textContent = 'Apply';
                jobCard.appendChild(applyButton);

                document.querySelector('.job-listings').appendChild(jobCard);
            });
        };

        // Event listener for search button click
        document.getElementById('search-button').addEventListener('click', filterJobListings);

        // Event listener for search input enter key press
        document.getElementById('search-input').addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                filterJobListings();
            }
        });

        // Initial population of job listings
        filterJobListings();
    })
    .catch(error => {
        console.error('Error fetching job listings:', error);
    });