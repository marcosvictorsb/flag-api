export class EnvironmentEntity {
  public readonly id?: number;
  public readonly type: string;
  public readonly key: string;
  public readonly id_project: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  public readonly deleted_at?: Date;

  constructor(params: {
    id?: number;
    type: string;
    key: string;
    id_project: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
  }) {
    const { id, type, key, id_project, created_at, updated_at, deleted_at } =
      params;
    this.id = id;
    this.type = type;
    this.key = key;
    this.id_project = id_project;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
