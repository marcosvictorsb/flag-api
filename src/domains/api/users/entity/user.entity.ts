export class UserEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly email: string;
  public readonly password_hash: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  public readonly deleted_at?: Date;

  constructor(params: {
    id?: number;
    name: string;
    email: string;
    password_hash: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.password_hash = params.password_hash;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.deleted_at = params.deleted_at;
  }

  public isPasswordValid(
    password: string,
    encryption: { compare: (plain: string, hashed: string) => boolean }
  ): boolean {
    return encryption.compare(password, this.password_hash);
  }
}
