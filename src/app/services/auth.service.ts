import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async emailSignIn(email: string, password: string) {
    const credential = await this.fireAuth.signInWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user!);
  }

  async signOut() {
    await this.fireAuth.signOut();
  }

  private updateUserData(user: firebase.default.User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data: User = { 
      uid: user.uid, 
      ...(user.email && { email: user.email }),
      ...(user.displayName && { displayName: user.displayName }),
      ...(user.photoURL && { photoURL: user.photoURL }),
    };

    return userRef.set(data, { merge: true });
  }
}
