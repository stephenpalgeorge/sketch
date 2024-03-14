export abstract class SceneObject {
    id: string;
    constructor(id: string) {
        this.id = id;
    }

    abstract draw(): void;
}
