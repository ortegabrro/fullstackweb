import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  // }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.find((promotion) => (promotion.id === id))).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.find((promotion) => promotion.featured)).pipe(delay(2000));
    // return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  }
}
