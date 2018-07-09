export class UserInfo {
  public id: number;
  public name?: string;
  public email?: string;
  public nickname?: string;
  public picture?: string;
  public phoneNumber?: string;
  public role?: string;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.email = undefined;
    this.phoneNumber = undefined;
    this.nickname = undefined;
    this.picture = undefined;
    this.role = undefined;
  }
}
