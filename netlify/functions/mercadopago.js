exports.handler = async function(event) {
  const token = 'APP_USR-8997497946648441-050817-81359fd6d7d9dcba7648561d022b5348-1467652438';
  const endpoint = event.queryStringParameters && event.queryStringParameters.endpoint;

  const endpoints = {
    balance:  'https://api.mercadopago.com/v1/account/balance',
    releases: 'https://api.mercadopago.com/v1/account/release/search?offset=0&limit=100',
    payments: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&range=date_created&begin_date=NOW-30DAYS&end_date=NOW&limit=50',
  };

  if (!endpoint || !endpoints[endpoint]) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Endpoint inválido' }) };
  }

  try {
    const response = await fetch(endpoints[endpoint], {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
