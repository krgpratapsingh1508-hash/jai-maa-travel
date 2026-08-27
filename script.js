// Pre-configured cloud database details
const sUrl = "https://supabase.co";
const sKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidGZweHZzd21qbmNsd3J5b3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NzA3MjEsImV4cCI6MjA1NjI0NjcyMX0.XgI8v69Ew7C5r5_U84x2mP1-t8-eN9fO9k_N2g67b8U";

// 1. Booking Online Database me save karna
document.getElementById('travelForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    try {
        const response = await fetch(sUrl, {
            method: 'POST',
            headers: {
                'apikey': sKey,
                'Authorization': `Bearer ${sKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ name, phone, destination, date })
        });

        if (response.ok) {
            const messageBox = document.getElementById('successMessage');
            messageBox.innerHTML = `🎉 Thank you, ${name}! Your booking has been saved online.`;
            messageBox.classList.remove('hidden');
            document.getElementById('travelForm').reset();
            fetchLiveBookings();
        } else {
            alert("Error saving your booking data.");
        }
    } catch (error) {
        alert("Internet connection error.");
    }
});

// 2. Central data fetch karna aur table me dikhana
async function fetchLiveBookings() {
    const tableBody = document.getElementById('adminTableBody');
    if (!tableBody) return;

    try {
        const response = await fetch(`${sUrl}?select=*&order=id.desc`, {
            method: 'GET',
            headers: { 'apikey': sKey, 'Authorization': `Bearer ${sKey}` }
        });

        const bookings = await response.json();
        tableBody.innerHTML = "";

        if (bookings.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 10px;">No bookings online yet.</td></tr>`;
            return;
        }

        bookings.forEach(booking => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding: 10px; border: 1px solid #ddd;">${booking.name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${booking.phone}">${booking.phone}</a></td>
                <td style="padding: 10px; border: 1px solid #ddd;">${booking.destination}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${booking.date}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red; padding: 10px;">Failed to load live internet list.</td></tr>`;
    }
}

// 3. Admin Password Security
document.getElementById('adminBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const password = prompt("Enter Admin Password:");
    if (password === "1234") {
        document.getElementById('adminSection').classList.remove('hidden');
        fetchLiveBookings();
        document.getElementById('adminSection').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert("Wrong Password!");
    }
});
