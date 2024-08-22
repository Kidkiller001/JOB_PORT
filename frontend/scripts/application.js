document.getElementById('application-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    
    formData.append('fullName', document.getElementById('full-name').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('dob', document.getElementById('dob').value);
    formData.append('contactInfo', document.getElementById('contact-info').value);
    formData.append('comments', document.getElementById('comments').value);
    
    const fileInput = document.getElementById('file-upload');
    for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('documents', fileInput.files[i]);
    }
    
    fetch('http://localhost:3000/api/applications', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Application submitted successfully!');
        console.log(data);
    })
    .catch(error => {
        alert('Error submitting application');
        console.error('Error:', error);
    });
});
