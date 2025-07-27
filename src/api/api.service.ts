import { toaster } from '@/components/ui/toaster';
import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from 'axios';

class ApiService {
  private readonly axiosInstance: AxiosInstance;
  private readonly config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  static #instance: ApiService;

  private constructor() {
    this.axiosInstance = axios.create(this.config);
  }

  public static get instance(): ApiService {
    if (!ApiService.#instance) {
      ApiService.#instance = new ApiService();
    }

    return ApiService.#instance;
  }

  public get<T, P>(url: string, params?: P) {
    return this.getRequest<T>('GET', { url, params });
  }

  private getRequest<T = void>(method: Method, config: AxiosRequestConfig) {
    return this.axiosInstance.request<T>({ ...config, method }).catch((error: AxiosError) => this.processError(error));
  }

  private processError(error: AxiosError): void {
    console.error(error);
    toaster.error({
      description: 'Oops, something went wrong...',
      type: 'error',
      closable: true,
    });
  }
}

export default ApiService.instance;
