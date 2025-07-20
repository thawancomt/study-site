import { openDB } from "idb";
import type { NoteEntity, newNoteEntity } from "../entities/notes.entity";
import type { INoteRepository } from "../interfaces/notes.repository";

const STORE_NAME = "notes";

export class ConcreteNoteRepository implements INoteRepository {
    dbPromisse = openDB(STORE_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        },
    });

    async create(newNote: newNoteEntity): Promise<NoteEntity> {
        const db = await this.dbPromisse;

        const id = await db.add(STORE_NAME, newNote);

        return {
            ...newNote,
            id: Number(id.toString()),
        };
    }

    async findById(_id: string): Promise<NoteEntity | null> {
        throw new Error("Method not implemented.");
    }

    async update(
        _id: string,
        _note: Partial<NoteEntity>,
    ): Promise<NoteEntity | null> {
        throw new Error("Method not implemented.");
    }

    async delete(_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
