import {Power} from './power';

export interface Hero {
  id: number;
  name: string;
  powers?: Power[];
}
