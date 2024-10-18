"use client";

import { useState, useEffect } from 'react';
import './globals.css'; // Global CSS
import { FaStar, FaThumbsUp } from 'react-icons/fa'; // Icons
import Image from 'next/image'; // Next.js Image component

// TenderList Component
const TenderList = ({ tenders, toggleLike, handleStarRating, handleSelectTender }) => {
  return (
    <div id="tender-items">
      {tenders.map(tender => (
        <div key={tender.id} className="tender-item">
          <h3>{tender.title}</h3>
          <p>{tender.description}</p>
          <p><strong>Institution:</strong> {tender.institution}</p>
          
          {/* Display Image with Hover Effect */}
          {tender.image && (
            <div className="image-container">
              <Image src={tender.image} alt="Tender" width={100} height={100} />
            </div>
          )}

          {/* Display Like Button and Rating on List */}
          <button onClick={() => toggleLike(tender.id)}>
            <FaThumbsUp /> {tender.likes > 0 ? "Unlike" : "Like"}
          </button>
          
          {/* Display Star Rating */}
          <div>
            {[1, 2, 3, 4, 5].map(star => (
              <span key={star} onClick={() => handleStarRating(tender.id, star)} style={{ cursor: 'pointer', color: star <= tender.rating ? '#FFD700' : '#ccc' }}>
                <FaStar />
              </span>
            ))}
          </div>

          {/* Click to View Tender */}
          <button onClick={() => handleSelectTender(tender)}>View Tender</button>
        </div>
      ))}
    </div>
  );
};

// TenderDetail Component
const TenderDetail = ({ tender, toggleLike, handleStarRating, addComment, setSelectedTender }) => {
  return (
    <div id="tender-detail">
      <h2>{tender.title} Details</h2>
      <p><strong>Institution:</strong> {tender.institution}</p>
      <p><strong>Open Date:</strong> {tender.openDate}</p>
      <p><strong>Close Date:</strong> {tender.closeDate}</p>
      <p><strong>Contact Person:</strong> {tender.contactPerson}</p>
      <p>{tender.description}</p>
      {tender.image && <Image src={tender.image} alt="Tender" width={200} height={200} />}

      {/* Like Button */}
      <button onClick={() => toggleLike(tender.id)}>
        <FaThumbsUp /> {tender.likes > 0 ? "Unlike" : "Like"}
      </button>

      {/* Rating */}
      <h3>Rating</h3>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} onClick={() => handleStarRating(tender.id, star)} style={{ cursor: 'pointer', color: star <= tender.rating ? '#FFD700' : '#ccc' }}>
          <FaStar />
        </span>
      ))}

      {/* Comments */}
      <h3>Comments</h3>
      <input type="text" placeholder="Add a comment" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          addComment(tender.id, e.target.value);
          e.target.value = '';
        }
      }} />
      <ul>
        {tender.comments && tender.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>

      {/* In-App Messaging Button */}
      <button>Send Message</button>
      <button onClick={() => setSelectedTender(null)}>Back to Tenders</button>
    </div>
  );
};

// Main Page Component
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

  // Load initial tenders and remove expired ones
  useEffect(() => {
    const storedTenders = JSON.parse(localStorage.getItem('tenders')) || [];
    const currentDate = new Date().toISOString().split('T')[0];
    const validTenders = storedTenders.filter(tender => tender.closeDate >= currentDate);
    setTenders(validTenders);
  }, []);

  // Save tenders to Local Storage
  const saveTendersToLocalStorage = (updatedTenders) => {
    localStorage.setItem('tenders', JSON.stringify(updatedTenders));
  };

  // Handle New Tender Input
  const handleTenderChange = (e) => {
    const { name, value } = e.target;
    setNewTender((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    setNewTender((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files[0]) }));
  };

  // Submit New Tender
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

  // Toggle Like
  const toggleLike = (tenderId) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, likes: tender.likes === 0 ? 1 : 0 } : tender
    );
    setTenders(updatedTenders);
    saveTendersToLocalStorage(updatedTenders);
  };

  // Add Comment
  const addComment = (tenderId, comment) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, comments: [...(tender.comments || []), comment] } : tender
    );
    setTenders(updatedTenders);
    saveTendersToLocalStorage(updatedTenders);
  };

  // Handle Star Rating
  const handleStarRating = (tenderId, rating) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, rating } : tender
    );
    setTenders(updatedTenders);
    saveTendersToLocalStorage(updatedTenders);
  };

  // Handle Select Tender
  const handleSelectTender = (tender) => {
    setSelectedTender(tender);
  };

  return (
    <div className="container">
      <header>
        <Image src="/logo.PNG" alt="Logo" width={100} height={100} />
        <h2>Tender Portal</h2>
        <p>Your gateway to verified and due diligence tender opportunities for schools, hospitals, and community projects.</p>
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
            <input type="file" onChange={handleImageUpload} required />
            <button type="submit">Submit Tender</button>
            <button type="button" onClick={() => setShowPostTenderForm(false)}>Cancel</button>
          </form>
        </div>
      ) : selectedTender ? (
        <TenderDetail 
          tender={selectedTender} 
          toggleLike={toggleLike} 
          handleStarRating={handleStarRating} 
          addComment={addComment} 
          setSelectedTender={setSelectedTender} 
        />
      ) : (
        <div>
          <button onClick={() => setShowPostTenderForm(true)}>Post New Tender</button>
          <TenderList 
            tenders={tenders} 
            toggleLike={toggleLike} 
            handleStarRating={handleStarRating} 
            handleSelectTender={handleSelectTender} 
          />
        </div>
      )}
    </div>
  );
};

export default Home;
