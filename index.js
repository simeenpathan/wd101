document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const dobInput = document.getElementById('dob').value;
    const dob = new Date(dobInput);
    const today = new Date();
   
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
   
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
   
    if (age < 18 || age > 55) {
        alert('Your age must be between 18 and 55.');
        event.preventDefault();
        return;
    }
   
    storeData();
    event.preventDefault();
   });
   
   function storeData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;
   
    const userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptedTerms: acceptedTerms,
    };
   
    localStorage.setItem(email, JSON.stringify(userData));
    displayData();
   }
   
   function displayData() {
    const table = document.getElementById('dataTable');
    table.innerHTML = '<tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>';
   
    Object.keys(localStorage).forEach(function(key) {
        const user = JSON.parse(localStorage.getItem(key));
   
        const row = table.insertRow();
        row.insertCell(0).innerText = user.name;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.password;
        row.insertCell(3).innerText = user.dob;
        row.insertCell(4).innerText = user.acceptedTerms ? 'true' : 'false';
    });
   }
   
   window.onload = displayData;
