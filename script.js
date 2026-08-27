const sUrl = "https://supabase.co"; 
const sKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidGZweHZzd21qbmNsd3J5b3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NzA3MjEsImV4cCI6MjA1NjI0NjcyMX0.XgI8v69Ew7C5r5_U84x2mP1-t8-eN9fO9k_N2g67b8U";

// 1. Form Submit hone par global network me data bhejna
document.getElementById('travelForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const msgBox = document.getElementById('successMessage');

    msgBox.innerHTML = "Processing your booking...";
    msgBox.classList.remove('hidden');

    try {
        const response = await fetch(sUrl, {
            method: 'POST',
            headers: {
                'apikey': sKey,
                'Authorization': `Bearer ${sKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ name, phone, destination, date, status: 'Book' })
        });

        if (response.ok) {
            msgBox.innerHTML = `🎉 Thank you, ${name}! Your booking for ${destination} has been registered successfully.`;
            document.getElementById('travelForm').reset();
        } else {
            msgBox.innerHTML = "⚠️ Server busy! Please try submit again.";
        }
    } catch (error) {
        msgBox.innerHTML = "⚠️ Connection issue. Try using Incognito Mode tab.";
    }
});
// 6. Logout Button
document.getElementById('logoutBtn').addEventListener('click', function() {
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('loginForm').reset();
    alert("Logged out successfully.");
});
