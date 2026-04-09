// Debug script để kiểm tra API key
console.log('=== DEBUG API KEY ===');
console.log('From window.__GEMINI_API_KEY__:', window.__GEMINI_API_KEY__ || 'NOT SET');
console.log('From localStorage:', localStorage.getItem('gemini_api_key') || 'NOT SET');

// Function để test API key
async function testAPIKey() {
    const apiKey = (window.__GEMINI_API_KEY__ || localStorage.getItem('gemini_api_key') || '').trim();

    if (!apiKey) {
        console.error('❌ No API key found');
        return;
    }

    console.log('🔑 Testing API key:', apiKey.substring(0, 20) + '...');

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: 'Hello' }] }]
            })
        });

        if (response.ok) {
            console.log('✅ API key is valid!');
        } else {
            const error = await response.json();
            console.error('❌ API key invalid:', error);
        }
    } catch (error) {
        console.error('❌ Network error:', error);
    }
}

// Auto test sau 2 giây
setTimeout(testAPIKey, 2000);