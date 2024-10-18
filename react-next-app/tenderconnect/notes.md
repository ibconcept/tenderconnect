


In Next.js, you do have a backend through API routes. 
If you want server-side code (e.g., interacting with PostgreSQL), 
you should create an API route instead of using use client. 
You can't access a database directly from a client-side component.

Keep use client in your page.js for client-side interactions.
Create an API route in pages/api/save-tender.js for server-side code:
<!-- js
 
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Handle PostgreSQL save logic here
    }
} -->
Submit data from your page.js to the API route.