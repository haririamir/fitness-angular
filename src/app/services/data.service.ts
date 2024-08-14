import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class DataService<T> {
  // T is the generic type
  constructor(
    protected http: HttpClient,
    @Inject(String) private endpoint: string
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint).pipe(catchError(this.handleError));
  }

  create(resource: T): Observable<T> {
    return this.http
      .post<T>(this.endpoint, resource)
      .pipe(catchError(this.handleError));
  }

  delete(id: any): Observable<void> {
    return this.http
      .delete<void>(`${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  update(id: any, data: Partial<T>): Observable<T> {
    return this.http
      .patch<T>(`${this.endpoint}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
