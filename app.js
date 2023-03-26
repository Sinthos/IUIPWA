new Vue({
    el: "#app", // Verknüft app.js der ID "app"
    data: {
        // Daten der app.js festlegen
        deliveryMethod: "office", // Liefermethode (Standardwert: "office")
        address: "", // Abholadresse
        clothingType: "", // Art der Kleidung
        crisisRegion: "", // Krisengebiet
        registrationSuccessful: false, // Gibt an, ob die Spendenregistrierung erfolgreich war
        registrationData: null, // Speichert die Daten der erfolgreichen Registrierung
    },
    methods: {
        registerDonation() {
            if (this.deliveryMethod === "pickup" && !this.isAddressValid()) {
                // Überprüft auf gültige Abholadresse und gibt einen Fehler aus, wenn sie ungültig ist
                alert("Die Abholadresse ist zu weit entfernt. Eine Abholung ist im Gebiet 12XXX zulässig");
                return;
            }

            // Speichert die Spendeninformationen für die Zusammenfassung
            this.registrationData = {
                clothingType: this.clothingType,
                crisisRegion: this.crisisRegion,
                date: new Date(), // Datum und Uhrzeit der Registrierung
                location: this.deliveryMethod === "office" ? "Geschäftsstelle" : this.address,
            };

            // Wechselt zu true bei erfolgreicher Registrierung
            this.registrationSuccessful = true;
        },
        isAddressValid() {
            // Prüfen, ob die ersten beiden Stellen der Postleitzahlen identisch sind
            // Beispiel: 12345 und 12456 sind ungültig, 12345 und 12367 sind gültig
            const officePostalCode = '12345';
            const addressPostalCode = this.address.slice(0, 2);
            return officePostalCode.slice(0, 2) === addressPostalCode;
        },
    },
});