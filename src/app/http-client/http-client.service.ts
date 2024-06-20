import { Injectable, Logger } from '@nestjs/common';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(private readonly http: NestHttpService) {}

  get<T>(url: string, params?: object): Observable<T> {
    return this.http.get<T>(url, { params }).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(`GET ${url} failed`, error);
        return throwError(() => new Error('HTTP GET request failed'));
      }),
    );
  }

  post<T>(url: string, body: object): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      map((response: AxiosResponse<T>) => response.data),
      catchError((error) => {
        this.logger.error(`POST ${url} failed`, error);
        return throwError(() => new Error('HTTP POST request failed'));
      }),
    );
  }
}
