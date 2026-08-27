// 1. Booking Form Submit Logic (Bina Kisi Internet Error Ke)
document.getElementById('travelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // Sahi date aur time nikalna
    const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Nayi booking object
    const newBooking = {
        id: Date.now(),
        submitTime: currentDateTime,
        name: name,
        phone: phone,
        destination: destination,
        date: date,
        status: 'Book'
    };

    // Data nikalna aur jodna
    let currentBookings = JSON.parse(localStorage.getItem('allCentralBookings')) || [];
    currentBookings.push(newBooking);
    localStorage.setItem('allCentralBookings', JSON.stringify(currentBookings));

    // 🎉 THANK YOU MESSAGE SCREEN PAR DIKHANA (No Error Guarantee)
    const messageBox = document.getElementById('successMessage');
    messageBox.innerHTML = `🎉 Thank you, ${name}! Your booking for ${destination} has been registered successfully.`;
    messageBox.classList.remove('hidden');

    document.getElementById('travelForm').reset();
    updateAdminTable();
});

// 2. Admin Open Karne Par Box Dikhana
document.getElementById('openLoginBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('loginSection').scrollIntoView({ behavior: 'smooth' });
});

// 3. 🔐 ADMIN LOGIN CHECK (Naam aur Password Varification)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const adminName = document.getElementById('adminName').value;
    const adminPassword = document.getElementById('adminPassword').value;

    // ⚠️ YAHA AAP APNA NAAM AUR PASSWORD BADAL SAKTE HAIN
    if (adminName.toLowerCase() === "admin" && adminPassword === "1234") {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        document.getElementById('welcomeAdmin').innerText = adminName;
        updateAdminTable();
        document.getElementById('adminDashboard').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Galat Admin Name ya Password! Access Denied.");
    }
});

// 4. Update Admin Table List
function updateAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    if (!tableBody) return;

    let bookings = JSON.parse(localStorage.getItem('allCentralBookings')) || [];
    tableBody.innerHTML = "";

    if (bookings.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 10px;">No bookings found.</td></tr>`;
        return;
    }

    // New bookings sabse upar dikhane ke liye reverse
    bookings.reverse().forEach(booking => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${booking.submitTime}</strong></td>
            <td>${booking.name}</td>
            <td><a href="tel:${booking.phone}">${booking.phone}</a></td>
            <td>${booking.destination}</td>
            <td>${booking.date}</td>
            <td>
                <select onchange="changeStatus(${booking.id}, this.value)" class="status-select">
                    <option value="Book" ${booking.status === 'Book' ? 'selected' : ''}>Book</option>
                    <option value="Pending" ${booking.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Approve" ${booking.status === 'Approve' ? 'selected' : ''}>Approve</option>
                    <option value="Payment Pending" ${booking.status === 'Payment Pending' ? 'selected' : ''}>Payment Pending</option>
                    <option value="Final Done" ${booking.status === 'Final Done' ? 'selected' : ''}>Final Done</option>
                </select>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// 5. Dropdown Status Change Logic
window.changeStatus = function(id, newStatus) {
    let bookings = JSON.parse(localStorage.getItem('allCentralBookings')) || [];
    bookings = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem('allCentralBookings', JSON.stringify(bookings));
    alert("Status badal gaya hai!");
};

// 6. Logout Button
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('loginForm').reset();
    alert("Logged out successfully.");
});
