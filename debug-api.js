// Debug script để kiểm tra API key
console.log('=== DEBUG API KEY ===');
console.log('From localStorage:', localStorage.getItem('gemini_api_key') || 'NOT SET');
console.log('From window.__GEMINI_API_KEY__:', window.__GEMINI_API_KEY__ || 'NOT SET');

// Simulate getGeminiApiKey function
function debugGetGeminiApiKey() {
    const fromStorage = (typeof localStorage !== 'undefined' && localStorage.getItem('gemini_api_key')) ? localStorage.getItem('gemini_api_key').trim() : '';
    const fromWindow = typeof window.__GEMINI_API_KEY__ === 'string' && window.__GEMINI_API_KEY__.trim() !== 'YOUR_API_KEY_HERE' ? window.__GEMINI_API_KEY__.trim() : '';
    const result = fromStorage || fromWindow || '';
    console.log('Final API key used:', result ? result.substring(0, 20) + '...' : 'EMPTY');
    return result;
}

debugGetGeminiApiKey();

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