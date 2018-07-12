export class BaseModel {
  public id: number;
}

export const Gender = {
  FEMALE: 0,
  MALE: 1,
  OTHER: 2,
};

export const Operator = [
  {id: 1, name: '='},
  {id: 2, name: '>'},
  {id: 3, name: '<'},
  {id: 4, name: '>='},
  {id: 5, name: '<='},
];
