import { initializeApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

class Firebase {
  public static instance: Firebase
  public readonly auth: Auth
  public readonly db: Firestore

  constructor(){
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
      projectId: process.env.NEXT_PUBLIC_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID
    })
    this.auth = getAuth()
    this.db = getFirestore()
  }

  static getInstance(){
    if(!Firebase.instance){
      Firebase.instance = new Firebase()
    }
    return Firebase.instance
  }

}

export const fb = Firebase.getInstance()