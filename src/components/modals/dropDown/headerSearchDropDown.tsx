import type { NoteEntity } from "../../../ORM/notes/entities/notes.entity";
import NoteListItemCard from "../../cards/NoteListItemCard";

interface dropDownProps {
	onType: () => void;
	data?: NoteEntity[];
	query?: string;
}

const mockupData: NoteEntity[] = [
	{
		id: "1",
		title: "Project Kickoff",
		note: "Today we kicked off the new platform project. Defined milestones and assigned owners.",
		createdAt: new Date("2024-04-10T09:15:00Z"),
		updatedAt: new Date("2024-04-10T11:30:00Z"),
		subjects: ["Planning", "Team"],
		aiResume: "Overview of project kickoff, milestones, and owners.",
	},
	{
		id: "2",
		title: "Design Review",
		note: "Reviewed initial wireframes for the dashboard. Feedback: improve contrast and simplify navigation.",
		createdAt: new Date("2024-04-12T14:00:00Z"),
		updatedAt: new Date("2024-04-12T16:45:00Z"),
		subjects: ["Design", "UX"],
		aiResume:
			"Summary of wireframe feedback: contrast issues and navigation simplification.",
	},
	{
		id: "3",
		title: "Sprint Retrospective",
		note: "Sprint 5 wrap-up: Completed 8 stories, 2 bugs carried over. Action items: refine backlog grooming.",
		createdAt: new Date("2024-04-15T10:30:00Z"),
		updatedAt: new Date("2024-04-15T12:00:00Z"),
		subjects: ["Agile", "Sprint"],
		aiResume:
			"Sprint 5 recap with completed stories and next steps for backlog grooming.",
	},
	{
		id: "4",
		title: "Client Feedback",
		note: "Client reported issue with login flow on mobile. They see a 500 error after entering credentials.",
		createdAt: new Date("2024-04-18T08:20:00Z"),
		updatedAt: new Date("2024-04-18T09:10:00Z"),
		subjects: ["Bug", "Client"],
		aiResume: "Client can't log in on mobile; receives HTTP 500 error.",
	},
	{
		id: "5",
		title: "Research Notes",
		note: "Investigate using WebAssembly for heavy computations to improve frontend performance.",
		createdAt: new Date("2024-04-20T13:05:00Z"),
		updatedAt: new Date("2024-04-20T15:30:00Z"),
		subjects: ["R&D", "Performance"],
		aiResume: "Exploration of WebAssembly to boost frontend compute tasks.",
	},
];

function HeaderSearchDropDown({
	data = mockupData,
	query = "",
}: dropDownProps) {
	return (
		<div className="w-full rounded-2xl border border-white/10 bg-foreground/50 p-4 text-white shadow-2xl backdrop-blur-lg ">
			<ul className="space-y-2">
				{data
					.filter(
						(note) =>
							note.note.toLowerCase().includes(query.toLowerCase()) ||
							note.aiResume?.toLowerCase().includes(query.toLowerCase()) ||
							note.title.toLowerCase().includes(query.toLowerCase()),
					)
					.map((note) => (
						<NoteListItemCard note={note} key={note.id} />
					))}
			</ul>
		</div>
	);
}

export default HeaderSearchDropDown;
