export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

/** 内存存储（v0.5.0 会换成 @nofault/sqlx） */
const store = new Map<number, User>();
let seq = 0;
