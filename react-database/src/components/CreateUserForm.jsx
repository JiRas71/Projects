import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateUserForm() {
    const [user, setUser] = useState({
        jmeno: '',
        prijmeni: '',
        email: '',
        telefon: '',
        aktivni: 1
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Odesílám nového uživatele:', user);

        fetch('https://jiras-web.cz/utility/database/create_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Odpověď z API po vytvoření uživatele:', data);
                if (data.message === 'Uživatel byl úspěšně vytvořen') {
                    navigate('/', {
                        state: {
                            message: `Uživatel ${user.jmeno} ${user.prijmeni} byl úspěšně uložen do databáze.`
                        }
                    });
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Chyba při odesílání dat:', error));
    };

    // Funkce pro resetování formuláře
    const handleReset = () => {
        setUser({
            jmeno: '',
            prijmeni: '',
            email: '',
            telefon: '',
            aktivni: 1
        });
    };

    return (
        <div className="container d-flex col-lg-4 col-12 justify-content-center my-3">
            <div className="p-4 bg-dark text-light rounded-4">
                <h4 className="mt-2 mb-3 text-center">Vytvoření nového uživatele</h4>
                <hr />
                <form onSubmit={handleSubmit} className="d-block row text-center">
                    <label className="form-label">Jméno:
                        <br />
                        <input className="form-control-sm" name="jmeno" value={user.jmeno} onChange={handleChange}
                               placeholder="Jméno" required />
                    </label>

                    <label className="form-label">Příjmení:
                        <br />
                        <input className="form-control-sm" name="prijmeni" value={user.prijmeni} onChange={handleChange}
                               placeholder="Příjmení" required />
                    </label>

                    <label className="form-label">E-mail:
                        <br />
                        <input className="form-control-sm" name="email" value={user.email} onChange={handleChange}
                               placeholder="E-mail" required />
                    </label>

                    <label className="form-label">Telefon:
                        <br />
                        <input className="form-control-sm" name="telefon" value={user.telefon} onChange={handleChange}
                               placeholder="Telefon" required />
                    </label>

                    <div className="text-center">
                        <button type="submit" className="btn btn-sm btn-primary mt-3">Přidat uživatele</button>
                        <Link to={`/`} className="btn btn-sm btn-secondary mt-3 ms-2">
                            Zpět
                        </Link>
                        <button type="button" className="btn btn-sm btn-light mt-3 ms-2" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUserForm;
