import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PROFILE_URL } from '../constants/urls';
import { IProfile } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  public getProfile(userId: string): Observable<IProfile> {
    return this.http.get(`${ PROFILE_URL }/${userId}.json`)
      .pipe(map(this.prepareProfileData));
  }

  private prepareProfileData(data: any): IProfile {
    const {
      id,
      summary,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    } = data;
    return {
      id,
      summary,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
    };
  }
}
