export class ProjectEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly description: string;
  public readonly id_user?: number;
  public readonly identifier?: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date | string;
  public readonly deleted_at?: Date;

  constructor(params: {
    id?: number;
    name: string;
    description: string;
    identifier?: string;
    id_user?: number;
    created_at?: Date;
    updated_at?: Date | string;
    deleted_at?: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.identifier = params.identifier;
    this.id_user = params.id_user;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.deleted_at = params.deleted_at;
  }
}
