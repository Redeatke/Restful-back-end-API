const http = require('http');

const makeRequest = (method, path, data, token) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const run = async () => {
    try {
        console.log('Waiting for server to start...');
        await new Promise(r => setTimeout(r, 2000));

        console.log('1. Registering User...');
        const regRes = await makeRequest('POST', '/api/auth/register', {
            username: 'testuser_' + Date.now(),
            email: 'test_' + Date.now() + '@example.com',
            password: 'password123'
        });
        console.log('Register Status:', regRes.status);
        if (regRes.status !== 201) {
            console.error('Registration failed', regRes.body);
            process.exit(1);
        }

        console.log('2. Logging In...');
        const loginRes = await makeRequest('POST', '/api/auth/login', {
            email: regRes.body.email,
            password: 'password123'
        });
        console.log('Login Status:', loginRes.status);
        if (loginRes.status !== 200) {
            console.error('Login failed', loginRes.body);
            process.exit(1);
        }

        const token = loginRes.body.token;
        console.log('Got Token');

        console.log('3. Accessing Protected Route...');
        const meRes = await makeRequest('GET', '/api/auth/me', null, token);
        console.log('Me Status:', meRes.status);
        if (meRes.status !== 200) {
            console.error('Protected route failed', meRes.body);
            process.exit(1);
        }
        console.log('User Data:', meRes.body.email);

        console.log('SUCCESS: API Verified');
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
};

run();
