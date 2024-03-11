import React, { useState, useEffect } from 'react'

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    console.log(existingContact)
    const [firstName, setFirstName] = useState(existingContact?.firstName || '');
    const [lastName, setLastName] = useState(existingContact?.lastName || '');
    const [email, setEmail] = useState(existingContact?.email || '');

    const updating = Object.entries(existingContact).length !== 0;

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            email
        };
        const url = updating ? `update_contact/${existingContact.id}` : 'create_contact';
        const method = updating ? 'PATCH' : 'POST';
        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        console.log('url ', url)
        const response = await fetch(`http://127.0.0.1:5000/${url}`, options);
        if ([200, 201].indexOf(response.status) < 0) {
            const error = await response.json();
            alert(error?.message);
        } else {
            updateCallback();
        }

    }
    return (
        <>
            <h2 className="subtitle">{ updating ? 'Edit' : 'Add' } contact</h2>
            <form onSubmit={onFormSubmit}>
                <div className="field">
                    <label className="label">First name</label>
                    <div className="control">
                        <input id='inputFirstName' className="input"
                            type="text" value={firstName} placeholder="eg. Name"
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Last name</label>
                    <div className="control">
                        <input id='inputLastName' className="input"
                            type="text" value={lastName} placeholder="eg. Name"
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input id='inputEmail' className="input"
                            type="email" value={email} placeholder="eg. name@corp.com"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="buttons">
                    <button className="button is-danger is-light">Cancel</button>
                    <button type='submit' className="button is-info">Save</button>
                </div>
            </form>
        </>
    )
}

export default ContactForm