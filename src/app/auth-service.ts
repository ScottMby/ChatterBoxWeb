import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, user } from "@angular/fire/auth"
import { from, Observable, map, switchMap } from "rxjs";
import { UserInterface } from "./user.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http:HttpClient) { }

    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined); //If null user is not logged in. To get user details do currentUserSig?.<detail>

    register(email: string, username: string, password: string) : Observable<void>
    {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password
        ).then(response => 
            updateProfile(response.user, {displayName: username})
        );

        return from(promise);
    }

    registerApi()
    {
        console.log("registerApi() called");
        let authToken = this.getAuthToken()?.pipe(switchMap(token => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
            return this.http.post<any>('https://localhost:7078/user/register', null, { headers });
        }));
        
        authToken?.subscribe(
            (response) => {
                console.log('Success:', response);
            },
            (error) => {
                console.error('Error:', error);
            }
        );
    }

    login(email: string, password: string) : Observable<void>
    {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {})
        return from(promise);
    }

    getAuthToken() : Observable<string> | undefined //Check This Works
    {
        const authToken = this.firebaseAuth.currentUser?.getIdToken() ?? '';
        return from(authToken);
    }

}