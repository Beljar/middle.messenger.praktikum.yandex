import { client } from './mock-client';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

interface IOptions {
  headers?: Record<string, string>;
  method?: (typeof METHODS)[keyof typeof METHODS];
  data?: object;
  timeout?: number;
}

function queryStringify(data: object) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data) as (keyof typeof data)[];
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

interface IHTTPTransport {
  get: (url: string, options: IOptions) => Promise<XMLHttpRequest>;
  post: (url: string, options: IOptions) => Promise<XMLHttpRequest>;
  put: (url: string, options: IOptions) => Promise<XMLHttpRequest>;
  delete: (url: string, options: IOptions) => Promise<XMLHttpRequest>;
}

class HTTPTransport implements IHTTPTransport {
  get(url: string, options: IOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  post(url: string, options: IOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  put(url: string, options: IOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  delete(url: string, options: IOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  request(url: string, options: IOptions = {}, timeout = 5000) {
    const { headers = {}, method, data } = options;
    return new Promise<XMLHttpRequest>(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        if (key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

const mockRequest = async (url: string, options: IOptions = {}) => {
  if (url === '/chats') {
    const response = await client.getChats();
    return { response, status: 400 } as XMLHttpRequest;
  }
  const re = /\/chats\/(.+)/;
  const chatId = url.match(re)?.[1];
  if (chatId) {
    if (options.method === METHODS.GET) {
      const response = await client.getChatById(chatId);
      return { response, status: 400 } as XMLHttpRequest;
    }
    if (options.method === METHODS.POST) {
      if (
        options.data &&
        'message' in options.data &&
        typeof options.data.message === 'string'
      ) {
        const response = await client.postMessage(options.data.message, chatId);
        return { response, status: 400 } as XMLHttpRequest;
      }
    }
  }
};

const transport = new HTTPTransport();

export const HTTPTransportProxy = new Proxy(transport, {
  get(target, prop: keyof typeof transport) {
    if (prop === 'request') {
      return mockRequest;
    }
    if (!(prop in target)) {
      return;
    }
    const origMethod = target[prop];
    return function (
      this: HTTPTransport,
      ...args: [url: string, options?: IOptions | undefined]
    ) {
      const result = origMethod.apply(this, args);
      return result;
    };
  },
});
