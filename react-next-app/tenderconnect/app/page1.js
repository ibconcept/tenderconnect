"use client";

import { useState, useEffect } from 'react';
import './globals.css'; // Import the global CSS file
import { FaStar, FaThumbsUp } from 'react-icons/fa'; // Import icons from react-icons

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [tenders, setTenders] = useState([]);
    const [selectedTender, setSelectedTender] = useState(null);
    const [showPostTenderForm, setShowPostTenderForm] = useState(false);
    const [newTender, setNewTender] = useState({
        title: "",
        description: "",
        institution: "",
        openDate: "",
        closeDate: "",
        contactPerson: "",
        image: null,
        likes: 0,
        comments: [],
        rating: 0,
    });

    // Load initial tenders
    useEffect(() => {
        const storedTenders = JSON.parse(localStorage.getItem('tenders')) || [];
        setTenders(storedTenders);
    }, []);

    // Save tenders to Local Storage
    const saveTendersToLocalStorage = (updatedTenders) => {
        localStorage.setItem('tenders', JSON.stringify(updatedTenders));
    };

    const handleTenderChange = (e) => {
        const { name, value } = e.target;
        setNewTender((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        setNewTender((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
    };

    const submitTender = (e) => {
        e.preventDefault();
        const tenderWithId = { ...newTender, id: tenders.length + 1 };
        const updatedTenders = [...tenders, tenderWithId];
        setTenders(updatedTenders);
        saveTendersToLocalStorage(updatedTenders);
        setShowPostTenderForm(false);
        setNewTender({
            title: "",
            description: "",
            institution: "",
            openDate: "",
            closeDate: "",
            contactPerson: "",
            image: null,
            likes: 0,
            comments: [],
            rating: 0,
        });
    };

    const toggleLike = (tenderId) => {
        const updatedTenders = tenders.map(tender => 
            tender.id === tenderId ? { ...tender, likes: tender.likes === 0 ? 1 : 0 } : tender
        );
        setTenders(updatedTenders);
        saveTendersToLocalStorage(updatedTenders);
    };

    const addComment = (tenderId, comment) => {
        const updatedTenders = tenders.map(tender => 
            tender.id === tenderId ? { ...tender, comments: [...(tender.comments || []), comment] } : tender
        );
        setTenders(updatedTenders);
        saveTendersToLocalStorage(updatedTenders);
    };

    const handleStarRating = (tenderId, rating) => {
        const updatedTenders = tenders.map(tender =>
            tender.id === tenderId ? { ...tender, rating } : tender
        );
        setTenders(updatedTenders);
        saveTendersToLocalStorage(updatedTenders);
    };

    return (
        <div className="container">
            <header>
                <img src="logo.PNG"></img>
                <h2>Tender Portal</h2>
                <p> TendersYour gateway to verified and due dillegience tender opportunities for schools, 
                    hospitals, and community projects. Tenders are automatically unlisted on due date 
             Only verified Tenders are posted</p>
            </header>

            {!isLoggedIn ? (
                <div id="auth">
                    <h2>Login with OAuth</h2>
                    <button onClick={() => setIsLoggedIn(true)}>Login</button>
                </div>
            ) : showPostTenderForm ? (
                <div id="post-tender-form">
                    <h3>Post a New Tender</h3>
                    <form onSubmit={submitTender}>
                        <input type="text" name="institution" value={newTender.institution} onChange={handleTenderChange} placeholder="Institution Name" required />
                        <input type="text" name="title" value={newTender.title} onChange={handleTenderChange} placeholder="Tender Title" required />
                        <textarea name="description" value={newTender.description} onChange={handleTenderChange} placeholder="Tender Description" required></textarea>
                        <input type="date" name="openDate" value={newTender.openDate} onChange={handleTenderChange} required />
                        <input type="date" name="closeDate" value={newTender.closeDate} onChange={handleTenderChange} required />
                        <input type="text" name="contactPerson" value={newTender.contactPerson} onChange={handleTenderChange} placeholder="Contact Person" required />
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        <button type="submit">Submit Tender</button>
                        <button type="button" onClick={() => setShowPostTenderForm(false)}>Cancel</button>
                    </form>
                </div>
            ) : selectedTender ? (
                <div id="tender-detail">
                    <h2>{selectedTender.title} Details</h2>
                    <p><strong>Institution:</strong> {selectedTender.institution}</p>
                    <p><strong>Open Date:</strong> {selectedTender.openDate}</p>
                    <p><strong>Close Date:</strong> {selectedTender.closeDate}</p>
                    <p><strong>Contact Person:</strong> {selectedTender.contactPerson}</p>
                    <p>{selectedTender.description}</p>
                    {selectedTender.image && <img src={selectedTender.image} alt="Tender" width="200" />}
                    
                    {/* Like Button */}
                    <button onClick={() => toggleLike(selectedTender.id)}>
                        <FaThumbsUp /> {selectedTender.likes > 0 ? "Unlike" : "Like"}
                    </button>
                    
                    <h3>Rating</h3>
                    {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} onClick={() => handleStarRating(selectedTender.id, star)} style={{ cursor: 'pointer', color: star <= selectedTender.rating ? '#FFD700' : '#ccc' }}>
                            <FaStar />
                        </span>
                    ))}
                    <h3>Comments</h3>
                    <input type="text" placeholder="Add a comment" onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addComment(selectedTender.id, e.target.value);
                            e.target.value = '';
                        }
                    }} />
                    <ul>
                        {selectedTender.comments && selectedTender.comments.map((comment, index) => <li key={index}>{comment}</li>)}
                    </ul>
                    <button onClick={() => setSelectedTender(null)}>Back to Tenders</button>
                </div>
            ) : (
                <div id="tender-list">
                    <h2>Available Tenders</h2>
                    <button onClick={() => setShowPostTenderForm(true)}>Post Tender</button>
                    <div id="tender-items">
                        {tenders.map(tender => (
                            <div key={tender.id} className="tender-item" onClick={() => setSelectedTender(tender)}>
                                <h3>{tender.title}</h3>
                                <p>{tender.description}</p>
                                <p><strong>Institution:</strong> {tender.institution}</p>
                                {tender.image && <img src={tender.image} alt="Tender" width="100" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

