import { useState } from "react";
import type { NewSubject } from "../ORM/subjects/entities/subjects.entity";
import { SubjectsService } from "../ORM/subjects/implementations/subjects.concrete.service";
import MongoDBSubjectRepo from "../ORM/subjects/implementations/subjectsMongoDB.concrete.repository";

export default function CreateSubjectPage() {
    const subjectRepo = new MongoDBSubjectRepo();
    const subjectService = new SubjectsService(subjectRepo);

    const [newSubject, setNewSubject] = useState<NewSubject>({
        description: "",
        name: "",
    });

    const handleSave = () => {
        subjectService.create({
            name: newSubject.name,
            description: newSubject.description,
        });
    };

    return (
        <form action="" className="border border-white text-white p-2">
            <fieldset>
                <legend>Information</legend>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) =>
                        setNewSubject((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />

                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    onChange={(e) =>
                        setNewSubject((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
            </fieldset>
            <button type="button" onClick={handleSave}>
                Save
            </button>
        </form>
    );
}
