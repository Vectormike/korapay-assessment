import { User } from '../user/user.model';
import {Model, ModelObject} from 'objection'

export class Vote extends Model {
  id!: number;
  answerId: number;
  userId: number;
  vote: number;
  createdAt: Date;
  

  static tableName = 'votes' 
  static idColumn = 'id' 
  
}

export type VoteShape = ModelObject<Vote>