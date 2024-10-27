# TenderConnect

![TenderConnect Logo](public/logo.png) <!-- Adjust the logo path as needed -->

**TenderConnect** is a web-based platform designed to streamline the tendering process for businesses, organizations, and suppliers. It enables transparency and reduces bureaucracy by allowing institutions to post tenders and suppliers to apply securely.

## Features
- **Post Tenders**: List new tenders with details and upload documents.
- **View and Apply for Tenders**: Suppliers can browse and submit bids.
- **Document Management**: Upload tender-related documents in PDF, JPEG, or PNG formats.
- **OAuth Authentication**: Secure user login and authentication.
- **Backend Powered by PostgreSQL and Express**: Stores tender data and handles requests.

## Live Demo
👉 [TenderConnect](https://example.com) <!-- Add your live demo link -->

## Tech Stack
- **Frontend**: Svelte  
- **Backend**: Express.js  
- **Database**: PostgreSQL  
- **Authentication**: OAuth 2.0  
- **Deployment**: Netlify (Frontend), Heroku or Render (Backend)

## API Endpoints
- **GET /tenders**: List all tenders.
- **POST /tenders**: Post a new tender (OAuth protected).
- **GET /tenders/:id**: Retrieve a specific tender.
- **POST /tenders/:id/apply**: Apply for a tender.

## Installation
```bash
git clone https://github.com/your-username/tenderconnect.git
cd tenderconnect
npm install
cd backend
npm install
createdb tenderconnect
# Create .env file with:
# DATABASE_URL=postgres://username:password@localhost:5432/tenderconnect
# SECRET_KEY=your-secret-key
# OAUTH_CLIENT_ID=your-oauth-client-id
# OAUTH_CLIENT_SECRET=your-oauth-client-secret
npm run dev
