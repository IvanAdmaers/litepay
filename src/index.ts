import axios, { AxiosError } from 'axios';

import packageJson from '../package.json';
import type { CurrenciesType } from './types';

export const { version } = packageJson;

export interface IMerchantCreateParams {
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

export interface IMerchantCreateSuccess {
  status: 'success';
  url: string;
}

export interface ICreate {
  method: 'btc' | 'ltc' | 'zec' | 'bch' | 'xmr';
  receivingAddress: string;
  callbackUrl?: string;
}

export interface ICreateSuccess {
  callback_url: string;
  address: string;
  destination: string;
  fee: number;
  status: 'success';
}

export interface ICheckSuccess {
  address: string;
  amount: string;
  confirmations: number;
  txids: string[];
  status: 'success';
}

export class Litepay {
  private static encodeData(data: object) {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value);
    });

    return params;
  }

  /**
   * {@link https://litepay.ch/docs/merchant_api/#generating-invoices}
   */
  public static async merchantCreate(data: IMerchantCreateParams) {
    try {
      const res = await axios.post<ICreateError | IMerchantCreateSuccess>(
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

  /**
   * {@link https://litepay.ch/docs/crypto_payment_api/#requesting}
   */
  public static async create(options: ICreate) {
    try {
      const paramsObj = {
        method: options.method,
        address: options.receivingAddress,
        callback: options.callbackUrl,
      };

      if (options.callbackUrl === undefined) {
        delete paramsObj.callback;
      }

      const query = this.encodeData(paramsObj).toString();

      const res = await axios.get<ICreateError | ICreateSuccess>(
        `https://litepay.ch/api/receive?${query}`,
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

  /**
   * {@link https://litepay.ch/docs/crypto_payment_api/#requesting:~:text=on%20the%20spot.-,NOTE,-%2D%20if%20you%20are}
   */
  public static async check(
    data: Pick<ICreate, 'method'> & Pick<ICreateSuccess, 'address'>,
  ) {
    try {
      const paramsObj = {
        method: data.method,
        address: data.address,
      };

      const query = this.encodeData(paramsObj).toString();

      const res = await axios.get<ICreateError | ICheckSuccess>(
        `https://litepay.ch/api/check?${query}`,
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

export { CurrenciesType };
