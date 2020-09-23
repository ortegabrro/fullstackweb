import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {


  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.find(leader => leader.id === id)).pipe(delay(2000));
  }

  getLeaderFeatured(): Observable<Leader> {
    return of(LEADERS.find(leader => leader.featured === true)).pipe(delay(2000));
  }
}
