document.addEventListener('DOMContentLoaded', function() {
    const jobsList = document.getElementById('jobs-list');
    const addJobBtn = document.getElementById('add-job-btn');

    // Redirect to job posting page
    addJobBtn.addEventListener('click', function() {
        window.location.href = 'jobpost.html';
    });

    // Fetch jobs from MongoDB
    fetch('http://localhost:3000/api/employer/jobs')
        .then(response => response.json())
        .then(jobs => {
            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');

                jobCard.innerHTML = `
                    <div class="job-details">
                        <h3>${job.title}</h3>
                        <p>${job.description}</p>
                        <p><strong>Posted date:</strong> ${job.postedDate}</p>
                        <p><strong>Application reception deadline:</strong> ${job.applicationDeadline}</p>
                    </div>
                    <div class="job-buttons">
                        <button class="edit-btn" onclick="editJob('${job._id}')">Edit Job</button>
                        <button class="delete-btn" onclick="deleteJob('${job._id}')">Delete Job</button>
                        <button class="view-btn" onclick="viewApplications('${job._id}')">See Applications</button>
                    </div>
                `;

                jobsList.appendChild(jobCard);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
});

function editJob(jobId) {
    // Redirect to job editing page
    window.location.href = `editjob.html?jobId=${jobId}`;
}

function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
        fetch(`http://localhost:3000/api/employer/jobs/${jobId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Job deleted successfully');
            window.location.reload();
        })
        .catch(error => console.error('Error deleting job:', error));
    }
}

function viewApplications(jobId) {
    // Redirect to job applications page
    window.location.href = `applications.html?jobId=${jobId}`;
}
