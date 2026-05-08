const fs = require('fs');
const path = require('path');
const http = require('http');

async function testUpload() {
  const testFilePath = path.join(__dirname, 'test-image.txt');
  fs.writeFileSync(testFilePath, 'fake-image-data-' + Date.now());

  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const filename = 'test-upload.png';
  
  const postData = 
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
    `Content-Type: image/png\r\n\r\n` +
    fs.readFileSync(testFilePath) + `\r\n` +
    `--${boundary}--\r\n`;

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/upload',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log('Upload Response:', parsedData);
        if (parsedData.success) {
          const uploadedPath = path.join(process.cwd(), 'public', parsedData.url);
          if (fs.existsSync(uploadedPath)) {
            console.log('✅ SUCCESS: File exists on disk at:', uploadedPath);
          } else {
            console.error('❌ ERROR: File NOT found on disk at:', uploadedPath);
          }
        } else {
          console.error('❌ ERROR: API returned failure:', parsedData.error);
        }
      } catch (e) {
        console.error('❌ ERROR parsing response:', e.message);
        console.log('Raw output:', rawData);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Request error:', e.message);
  });

  req.write(postData);
  req.end();
  
  // Cleanup test file
  setTimeout(() => fs.unlinkSync(testFilePath), 2000);
}

testUpload();
