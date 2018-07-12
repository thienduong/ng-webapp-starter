export class UserModel {
  public Id: number;
  public Name?: string;

  constructor(user?) {
    user = user || {};
    this.Id = user.Id;
    this.Name = user.Name;
  }
}
export class ListUserModel {
  ProductList: UserModel[];
}
