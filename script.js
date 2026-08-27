// Booking Form Logic
document.getElementById('travelForm').addEventListener('submit', function(event) {
    // Form ko automatic reload hone se rokne ke liye
    event.preventDefault();

    // Inputs se data nikalna
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // Success Message Box select karna
    const messageBox = document.getElementById('successMessage');

    // Simple Validation Check
    if (name && phone && destination && date) {
        // Message screen par dikhana
        messageBox.innerHTML = `🎉 Thank you, ${name}! Your booking request for ${destination} on ${date} has been received. We will call you back on ${phone} soon.`;
        messageBox.classList.remove('hidden');

        // Form ko khali (reset) karna
        document.getElementById('travelForm').reset();
    } else {
        alert("Please fill all the details correctly.");
    }
});