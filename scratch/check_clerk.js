const axios = require('axios');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const lines = env.split(/\r?\n/);
const envVars = {};
for (const line of lines) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
    }
}

async function listClerkUsers() {
    const secretKey = envVars.CLERK_SECRET_KEY;
    if (!secretKey) {
        console.error('CLERK_SECRET_KEY not found');
        return;
    }

    try {
        const response = await axios.get('https://api.clerk.com/v1/users', {
            headers: {
                Authorization: `Bearer ${secretKey}`
            }
        });
        
        console.log('Clerk Users:', JSON.stringify(response.data, null, 2));
        
        const targetUser = response.data.find(u => 
            u.email_addresses.some(e => e.email_address === 'parwal111@gmail.com')
        );
        
        if (targetUser) {
            console.log('FOUND USER:', targetUser.id);
        } else {
            console.log('User not found in Clerk with email parwal111@gmail.com');
        }
    } catch (err) {
        console.error('Clerk API Error:', err.response?.data || err.message);
    }
}

listClerkUsers();
