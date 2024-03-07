import { BASE_URL } from './const';

export interface Network {
  get(url: string): Promise<any>;
  post(url: string, payload: any): Promise<any>;
}

class NetworkImplementation implements Network {
  private csrf: string;

  constructor() {
    this.get('csrf-token/')
      .then((res: { csrfToken: string }) => {
        console.log('🚀 ~ NetworkImplementation ~ .then ~ res:', res);
        this.setCsrf(res.csrfToken);
      })
      .catch((err) => console.error(err));
  }

  getHeaders(): HeadersInit {
    return {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCsrf(),
    };
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

  async post(url: string, payload: any): Promise<any> {
    const res = await fetch(`${BASE_URL}${url}`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.getHeaders(),
    });

    const body = await res.json();

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
