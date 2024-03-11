import { useState, useEffect } from 'react'
import './App.css'
import { ContactList } from './ContactList'
import ContactForm from './ContactForm'
import Footer from './Footer'

function App() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({});
    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const response = await fetch("http://127.0.0.1:5000/contacts")
        const data = await response.json()
        setContacts(data.contacts)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentContact({});
    }

    const openCreateModal = () => {
        if ( !isModalOpen ) {
            setIsModalOpen(true);
        } 
    }

    const openUpdateModal = (contact) => {
        if ( !isModalOpen ) {
            setIsModalOpen(true);
            setCurrentContact(contact);
        } 
    }

    const onUpdate = () => {
        console.log('after popup')
        closeModal();
        fetchContacts();
    }


    return (
        <>
            <div className="container">
                <div className="tags has-addons">
                    <span className="tag is-primary">Bulma</span>
                    <span className="tag is-success">React</span>
                    <span className="tag is-link">Python</span>
                </div>
                <div className="columns is-vcentered">
                    <div className="column is-8">
                        <h1 className="title">Welcome!</h1>
                    </div>
                    <div className="column">
                        <button className="button is-link" onClick={openCreateModal}>Add new contact</button>
                    </div>
                </div>
                <hr />
                <ContactList contacts={contacts} updateContact={openUpdateModal} updateCallback={onUpdate} />
                {
                    isModalOpen && <>
                        <div id="modal-open"></div>
                        <div id='modal' className='notification'>
                            <button className="delete" onClick={closeModal}></button>
                            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
                        </div>
                    </>
                }
            </div>
            <Footer />
        </>
    )
}

export default App
