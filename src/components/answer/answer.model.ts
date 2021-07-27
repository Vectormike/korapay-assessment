import {Model, ModelObject} from 'objection'

export class Answer extends Model {
  id!: number;
  author_id: number;
  vote_id: number;
  text: string;
  question_id: number;
  createdAt!: Date;
  updatedAt!: Date;

  

  
  static tableName = 'answers' // database table name
  static idColumn = 'id' // id column name

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

    
//   $formatJson(json) {
//     json = super.$formatJson(json);
//     delete json.password;
//     delete json.createAt
//     delete json.updatedAt
//     delete json.role;
//     return json;
//   }

}

export type AnswerShape = ModelObject<Answer>