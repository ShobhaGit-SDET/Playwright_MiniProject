import{test,expect}from'@playwright/test';


test.describe('API Key Authorization Examples', () => {
  test('[API Key - Header] Postman Echo reflects header key', async ({ request }) => {
    // const baseUrl = process.env.BASE_URL1 ?? '';
    // const headerName = process.env.HEADER_NAME ?? 'x-api-key';
    // const apiKey = process.env.API_KEY ?? '';

    expect(process.env.BASE_URL1).toBeTruthy();

    const res = await request.get(`${process.env.BASE_URL1}/get`, {
      headers: {
        Accept: 'application/json',
        [process.env.HEADER_NAME!]: process.env.API_KEY!,
      },
    });

    expect(res.ok()).toBeTruthy();

    const body = await res.json();

    const echoedKey = body.headers?.[process.env.HEADER_NAME!];

    expect(echoedKey).toBe(process.env.API_KEY!);
    expect(body.url).toContain('/get');
  });
 
 
 
  test('[API Key - Query] Postman Echo reflects query key', async ({ request }) => {
 
  
    const res = await request.get(
      `${process.env.BASE_URL1}/get?api_key=${process.env.API_KEY}`
    );
 
    expect(res.ok()).toBeTruthy();
 
    const body = await res.json();
 
    // Verify API key is present in URL
    expect(body.url).toContain(process.env.API_KEY);
  });

});
