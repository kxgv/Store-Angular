import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { TokenPayload } from '../api/api.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private URLbase = environment.apiURL;

  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  token: TokenPayload | undefined;
  decodedToken: TokenPayload | undefined;

  formUrlEncoded = 'application/x-www-form-urlencoded';
  applicationJson = 'application/json;charset=utf8';

  constructor(@Inject(DOCUMENT) private document: Document) {
    const storage = this.document.defaultView?.localStorage;

    this.currentUserSubject = new BehaviorSubject<string | null>(
      storage ? storage.getItem('token') : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.URLbase}/Auth/login`,
      { email, password },
      { headers: this.getHeaders('application/json') }
    ).pipe(
      switchMap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.token);
          this.storageToken(response.token);
          this.getDecodedToken(response.token);
        }
        return of(response);
      }),
      catchError(error => {
        console.error('Bad login:', error);
        return throwError(() => new Error('Bad credentials'));
      })
    );
  }

  get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  logout() {
    this.document.defaultView?.localStorage?.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getAuthToken(): TokenPayload | undefined{
    return this.token;
  }

  storageToken(authToken: string) {
    localStorage.setItem('token', authToken);
    this.getDecodedToken(authToken);
  }

  getDecodedToken(authToken: string): TokenPayload | null {
    if (!authToken) {
      console.error("No JWT token provided");
      return null;
    }
  
    try {
      const decodedToken: TokenPayload = jwtDecode(authToken);
      this.decodedToken = decodedToken;
      console.log("decoded token", this.decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Failed to decode JWT token:", error);
      return null;
    }
  }

  addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authoritzaction: `Bearer ${token}`,
      },
    });
  }

  getHeaders(contentType: string = this.formUrlEncoded) {
    return new HttpHeaders().set('Content-Type', contentType);
  }

  getToken(): string | null {
    return this.document.defaultView?.localStorage?.getItem('token') ?? null;
  }

  public isUserInRole(expectedRole: string): Observable<boolean> {
    return of(this.getAuthToken()).pipe(
        map(jwtToken => {
            console.log(jwtToken?.role.toLowerCase());
            if (jwtToken && jwtToken.role) {

              const _expectedRole = expectedRole.toLowerCase();
              const _userRole = jwtToken.role.toLowerCase();
              return _expectedRole === _userRole;    
            } else {
                return false;
            }
        }),
    );
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