document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#dataTable tbody');
    const dobInput = document.getElementById('dob');

    // Load saved data from localStorage
    loadTableData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = new Date(dobInput.value);
        const acceptTerms = document.getElementById('acceptTerms').checked;

        if (!isValidAge(dob)) {
            alert('You must be between 18 and 55 years old.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${dobInput.value}</td>
            <td>${acceptTerms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(newRow);

        // Save the new entry to localStorage
        saveTableData();

        // Optionally clear the form
        form.reset();
    });

    function isValidAge(dob) {
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age >= 18 && age <= 55;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function saveTableData() {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        const data = rows.map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.textContent));
        localStorage.setItem('tableData', JSON.stringify(data));
    }

    function loadTableData() {
        const data = JSON.parse(localStorage.getItem('tableData') || '[]');
        data.forEach(rowData => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = rowData.map(cellData => `<td>${cellData}</td>`).join('');
            tableBody.appendChild(newRow);
        });
    }
});
