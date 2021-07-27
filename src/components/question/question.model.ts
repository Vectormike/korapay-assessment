import { User } from '../user/user.model';
import {Model, ModelObject} from 'objection'

export class Question extends Model {
  id!: number;
  author_id: number;
  title: string;
  text: string;
  answer_id: string;
  createdAt: Date;
  

  static tableName = 'questions' 
  static idColumn = 'id' 

//   static get relationMappings() {
//     return {
//         user: {
//             relation: Model.BelongsToOneRelation,
//             modelClass: User,
//             join: {
//                 from: 'questions.author_id',
//                 to: 'users.id'
//             }
//         }
//     }
//   }

  
}

export type QuestionShape = ModelObject<Question>