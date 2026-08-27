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
        const response = await fetch(`${sUrl}/rest/v1/bookings`, {
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
        } else {
            alert("Error saving your booking data.");
        }
    } catch (error) {
        alert("Internet connection error.");
    }
});
