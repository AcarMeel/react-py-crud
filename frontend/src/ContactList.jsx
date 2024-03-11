import React from "react";

export const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
        if ([200, 201].indexOf(response.status) < 0) {
            const error = await response.json();
            alert(error?.message);
        } else {
            updateCallback();
        }
    }
    return (
        <div className="container">
            <h2 className="subtitle">Contacts</h2>
            <table className="table is-striped is-hoverable is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.map(contact => (
                            <tr key={contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <p className="buttons">
                                        <button className="button is-success" onClick={() => updateContact(contact)}>
                                            <span className="icon is-small">
                                                <i className="fas fa-check"></i>
                                            </span>
                                            <span>Edit</span>
                                        </button>
                                        <button className="button is-danger is-outlined" onClick={() => onDelete(contact.id)}>
                                            <span>Delete</span>
                                            <span className="icon is-small">
                                                <i className="fas fa-times"></i>
                                            </span>
                                        </button>
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
