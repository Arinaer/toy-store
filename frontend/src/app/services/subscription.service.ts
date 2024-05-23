import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../const";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http : HttpClient) { }

  createSubscription(email:string) {
    return this.http.post(BASE_URL+'/subscriptions', {email})
  }
}
