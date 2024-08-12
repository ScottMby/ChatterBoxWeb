import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, user } from "@angular/fire/auth"
import { from, Observable } from "rxjs";
import { UserInterface } from "./user.interface";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
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

    login(email: string, password: string) : Observable<void>
    {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {})
        return from(promise);
    }

}