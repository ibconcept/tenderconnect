"use client";
import { useState, useEffect } from 'react';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [tenders, setTenders] = useState([
        {
            id: 1,
            title: "School Renovation",
            description: "Renovation of classrooms and facilities.",
            image: null,
            institution: "Green Valley School",
            openDate: "2024-10-01",
            closeDate: "2024-10-15",
            contactPerson: "Alice Johnson"
        },
        {
            id: 2,
            title: "Hospital Equipment Supply",
            description: "Supply of medical equipment for the new wing.",
            image: null,
            institution: "City Hospital",
            openDate: "2024-10-05",
            closeDate: "2024-10-20",
            contactPerson: "Dr. Mark Lee"
        },
        {
            id: 3,
            title: "Community Center Construction",
            description: "Building a new community center for local events.",
            image: null,
            institution: "Sunny Community Center",
            openDate: "2024-10-10",
            closeDate: "2024-10-25",
            contactPerson: "John Smith"
        }
    ]);
    const [selectedTender, setSelectedTender] = useState(null);
    const [showPostTenderForm, setShowPostTenderForm] = useState(false);

    const [newTenderTitle, setNewTenderTitle] = useState("");
    const [newTenderDescription, setNewTenderDescription] = useState("");
    const [newTenderImage, setNewTenderImage] = useState(null);
    const [newTenderInstitution, setNewTenderInstitution] = useState("");
    const [newTenderOpenDate, setNewTenderOpenDate] = useState("");
    const [newTenderCloseDate, setNewTenderCloseDate] = useState("");
    const [newTenderContactPerson, setNewTenderContactPerson] = useState("");
    const [tenderCounter, setTenderCounter] = useState(3);

    useEffect(() => {
        const storedTenders = JSON.parse(localStorage.getItem('tenders'));
        if (storedTenders) {
            setTenders(storedTenders);
            setTenderCounter(storedTenders.length > 0 ? storedTenders[storedTenders.length - 1].id : 0);
        }
    }, []);

    const saveTendersToLocalStorage = () => {
        localStorage.setItem('tenders', JSON.stringify(tenders));
    };

    const viewTender = (tenderId) => {
        const selected = tenders.find(t => t.id === tenderId);
        setSelectedTender(selected);
    };

    const submitQuote = (event) => {
        event.preventDefault();
        alert("Quote submitted for tender.");
        setSelectedTender(null);
    };

    const submitTender = (event) => {
        event.preventDefault();
        const newTender = {
            id: tenderCounter + 1,
            title: newTenderTitle,
            description: newTenderDescription,
            image: newTenderImage ? URL.createObjectURL(newTenderImage) : null,
            institution: newTenderInstitution,
            openDate: newTenderOpenDate,
            closeDate: newTenderCloseDate,
            contactPerson: newTenderContactPerson
        };
        setTenders([...tenders, newTender]);
        saveTendersToLocalStorage();
        setShowPostTenderForm(false);
        setNewTenderTitle("");
        setNewTenderDescription("");
        setNewTenderImage(null);
        setNewTenderInstitution("");
        setNewTenderOpenDate("");
        setNewTenderCloseDate("");
        setNewTenderContactPerson("");
        setTenderCounter(tenderCounter + 1);
    };

    const handleImageUpload = (event) => {
        setNewTenderImage(event.target.files[0]);
    };

    return (
        <div>
            <header>
                <h1>Tender Portal</h1>
                <p>Your gateway to opportunities for schools, hospitals, and community projects.</p>
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
                        <input
                            type="text"
                            value={newTenderInstitution}
                            onChange={(e) => setNewTenderInstitution(e.target.value)}
                            placeholder="Institution Name"
                            required
                        />
                        <input
                            type="text"
                            value={newTenderTitle}
                            onChange={(e) => setNewTenderTitle(e.target.value)}
                            placeholder="Tender Title"
                            required
                        />
                        <textarea
                            value={newTenderDescription}
                            onChange={(e) => setNewTenderDescription(e.target.value)}
                            placeholder="Tender Description"
                            required
                        />
                        <input
                            type="date"
                            value={newTenderOpenDate}
                            onChange={(e) => setNewTenderOpenDate(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            value={newTenderCloseDate}
                            onChange={(e) => setNewTenderCloseDate(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            value={newTenderContactPerson}
                            onChange={(e) => setNewTenderContactPerson(e.target.value)}
                            placeholder="Contact Person"
                            required
                        />
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
                    {selectedTender.image && (
                        <img src={selectedTender.image} alt="Tender Image" width="200" />
                    )}
                    <h3>Apply for Tender</h3>
                    <form onSubmit={submitQuote}>
                        <textarea placeholder="Enter your quote"></textarea>
                        <input type="file" id="quote-file" />
                        <button type="submit">Submit Quote</button>
                    </form>
                    <button onClick={() => setSelectedTender(null)}>Back to Tenders</button>
                </div>
            ) : (
                <div id="tender-list">
                    <h2>Available Tenders</h2>
                    <button onClick={() => setShowPostTenderForm(true)}>Post Tender</button>
                    <div id="tender-items">
                        {tenders.map(tender => (
                            <button className="tender-item" key={tender.id} onClick={() => viewTender(tender.id)}>
                                <h3>{tender.title}</h3>
                                <p>{tender.description}</p>
                                <p><strong>Institution:</strong> {tender.institution}</p>
                                {tender.image && (
                                    <img src={tender.image} alt="Tender Image" width="100" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
