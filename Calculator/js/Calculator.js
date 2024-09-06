class Calculator {
    constructor() {
        this.aktualniVstup = '';  // Pro ukládání celého zadání
        this.vysledekZobrazen = false;  // Indikátor, zda byl zobrazen výsledek
    }

    pridejZnak(znak) {
        if (this.vysledekZobrazen) {
            // Pokud uživatel klikl na číslo, začne nový příklad
            if (!isNaN(znak)) {
                this.aktualniVstup = '';  // Vymažte předchozí výsledek
            }
            this.vysledekZobrazen = false;  // Resetuje indikátor
        }
        // Přidá znak k aktuálnímu vstupu a zobrazí ho
        this.aktualniVstup += znak;
        const displej = document.getElementById('displej');
        displej.value = this.aktualniVstup;

        // Automatické posouvání obsahu doprava
        displej.scrollLeft = displej.scrollWidth;
    }

    vypocitej() {
        try {
            const vysledek = this.vyhodnotVyraz(this.aktualniVstup);
            const formatovanyVysledek = vysledek.toLocaleString('cs-CZ');  // Naformátuje číslo s oddělovači tisíců
            document.getElementById('displej').value = formatovanyVysledek;
            this.aktualniVstup = vysledek.toString();  // Uloží výsledek jako nové zadání
            this.vysledekZobrazen = true;  // Nastaví indikátor na true, aby se vědělo, že byl zobrazen výsledek
        } catch (error) {
            document.getElementById('displej').value = 'Error: chybné zadání';
            this.aktualniVstup = '';
            this.vysledekZobrazen = false;  // Resetuje indikátor při chybě
        }
    }

    vyhodnotVyraz(vyraz) {
        try {
            // Nahradí symbol pro násobení
            vyraz = vyraz.replace(/𝗑/g, '*').replace(/,/g, '.');

            // Odstraní jakékoliv prázdné mezery
            vyraz = vyraz.replace(/\s+/g, '');

            // Kontrola na nepovolené znaky (kromě čísel a operátorů)
            if (/[^0-9+\-*/.%]/.test(vyraz)) {
                return NaN;
            }

            // Zpracování procent
            vyraz = vyraz.replace(/(\d+(\.\d+)?)%/g, (match, num) => {
                // Najde číslo před procentem
                const prevExpression = vyraz.slice(0, vyraz.indexOf(match));
                const lastNumberMatch = prevExpression.match(/(\d+(\.\d+)?)(?!.*(\d+(\.\d+)?))/);
                if (lastNumberMatch) {
                    const lastNumber = lastNumberMatch[0];
                    return `(${lastNumber} * ${num} / 100)`;
                } else {
                    return `(${num} / 100)`;
                }
            });

            // Provede výpočet
            let vysledek = new Function('return ' + vyraz)(); // Použití funkce pro bezpečné vyhodnocení

            // Kontrola na nesprávné výsledky
            if (isNaN(vysledek) || !isFinite(vysledek)) {
                return `Error: chybné zadání`;
            }
            if (vysledek) {
                let zadanText = vyraz;

                // Kontrola délky a přidání zalomení po každých 20 znacích
                if (zadanText.length > 27) {
                    zadanText = zadanText.match(/.{1,27}/g).join('\n'); // Zalomení po 28 znacích
                }
                document.getElementById('zadanText').innerText = zadanText;
            }

            return vysledek;
        } catch (error) {
            return `Error: chybné zadání`;
        }
    }

    vymaz() {
        // Vymaže všechno
        this.aktualniVstup = '';
        document.getElementById('displej').value = '0';
        this.vysledekZobrazen = false;  // Resetuje indikátor
        document.getElementById('zadanText').innerText = '';
    }
}