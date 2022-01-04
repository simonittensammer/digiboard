import {Pinboard} from './pinboard';

export class User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  pinboards: Array<Pinboard>;
}
