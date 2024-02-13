import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "../../../environments/environment.development";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class AuthService {
    constructor(private http: HttpClient) {}

    // helper method to get CurrentUserInterface reduces repetitive code
    getUser(response: AuthResponseInterface): CurrentUserInterface {
        return response.user
    }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users'
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(this.getUser))
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users/login'
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(this.getUser))
    }
}