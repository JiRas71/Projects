import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function UsersTable() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [showMessage, setShowMessage] = useState(true);
    const usersPerPage = 5;
    const location = useLocation();
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString || dateString === "0000-00-00 00:00:00") {
            return 'Neplatné datum';
        }
        const [datePart] = dateString.split(' ');
        const dateParts = datePart.split('-');
        if (dateParts.length === 3) {
            return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
        }
        return 'Neplatné datum';
    };

    const fetchUsers = () => {
        fetch('https://jiras-web.cz/utility/database/get_users.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Očekávané pole, ale přišel jiný typ dat:', data);
                }
            })
            .catch(error => console.error('Chyba při načítání uživatelů:', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (userId) => {
        const userToDelete = users.find(user => user.id === userId);

        if (window.confirm('Opravdu chcete tohoto uživatele smazat?')) {
            fetch(`https://jiras-web.cz/utility/database/delete_user.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Uživatel byl úspěšně odstraněn') {
                        setUsers(users.filter(user => user.id !== userId));
                        navigate('/', {
                            state: {
                                message: `Uživatel ${userToDelete.jmeno} ${userToDelete.prijmeni} byl úspěšně odstraněn.`
                            }
                        });
                    } else {
                        alert('Chyba při mazání uživatele.');
                    }
                })
                .catch(error => console.error('Chyba při mazání uživatele:', error));
        }
    };

    const sortUsers = (column) => {
        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);

        const sortedUsers = [...users].sort((a, b) => {
            if (column === 'id') {
                return direction === 'asc' ? a[column] - b[column] : b[column] - a[column];
            } else if (column === 'vytvoren') {
                return direction === 'asc'
                    ? new Date(a[column]) - new Date(b[column])
                    : new Date(b[column]) - new Date(a[column]);
            } else {
                return direction === 'asc'
                    ? a[column].localeCompare(b[column])
                    : b[column].localeCompare(a[column]);
            }
        });
        setUsers(sortedUsers);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredUsers = users.filter(user =>
            user.jmeno.toLowerCase().includes(search.toLowerCase()) ||
            user.prijmeni.toLowerCase().includes(search.toLowerCase())
        );
        setUsers(filteredUsers);
    };

    const handleReset = () => {
        setSearch('');
        fetchUsers();
    };

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Zobrazení úspěšné zprávy */}
            {location.state?.message && showMessage && (
                <div className="alert alert-success text-center px-0 py-0 my-0 rounded-2 small" role="alert">
                    {location.state.message}
                    <button type="button" className="custom-close-btn ms-2" onClick={() => setShowMessage(false)}>ⓧ</button>
                </div>
            )}

            {/* Hlavní obsah stránky */}
            <div className="container-fluid my-2 mx-auto p-1 col-lg-10 col-11">
                {/* Tlačítko pro přidání uživatele a vyhledávací formulář */}
                <div className="container-fluid mt-3">
                    <div className="d-flex align-items-center mt-2 mb-1">
                        <Link to="/create-user" className="btn btn-primary">
                            Přidat 👨🏼‍⚕️
                        </Link>
                        <form onSubmit={handleSearch} className="d-flex ms-3 btn-group" role="group"
                              aria-label="Basic example">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Hledej"
                                    className="form-control"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ maxWidth: '300px' }}
                                />
                                <button type="submit" className="btn btn-sm btn-light border border-dark z-3">🔍</button>
                                <button type="button" className="btn btn-sm btn-secondary px-2 py-2"
                                        onClick={handleReset}>Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Tabulka uživatelů */}
                <div className="table-responsive mt-3">
                    <h2 className="text-light">Výpis uživatelů</h2>
                    <table className="table table-striped table-bordered mb-1 mt-2 rounded-3 overflow-hidden border">
                        <thead>
                        <tr>
                            <th className="text-center nowrap" onClick={() => sortUsers('id')} style={{ cursor: 'pointer' }}>ID ↕️</th>
                            <th className="text-center nowrap" onClick={() => sortUsers('jmeno')} style={{ cursor: 'pointer' }}>Jméno ↕️</th>
                            <th className="text-center nowrap" onClick={() => sortUsers('prijmeni')} style={{ cursor: 'pointer' }}>Příjmení ↕️</th>
                            <th className="text-center nowrap">E-mail</th>
                            <th className="text-center nowrap">Telefon</th>
                            <th className="text-center nowrap" onClick={() => sortUsers('vytvoren')}
                                style={{ cursor: 'pointer' }}>Vytvořen ↕️</th>
                            <th className="text-center nowrap">Akce</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <td className="text-center">{user.id}</td>
                                <td className="nowrap">{user.jmeno}</td>
                                <td className="nowrap">{user.prijmeni}</td>
                                <td className="nowrap">{user.email}</td>
                                <td className="text-center nowrap">{user.telefon}</td>
                                <td className="text-center nowrap">{formatDate(user.vytvoren)}</td>
                                <td className="text-center nowrap">
                                    <Link to={`/update-user/${user.id}`} className="btn btn-sm btn-success me-2 px-1 py-0">
                                        Upravit
                                    </Link>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger px-1 py-0">
                                        Odstranit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Paginace */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`btn btn-sm ${currentPage === index + 1 ? 'btn-info' : 'btn-light'} me-1`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersTable;