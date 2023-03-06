import axios, { AxiosError } from 'axios';

import { CurrenciesType } from './types';

export { CurrenciesType };

export interface ICreateParams {
  vendor: string;
  invoice: string | number;
  secret: string;
  price: number;
  currency: CurrenciesType;
  email?: string;
  callbackUrl: string;
  returnUrl: string;
}

export interface ICreateError {
  status: 'error';
  message: string;
}

export interface ICreateSuccess {
  status: 'success';
  url: string;
}

export class Litepay {
  private static encodeData(data: object) {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value);
    });

    return params;
  }

  public static async merchantCreate(data: ICreateParams) {
    try {
      const res = await axios.post<ICreateError | ICreateSuccess>(
        'https://litepay.ch/p/',
        this.encodeData(data),
      );

      return res.data;
    } catch (error) {
      const thisError = error as AxiosError;

      if (axios.isAxiosError(thisError) === true) {
        return thisError.response?.data as ICreateError;
      }

      throw thisError;
    }
  }
}
