import { IUser } from 'src/app/core/interfaces';

export interface IAuthState {
    error: boolean;
    user: IUser;
    loading: boolean;
}
