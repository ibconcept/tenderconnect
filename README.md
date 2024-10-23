TenderConnect
TenderConnect is a web-based platform designed to streamline the tendering process for businesses, organizations, and suppliers. The platform enables transparency and reduces bureaucracy in tender management by allowing institutions to post tenders, and suppliers to apply for them, all while ensuring secure user authentication and document handling.

Features
Post Tenders: Users can easily list new tenders by providing details such as institution name, tender description, and contact information. Additional documents like company registration certificates, KRA PINs, and ID cards can also be uploaded.
View and Apply for Tenders: Suppliers can browse available tenders and submit their bids directly through the platform.
Document Management: Support for uploading key tender-related documents in PDF, JPEG, or PNG formats.
OAuth Authentication: Secure user login and authentication through OAuth for quick access.
Backend Powered by PostgreSQL and Express: The application uses PostgreSQL as the database for storing tender data and Express as the backend server to handle requests.
Live Demo
The app is currently deployed on Netlify. You can explore it live at:
👉 TenderConnect

Installation
To set up the application locally on your machine, follow these steps:

1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/tenderconnect.git
2. Navigate to the Project Directory
bash
Copy code
cd tenderconnect
3. Install Frontend Dependencies
Ensure you have Node.js installed. Run the following command to install the frontend dependencies:

bash
Copy code
npm install
4. Set Up Backend
4.1 Install Backend Dependencies
Navigate to the backend folder:

bash
Copy code
cd backend
Run:

bash
Copy code
npm install
4.2 Set Up PostgreSQL Database
Ensure PostgreSQL is installed on your system. If not, you can download and install it from PostgreSQL.
Create a new database called tenderconnect:
bash
Copy code
createdb tenderconnect
Set up your environment variables in a .env file inside the backend folder:
bash
Copy code
DATABASE_URL=postgres://username:password@localhost:5432/tenderconnect
SECRET_KEY=your-secret-key
OAUTH_CLIENT_ID=your-oauth-client-id
OAUTH_CLIENT_SECRET=your-oauth-client-secret
4.3 Run Express Server
Once your database is set up and environment variables are configured, start the Express server:

bash
Copy code
npm run dev
5. Run the App
To start the frontend app, return to the main project folder and run:

bash
Copy code
npm run dev
This will start both the frontend and backend development servers. The frontend is accessible at http://localhost:3000 and the backend at http://localhost:5000.

Tech Stack
Frontend: Svelte
Backend: Express.js
Database: PostgreSQL
Authentication: OAuth 2.0 for secure user login
Deployment: Netlify (Frontend), Heroku or Render (Backend)
API Endpoints
The backend API handles the communication between the frontend and the database. Below are the key routes:

GET /tenders: Retrieve the list of all available tenders.
POST /tenders: Post a new tender (OAuth protected).
GET /tenders/:id: Retrieve details of a specific tender.
POST /tenders/:id/apply: Apply for a specific tender.
Contribution
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch for your feature or bugfix.
Submit a pull request once your changes are ready.
This README.md provides a detailed overview of your TenderConnect application, along with installation instructions, backend setup, and authentication details using OAuth. Let me know if you need any more changes or additions!
