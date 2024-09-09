import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function UpdateUserForm() {
    const { id } = useParams();  // Získání ID uživatele z URL
    const [user, setUser] = useState({
        jmeno: '',
        prijmeni: '',
        email: '',
        telefon: '',
        aktivni: 1,  // Výchozí hodnota
    });

    const navigate = useNavigate();

    // Načtení uživatele podle ID
    useEffect(() => {
        fetch(`https://jiras-web.cz/utility/database/get_user.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setUser(data);  // Pokud data existují, nastav stav
                }
            })
            .catch(error => console.error('Chyba při načítání uživatele:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://jiras-web.cz/utility/database/update_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Uživatel byl úspěšně upraven') {
                    navigate('/', {
                        state: {
                            message: `Uživatel ${user.jmeno} ${user.prijmeni} byl úspěšně upraven.`
                        }
                    });
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Chyba při ukládání změn:', error));
    };

    return (
        <div className="container d-flex col-lg-4 col-12 justify-content-center mt-3">
            <div className="p-4 bg-dark text-light rounded-4">
                <h4 className="mt-2 mb-3 text-center">Úprava uživatele</h4>
                <hr />
                <form onSubmit={handleSubmit} className="d-block row text-center">
                    <label className="form-label">Jméno:
                        <br />
                        <input className="form-control-sm" name="jmeno" value={user.jmeno} onChange={handleChange} placeholder="Jméno" required />
                    </label>

                    <label className="form-label">Příjmení:
                        <br />
                        <input className="form-control-sm" name="prijmeni" value={user.prijmeni} onChange={handleChange} placeholder="Příjmení" required />
                    </label>

                    <label className="form-label">E-mail:
                        <br />
                        <input className="form-control-sm" name="email" value={user.email} onChange={handleChange} placeholder="E-mail" required />
                    </label>

                    <label className="form-label">Telefon:
                        <br />
                        <input className="form-control-sm" name="telefon" value={user.telefon} onChange={handleChange} placeholder="Telefon" required />
                    </label>

                    <div className="text-center">
                        <button type="submit" className="btn btn-sm btn-primary mt-3">Uložit změny</button>
                        <Link to="/" className="btn btn-sm btn-secondary mt-3 ms-2">Zpět</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserForm;
