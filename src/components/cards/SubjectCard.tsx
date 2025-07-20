type SubjectCardProps = {
	subjectName: string;
};

export default function SubjectCard({ subjectName }: SubjectCardProps) {
	return (
		<div className="bg-dark-muted hover:bg-dark-muted/80 p-2 rounded-lg ">
			<h2 className="text-over-muted">{subjectName}</h2>
		</div>
	);
}
