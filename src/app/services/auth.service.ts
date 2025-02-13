import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL;

  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const storage = this.document.defaultView?.localStorage;

    this.currentUserSubject = new BehaviorSubject<string | null>(
      storage ? storage.getItem('token') : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.URLbase}/Auth/login`, { email, password })
      .pipe(
        map((response) => {
          if (response.token) {
            this.document.defaultView?.localStorage?.setItem('token', response.token);
            this.currentUserSubject.next(response.token);
          }
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  logout() {
    this.document.defaultView?.localStorage?.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.document.defaultView?.localStorage?.getItem('token') ?? null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return (Math.floor(Date.now() / 1000)) >= expiry;
    } catch (error) {
      return true; // Si hay error, asumir expirado
    }
  }
}