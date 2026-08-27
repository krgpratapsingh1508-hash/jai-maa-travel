document.getElementById('travelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Form se data nikalna
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // ⚠️ YAHA APNA WHATSAPP NUMBER DAALEIN (Bina kisi space ya + ke)
    const myWhatsAppNumber = "918120930517"; 

    // WhatsApp message format
    const message = `✨ *New Booking Request - Jai Maa Travels* ✨%0A%0A` +
                    `👤 *Name:* ${name}%0A` +
                    `📞 *Phone:* ${phone}%0A` +
                    `📍 *Destination:* ${destination}%0A` +
                    `📅 *Date:* ${date}`;

    // WhatsApp API Link
    const whatsappUrl = `https://whatsapp.com{myWhatsAppNumber}&text=${message}`;

    // User ko WhatsApp par bhejna
    window.open(whatsappUrl, '_blank');

    // Form reset karna
    document.getElementById('travelForm').reset();
});
