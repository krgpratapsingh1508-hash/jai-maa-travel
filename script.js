// 1. Form Submit Hone Par Data Save Karna
document.getElementById('travelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Data nikalna
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // Naya booking object banana
    const newBooking = { name, phone, destination, date };

    // Pehle se save data nikalna (agar hai toh)
    let currentBookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
    
    // Nayi booking ko list me jodna
    currentBookings.push(newBooking);

    // Wapas online storage me save karna
    localStorage.setItem('travelBookings', JSON.stringify(currentBookings));

    // Screen par user ko message dikhana
    const messageBox = document.getElementById('successMessage');
    messageBox.innerHTML = `🎉 Thank you, ${name}! Your booking for ${destination} has been saved online.`;
    messageBox.classList.remove('hidden');

    // Form khali karna
    document.getElementById('travelForm').reset();
    
    // Admin list ko update karna
    updateAdminTable();
});

// 2. Admin Table Me Data Dikhane Ka Function
function updateAdminTable() {
    const tableBody = document.getElementById('adminTableBody');
    if (!tableBody) return;

    let currentBookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
    tableBody.innerHTML = "";

    if (currentBookings.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 10px;">No bookings found.</td></tr>`;
        return;
    }

    currentBookings.forEach(booking => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding: 10px; border: 1px solid #ddd;">${booking.name}</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${booking.phone}">${booking.phone}</a></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${booking.destination}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${booking.date}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// 3. Admin Button Par Click Karne Par Password Mangna
document.getElementById('adminBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // ⚠️ Aapka Password '1234' hai, aap ise badal sakte hain
    const password = prompt("Enter Admin Password to view Bookings:");
    
    if (password === "1234") {
        document.getElementById('adminSection').classList.remove('hidden');
        updateAdminTable();
        // Seedhe table par scroll kar jayega
        document.getElementById('adminSection').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Wrong Password! Access Denied.");
    }
});

// 4. Data Delete Karne Ka Button
document.getElementById('clearBtn').addEventListener('click', function() {
    if (confirm("Kya aap saari booking entries delete karna chahte hain?")) {
        localStorage.removeItem('travelBookings');
        updateAdminTable();
    }
});
