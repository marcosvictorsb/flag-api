export class FeatureFlagEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly description: string;
  public readonly type: string;
  public readonly status: string;
  public readonly rollout?: number;
  public readonly variants?: Array<{ name: string; weight: number }>;
  public readonly targets?: Array<number | string>;
  public readonly id_user?: number;
  public readonly id_project?: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  public readonly deleted_at?: Date;

  constructor(params: {
    id?: number;
    name: string;
    description: string;
    type: string;
    status: string;
    rollout?: number;
    variants?: Array<{ name: string; weight: number }>;
    targets?: Array<number | string>;
    id_user?: number;
    id_project?: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.type = params.type;
    this.status = params.status;
    this.rollout = params.rollout;
    this.variants = params.variants;
    this.targets = params.targets;
    this.id_user = params.id_user;
    this.id_project = params.id_project;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.deleted_at = params.deleted_at;
  }
}
