import { BASE_URL } from './const';
console.log('🚀 ~ BASE_URL:', BASE_URL);

export interface Network {
  get(url: string): Promise<any>;
  post(url: string, payload: any): Promise<any>;
}

class NetworkImplementation implements Network {
  private csrf: string;

  constructor() {
    this.getToken();
  }

  getToken() {
    return this.get('csrf-token/')
      .then((res: { csrfToken: string }) => {
        console.log('🚀 ~ NetworkImplementation ~ .then ~ res:', res);
        this.setCsrf(res.csrfToken);
      })
      .catch((err) => console.error(err));
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append('X-CSRFToken', this.getCsrf());
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return headers;
  }

  async get(url: string): Promise<any> {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: this.getHeaders(),
    });

    const body = await res.json();

    console.log('🚀 ~ NetworkImplementation ~ get ~ body:', body);

    if (!res.ok) {
      throw new Error(JSON.stringify(res));
    }

    return body;
  }

  async delete(url: string): Promise<any> {
    await this.getToken();
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.getHeaders(),
    });

    let body = null;

    try {
      body = await res.json();
    } catch (error) {
      console.log('🚀 ~ NetworkImplementation ~ delete ~ error:', error);
    }

    if (!res.ok) {
      throw new Error(JSON.stringify(res));
    }

    return body;
  }

  async post(url: string, payload: any): Promise<any> {
    await this.getToken();

    const res = await fetch(`${BASE_URL}${url}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.getHeaders(),
    });

    let body = null;

    try {
      body = await res.json();
    } catch (error) {
      console.log('🚀 ~ NetworkImplementation ~ post ~ error:', error);
    }

    console.log('🚀 ~ NetworkImplementation ~ post ~ body:', body);

    if (!res.ok) {
      throw new Error(JSON.stringify(res));
    }

    return body;
  }

  setCsrf(csrf: string) {
    this.csrf = csrf;
  }

  getCsrf(): string {
    return this.csrf;
  }
}

export const NetworkImpl = new NetworkImplementation();
