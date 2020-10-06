import { IProfile } from 'src/app/core/interfaces';

export interface IProfileState {
  error: boolean;
  profile: IProfile;
  loading: boolean;
}
