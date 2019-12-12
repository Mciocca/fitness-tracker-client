export default class Request {
  public static async post(url: string, body: Object): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Connection': 'keep-alive',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    try {
      const data = await response.json();
      return handleResponse(response, data);
    } catch {
      return Promise.reject({ errors: ["We've experienced a problem, please try again"]});
    }
  }
}

const handleResponse = (response: any, data: JSON): Promise<any> => {;
  if(response.status >= 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
