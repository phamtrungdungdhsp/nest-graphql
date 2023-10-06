import { BadGatewayException } from '@nestjs/common';
import axios, { RawAxiosRequestHeaders } from 'axios';
const defaultHeaders: RawAxiosRequestHeaders = {
  'Content-Type': 'application/json',
};
export class RequestUtil {
  static get<T>(url: string, headers: RawAxiosRequestHeaders = {}): Promise<T> {
    return axios({
      method: 'GET',
      url,
      headers: Object.assign(defaultHeaders, headers),
    })
      .then((response) => response.data as T)
      .catch((error) => {
        throw new BadGatewayException(error);
      });
  }
}
