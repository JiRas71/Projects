function Header() {
    // Funkce pro zobrazení nápovědy
    const showHelpText = (message) => {
        alert(message);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 m-0">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    {/* Skryté na malých obrazovkách, viditelné na velkých */}
                    <span className="d-none d-sm-inline">
                        <img src="https://jiras-web.cz/utility/database/images/vite.png" alt="logo Spring Boot" height="30" className="me-1"/>
                        <span className="text-light me-1">+</span>
                        <img src="https://jiras-web.cz/utility/database/images/logoReact.png" alt="logo React" height="25" className="me-1"/>
                        <span className="text-light me-1">+</span>
                        <img src="https://jiras-web.cz/utility/database/images/php.png" alt="logo PHP" width="60" className="mt-1"/>
                        <span className="text-light me-1">+</span>
                    </span>

                    <img src="https://jiras-web.cz/utility/database/images/database.png" alt="database" width="30" height="30" className="me-2"/>
                    <span className="databaze mt-1">DATABÁZE</span>
                </a>

                {/* Responsive Toggler Button for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Menu */}
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <div className="navbar-nav ms-auto">
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Tato moderní webová aplikace kombinuje nejnovější technologie, jako je VITE pro rychlé sestavování projektu, REACT pro interaktivní frontend, PHP pro backendové zpracování a databázi pro ukládání a správu dat. Aplikace umožňuje efektivní správu uživatelských záznamů. Je navržena s ohledem na uživatelskou přívětivost a responzivitu, takže se správně zobrazuje na různých zařízeních včetně mobilů.(Všechny zobrazené jména a kontakty jsou vymyslené, jen pro testování a vývoj aplikace)'
                                )
                            }
                        >
                            Popis
                        </a>
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Možnost snadného přidání nových uživatelů do databáze s potřebnými údaji, jako je jméno, příjmení, e-mail a telefon.'
                                )
                            }
                        >
                            Ukládání
                        </a>
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Funkce umožňuje rychlou a snadnou editaci již existujících uživatelských záznamů.'
                                )
                            }
                        >
                            Úprava záznamů
                        </a>
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Po kliknutí na ↕️ setřídíte záznamy podle pořadí, abecedně, nebo podle data vytvoření.'
                                )
                            }
                        >
                            Třídění
                        </a>
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Databáze je optimalizována pro práci s velkými objemy dat díky stránkování, které umožňuje pohodlný přístup k různým částem záznamů.'
                                )
                            }
                        >
                            Stránkování
                        </a>
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Pokročilý vyhledávací nástroj umožňuje rychlé nalezení konkrétního uživatele nebo skupiny uživatelů na základě zadaných kritérií.'
                                )
                            }
                        >
                            Vyhledávání
                        </a>
                        <a
                            className="nav-link text-light"
                            style={{cursor: 'pointer'}}
                            onClick={() =>
                                showHelpText(
                                    'Uživatelé mohou bezpečně odstranit vybrané záznamy s potvrzením akce pro zajištění bezpečnosti dat.'
                                )
                            }
                        >
                            Mazání záznamů
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;