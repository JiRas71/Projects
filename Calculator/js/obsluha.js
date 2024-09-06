const calculator = new Calculator();
let zvukZapnuty = true;  // Výchozí stav - zvuk zapnutý

// Přepínání zvuku a ikony reproduktoru
document.getElementById('reproduktor').addEventListener('click', () => {
    zvukZapnuty = !zvukZapnuty;  // Přepnutí stavu zvuku
    const reproduktor = document.getElementById('reproduktor');
    if (zvukZapnuty) {
        reproduktor.innerText = '🔈';
    } else {
        reproduktor.innerText = '🔇';
    }
});

// Funkce pro aktualizaci datumu a času
function aktualizujCas() {
    const dnes = new Date();
    const dny = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    const denTydne = dny[dnes.getDay()];
    const den = String(dnes.getDate()).padStart(2, '0'); // Vrátí den ve formátu dvou číslic
    const mesic = String(dnes.getMonth() + 1); // Měsíce jsou 0-indexované, takže přičítáme 1
    const rok = dnes.getFullYear();
    const hodiny = String(dnes.getHours()).padStart(2, '0');
    const minuty = String(dnes.getMinutes()).padStart(2, '0');
    const sekundy = String(dnes.getSeconds()).padStart(2, '0');
    // Formátovaný řetězec pro zobrazení
    const datumCas = `${denTydne}, ${den}.${mesic}.${rok} čas: ${hodiny}:${minuty}:${sekundy}`;
    document.getElementById('datumCas').innerHTML = datumCas;
}

// Aktualizace času každou sekundu
setInterval(aktualizujCas, 1000);

// Funkce pro přidání čísel a operátorů
document.getElementById('tabulka').addEventListener('click', (event) => {
    const target = event.target;

    // Kontrola, zda bylo kliknuto na element <td>
    if (target.tagName === 'TD') {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);  // Vibrace po dobu 50 milisekund, pokud je podporováno
        } else {
            console.log('Vibration API není podporováno na tomto zařízení.');
        }

        // Přehrání zvukového efektu při kliknutí, pouze pokud je zvuk zapnutý
        if (zvukZapnuty) {
            const clickSound = new Audio('sounds/mouse-click.mp3');  // Vytvoření nové instance Audio
            clickSound.currentTime = 0;  // Reset zvuku, aby se přehrál od začátku
            clickSound.play();  // Přehrání zvuku
        }

        // Přidání třídy pro změnu barvy tlačítka při kliknutí
        target.classList.add('clicked');
        setTimeout(() => {
            target.classList.remove('clicked');  // Odebrání třídy po 500ms
        }, 100);

        const hodnota = target.innerText;
        if (hodnota === '=') {
            calculator.vypocitej();
        } else if (hodnota === 'C') {
            calculator.vymaz();
        } else {
            calculator.pridejZnak(hodnota);
            document.getElementById('zadanText').innerText = '';
        }
    }
});

aktualizujCas(); // Načtení času při prvním načtení stránky