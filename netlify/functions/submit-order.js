exports.handler = async function(event, context) {

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Get credentials from Netlify environment variables (never exposed to browser)
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

  if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error — missing credentials' })
    };
  }

  try {
    const fields = JSON.parse(event.body);

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Orders`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      const err = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: err.error?.message || 'Airtable error' })
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
