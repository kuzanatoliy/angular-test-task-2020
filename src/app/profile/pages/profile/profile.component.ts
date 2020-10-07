import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { IProfileState } from 'src/app/store/interfaces/IProfileState';
import { getProfileStart } from 'src/app/store/actions/profile.actions';

import { IProfile } from 'src/app/core/interfaces/IProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profile: IProfile;
  private profileState: Observable<IProfileState>;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ profile: IProfileState }>
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(getProfileStart({ id }));
      this.profileState = this.store.pipe(select('profile'));
      this.subscription = this.profileState.subscribe((state: IProfileState) => {
        const { profile } = state;
        this.profile = profile;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
