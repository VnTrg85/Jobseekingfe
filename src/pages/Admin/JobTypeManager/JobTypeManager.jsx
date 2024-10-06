import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobTypeManager.scss';

const JobTypeManager = () => {
    const [jobTypes, setJobTypes] = useState([]);
    const [filteredJobTypes, setFilteredJobTypes] = useState([]);
    const [editingJobTypeId, setEditingJobTypeId] = useState(null);
    const [newJobTypeName, setNewJobTypeName] = useState('');
    const [editingJobTypeName, setEditingJobTypeName] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchJobTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/jobtypes');
                setJobTypes(response.data);
                setFilteredJobTypes(response.data);
            } catch (error) {
                console.error('Error fetching job types:', error);
            }
        };
        fetchJobTypes();
    }, []);

    const searchFilter = () => {
        setFilteredJobTypes(
            jobTypes.filter(jobType => 
                jobType.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    };

    const jobTypeEdit = (jobType) => {
        setEditingJobTypeId(jobType.id);
        setEditingJobTypeName(jobType.name);
    };

    const jobTypeCancelEdit = () => {
        setEditingJobTypeId(null);
        setEditingJobTypeName('');
    };

    const jobTypeDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job type?')) {
            try {
                await axios.delete(`http://localhost:8080/api/jobtypes/${id}`);
                setJobTypes(jobTypes.filter(jobType => jobType.id !== id));
                setFilteredJobTypes(filteredJobTypes.filter(jobType => jobType.id !== id));
            } catch (error) {
                console.error('Error deleting job type:', error);
            }
        }
    };

    const jobTypeUpdate = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to update this job type?')) {
            try {
                await axios.put(`http://localhost:8080/api/jobtypes/${editingJobTypeId}`, { name: editingJobTypeName });
                setJobTypes(jobTypes.map(jobType => jobType.id === editingJobTypeId ? { ...jobType, name: editingJobTypeName } : jobType));
                const jobtypeExists = jobTypes.some(jobType => jobType.name.toLowerCase() === editingJobTypeName.toLowerCase());
                if (jobtypeExists) {
                    alert("JobType name already exists. Please choose a different name.");
                    return;
                }
                setFilteredJobTypes(filteredJobTypes.map(jobType => jobType.id === editingJobTypeId ? { ...jobType, name: editingJobTypeName } : jobType));
                jobTypeCancelEdit();
            } catch (error) {
                console.error('Error updating job type:', error);
            }
        }
    };

    const jobTypeAdd = async (e) => {
        e.preventDefault();
        try {
            if (!newJobTypeName) return;

            const jobTypeExists = jobTypes.some(jobType => jobType.name.toLowerCase() === newJobTypeName.toLowerCase());
            if (jobTypeExists) {
                alert("JobType name already exists. Please choose a different name.");
                return;
            }
            const response = await axios.post('http://localhost:8080/api/jobtypes', { name: newJobTypeName });
            setJobTypes([...jobTypes, response.data]);
            setFilteredJobTypes([...filteredJobTypes, response.data]);
            setNewJobTypeName('');
        } catch (error) {
            console.error('Error adding job type:', error);
        }
    };

    return (
        <div className="job-type-manager">
            <h2 className="title">Job Type Manager</h2>

            <input
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-input"
            />
            <button onClick={searchFilter} className="filter-button">Filter</button>

            <form className="job-type-form" onSubmit={jobTypeAdd}>
                <label>
                    <input
                        type="text"
                        placeholder="New JobType Name"
                        value={newJobTypeName}
                        onChange={(e) => setNewJobTypeName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add</button>
            </form>

            <table className="job-type-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobTypes.map(jobType => (
                        <tr key={jobType.id}>
                            <td>
                                {editingJobTypeId === jobType.id ? (
                                    <input
                                        type="text"
                                        value={editingJobTypeName}
                                        onChange={(e) => setEditingJobTypeName(e.target.value)}
                                    />
                                ) : (
                                    jobType.name
                                )}
                            </td>
                            <td>
                                {editingJobTypeId === jobType.id ? (
                                    <>
                                        <button onClick={jobTypeCancelEdit} className="filter-button">Cancel</button>
                                        <button onClick={jobTypeUpdate} className="filter-button">Save</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => jobTypeEdit(jobType)} className="filter-button">Edit</button>
                                        <button onClick={() => jobTypeDelete(jobType.id)} className="filter-button">Delete</button>
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

export default JobTypeManager;
