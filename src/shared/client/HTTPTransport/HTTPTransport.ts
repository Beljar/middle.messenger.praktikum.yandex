import { client } from './mock-client';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

interface IHTTPTransport {
  get: (url: string, options: {}) => Promise<XMLHttpRequest>;
}

class HTTPTransport implements IHTTPTransport {
  get(url, options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  post(url, options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  put(url, options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  delete(url, options = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  request(url, options = {}, timeout = 5000) {
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
        xhr.setRequestHeader(key, headers[key]);
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
        xhr.send(data);
      }
    });
  }
}

const mockRequest = async (url, options = {}, timeout = 5000) => {
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
      const response = await client.postMessage(options.data.message, chatId);
      return { response, status: 400 } as XMLHttpRequest;
    }
  }
};

const transport = new HTTPTransport();

export const HTTPTransportProxy = new Proxy(transport, {
  get(target, prop, receiver) {
    if (prop === 'request') {
      return mockRequest;
    }
    const origMethod = target[prop];
    return function (...args) {
      const result = origMethod.apply(this, args);
      return result;
    };
  },
});
