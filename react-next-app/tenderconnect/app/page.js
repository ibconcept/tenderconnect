"use client";

import { useState, useEffect, useCallback } from 'react';
import './globals.css';
import { FaStar, FaThumbsUp } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';  // Correct import for useRouter
import React from 'react';

// StarRating Component (reusable)
const StarRating = ({ rating, onRate }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} onClick={() => onRate(star)} style={{ cursor: 'pointer', color: star <= rating ? '#FFD700' : '#ccc' }}>
          <FaStar />
        </span>
      ))}
    </div>
  );
};

// TenderList Component (memoized)
const TenderList = React.memo(({ tenders, toggleLike, handleStarRating, handleSelectTender }) => {
  return (
    <div id="tender-items">
      {tenders.map(tender => (
        <div key={tender.id} className="tender-item">
          <h3>{tender.title}</h3>
          <p>{tender.description}</p>
          <p><strong>Institution:</strong> {tender.institution}</p>

          {tender.image && (
            <div className="image-container">
              <Image src={tender.image} alt="Tender" width={100} height={100} />
            </div>
          )}

          <button onClick={() => toggleLike(tender.id)}>
            <FaThumbsUp /> {tender.likes > 0 ? "Unlike" : "Like"}
          </button>

          <StarRating rating={tender.rating} onRate={(star) => handleStarRating(tender.id, star)} />

          <button onClick={() => handleSelectTender(tender)}>View Tender</button>
        </div>
      ))}
    </div>
  );
});

// TenderDetail Component
const TenderDetail = ({ tender, toggleLike, handleStarRating, addComment, setSelectedTender }) => (
  <div id="tender-detail">
    <h2>{tender.title} Details</h2>
    <p><strong>Institution:</strong> {tender.institution}</p>
    <p><strong>Open Date:</strong> {tender.openDate}</p>
    <p><strong>Close Date:</strong> {tender.closeDate}</p>
    <p><strong>Contact Person:</strong> {tender.contactPerson}</p>
    <p>{tender.description}</p>
    {tender.image && <Image src={tender.image} alt="Tender" width={200} height={200} />}

    <button onClick={() => toggleLike(tender.id)}>
      <FaThumbsUp /> {tender.likes > 0 ? "Unlike" : "Like"}
    </button>

    <h3>Rating</h3>
    <StarRating rating={tender.rating} onRate={(star) => handleStarRating(tender.id, star)} />

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

    <button>Send Message</button>
    <button onClick={() => setSelectedTender(null)}>Back to Tenders</button>
  </div>
);

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

  const router = useRouter();  // Use next/navigation useRouter

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

  // Toggle Like with useCallback
  const toggleLike = useCallback((tenderId) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, likes: tender.likes === 0 ? 1 : 0 } : tender
    );
    setTenders(updatedTenders);
    saveTendersToLocalStorage(updatedTenders);
  }, [tenders]);

  // Add Comment with useCallback
  const addComment = useCallback((tenderId, comment) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, comments: [...(tender.comments || []), comment] } : tender
    );
    setTenders(updatedTenders);
    saveTendersToLocalStorage(updatedTenders);
  }, [tenders]);

  // Handle Star Rating with useCallback
  const handleStarRating = useCallback((tenderId, rating) => {
    const updatedTenders = tenders.map(tender =>
      tender.id === tenderId ? { ...tender, rating } : tender
    );
    setTenders(updatedTenders);
    saveTendersToLocalStorage(updatedTenders);
  }, [tenders]);

  // Handle Select Tender with useCallback
  const handleSelectTender = useCallback((tender) => {
    setSelectedTender(tender);
  }, []);

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

  return (
    <div className="container">
      <header>
        <Image src="/logo.PNG" alt="Logo" width={100} height={100} />
        <h2>Tender Portal</h2>
        <p>Your gateway to verified tender opportunities.</p>
        <nav>
          <button onClick={() => router.push('/profile')}>My Profile</button>
          <button onClick={() => router.push('/my-tenders')}>My Tenders</button>
          <button onClick={() => router.push('/suppliers')}>Suppliers</button>
        </nav>
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
            <input type="file" onChange={handleImageUpload} accept="image/*" required />
            <button type="submit">Post Tender</button>
          </form>
          <button onClick={() => setShowPostTenderForm(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <button onClick={() => setShowPostTenderForm(true)}>Post a Tender</button>
          <TenderList tenders={tenders} toggleLike={toggleLike} handleStarRating={handleStarRating} handleSelectTender={handleSelectTender} />
        </>
      )}

      {selectedTender && (
        <TenderDetail tender={selectedTender} toggleLike={toggleLike} handleStarRating={handleStarRating} addComment={addComment} setSelectedTender={setSelectedTender} />
      )}
    </div>
  );
};

export default Home;
