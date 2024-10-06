import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RoleManager.scss';

const RoleManager = () => {
    const [roles, setRoles] = useState([]);
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [filter, setFilter] = useState('');
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [newRoleName, setNewRoleName] = useState('');
    const [editingRoleName, setEditingRoleName] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/roles');
                setRoles(response.data);
                setFilteredRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const searchFilter = () => {
        setFilteredRoles(
            roles.filter(role => 
                role.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    };

    const editChange = (id, value) => {
        setEditingRoleName(value);
        setEditingRoleId(id);
    };

    const updateRole = async (id) => {
        if (window.confirm("Do you want to save changes to this role?")) {
            await axios.put(`http://localhost:8080/api/roles/${id}`, { name: editingRoleName });
            setRoles(roles.map(role => (role.id === id ? { ...role, name: editingRoleName } : role)));
            const roleExists = roles.some(role => role.name.toLowerCase() === editingRoleName.toLowerCase());
            if (roleExists) {
                alert("Role name already exists. Please choose a different name.");
                return;
            }
            setFilteredRoles(filteredRoles.map(role => (role.id === id ? { ...role, name: editingRoleName } : role)));
            cancelEdit();
        }
    };

    const cancelEdit = () => {
        setEditingRoleName('');
        setEditingRoleId(null);
    };

    const roleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            try{
            await axios.delete(`http://localhost:8080/api/roles/${id}`);
            setRoles(roles.filter(role => role.id !== id));
            setFilteredRoles(filteredRoles.filter(role => role.id !== id));}
            catch (error) {
                alert("cannot delete this role");
                console.error('Error deleting job type:', error);
            }
        }
    };

    const addRole = async (e) => {
        e.preventDefault();
        if (!newRoleName) return;

        const roleExists = roles.some(role => role.name.toLowerCase() === newRoleName.toLowerCase());
        if (roleExists) {
            alert("Role name already exists. Please choose a different name.");
            return;
        }

        const response = await axios.post('http://localhost:8080/api/roles', { name: newRoleName });
        setRoles([...roles, response.data]);
        setFilteredRoles([...filteredRoles, response.data]);
        setNewRoleName('');
    };

    return (
        <div className="role-manager">
            <h2>User Role Manager</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <button onClick={searchFilter}>Filter</button>
            </div>

            <form onSubmit={addRole} className="role-form">
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="New Role Name"
                    required
                />
                <button type="submit">Add Role</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoles.map(role => (
                        <tr key={role.id}>
                            <td>
                                {editingRoleId === role.id ? (
                                    <input
                                        type="text"
                                        value={editingRoleName}
                                        onChange={(e) => editChange(role.id, e.target.value)}
                                        onBlur={() => updateRole(role.id)}
                                        placeholder="Role Name"
                                        required
                                    />
                                ) : (
                                    <span onClick={() => { setEditingRoleName(role.name); setEditingRoleId(role.id); }}>
                                        {role.name}
                                    </span>
                                )}
                            </td>
                            <td>
                                {editingRoleId === role.id ? (
                                    <>
                                        <button onClick={() => updateRole(role.id)}>Save</button>
                                        <button onClick={cancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setEditingRoleName(role.name); setEditingRoleId(role.id); }}>Edit</button>
                                        <button onClick={() => roleDelete(role.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleManager;
