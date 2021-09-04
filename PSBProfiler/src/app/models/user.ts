import {Role} from './role';

export class User{
    id?: number;
    login?: string;
    password?: string;
    role?: Role;

    constructor();
    constructor(data?: any);
    constructor(data?: any) {
      this.id = data?.id; //auto
      this.login = data?.login;
      this.password = data?.password; //+
      this.role = data?.role; //auto
    }
  }