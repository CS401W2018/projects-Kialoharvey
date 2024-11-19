document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default submission

    // Collect form data
    const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        info: document.getElementById('info').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        state: document.getElementById('state').value,
        terms: document.getElementById('terms').checked,
    };

    // Validate form fields
    const errors = [];
    if (!formData.firstName) errors.push('First Name is required.');
    if (!formData.lastName) errors.push('Last Name is required.');
    if (!formData.email) errors.push('Email is required.');
    if (formData.age < 18 || formData.age > 120) errors.push('Age must be between 18 and 120.');

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    console.log(formData); // Log form data to console

    // Send AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'formresponse.json', true); // Use GET for GitHub Pages compatibility
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById('formresponse').innerHTML = `<p>${response.message}</p>`;
            document.getElementById('myForm').reset(); // Reset form
        }
    };
    xhr.send(JSON.stringify(formData));
});
