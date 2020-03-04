
const JSON_ERROR = { errors: ["We've experienced a problem, please try again"] }
export default class Request {
  public static async get(url: string): Promise<any> {
    const response = await fetch(url, { credentials: 'include' });

    try {
      const data = await response.json();
      return handleResponse(response, data);
    } catch {
      return Promise.reject(JSON_ERROR)
    }
  }

  public static async post(url: string, body: Object): Promise<any> {
    const response = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'csrf-token': csrfToken() || ''
      },
      body: JSON.stringify({ ...body })
    });

    try {
      const data = await response.json();
      return handleResponse(response, data);
    } catch {
      return Promise.reject(JSON_ERROR);
    }
  }

  public static async patch(url: string, body: Object): Promise<any> {
    const response = await fetch(url, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'csrf-token': csrfToken() || ''
      },
      body: JSON.stringify({ ...body })
    });

    try {
      const data = await response.json();
      return handleResponse(response, data);
    } catch {
      return Promise.reject(JSON_ERROR);
    }
  }
}

const csrfToken = (): string | undefined => {
  const cookies = decodeURIComponent(document.cookie).split(';');
  const token = cookies.find(cookie => cookie.includes('XSRF-TOKEN'));

  if (token) {
    return token.split('=')[1]
  }
}

const handleResponse = (response: any, data: JSON): Promise<any> => {;
  if(response.status >= 400) {
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
