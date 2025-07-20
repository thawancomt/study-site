export interface IBaseRepository<CreateType, EntityType> {
    create(entity: CreateType): Promise<EntityType>;
    findById(id: string): Promise<EntityType | null>;
    update(id: string, entity: Partial<EntityType>): Promise<EntityType | null>;
    delete(id: string): Promise<boolean>;
    getByName(name: string);
}
