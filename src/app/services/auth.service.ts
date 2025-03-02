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
  private tokenKey = 'token'; // Clave para almacenar el token en localStorage

  token: TokenPayload | undefined;
  decodedToken: TokenPayload | undefined;

  formUrlEncoded = 'application/x-www-form-urlencoded';
  applicationJson = 'application/json;charset=utf8';
  currentUserSubject: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.URLbase}/Auth/login`,
      { email, password },
      { headers: this.getHeaders('application/json') }
    ).pipe(
      switchMap(response => {
        if (response.token) {
          //localStorage.setItem('token', response.token);
          // this.currentUserSubject.next(response.token);
          this.saveToken(response.token); // Guarda el token en localStorage

          // this.storageToken(response.token);
          // this.getDecodedToken(response.token);
        }
        return of(response);
      }),
      catchError(error => {
        console.error('Bad login:', error);
        return throwError(() => new Error('Bad credentials'));
      })
    );
  }

  // Método para decodificar el token
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Obtiene el payload del token
      const decodedPayload = atob(payload); // Decodifica el payload en base64
      console.log(payload);
      return JSON.parse(decodedPayload); // Convierte el payload a un objeto JSON
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }

  // Método para obtener el valor de IsAdmin desde el token
  getIsAdmin(storage: Storage | undefined): boolean {
    if(storage == undefined) {
      console.log("undefined storage");
      return false;
    } else {
      const token = storage.getItem(this.tokenKey);
      if (token) {
        console.log(token);
        const decodedToken = this.decodeToken(token);
        return decodedToken?.IsAdmin === 'true'; // Convierte el string a booleano
      }
      return false;
    }
  }

  // Método para guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para cerrar sesión
  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  //   this.router.navigate(['/login']);
  // }

  get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  getAuthToken(): TokenPayload | undefined {
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