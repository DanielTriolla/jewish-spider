import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async getEvent<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, config),
      );
      return response.data;
    } catch (error) {
      console.error(`HTTP GET Error: ${url}`, error.message);
      throw error;
    }
  }
}
