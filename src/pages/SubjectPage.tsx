import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProgressBar from "../components/ui/ProgressBar";

interface StudySession {
	id: string;
	date: string;
	duration: number; // in minutes
	topics: string[];
	notes?: string;
}

interface StudyMaterial {
	id: string;
	title: string;
	type: "video" | "document" | "exercise" | "quiz";
	completed: boolean;
	url?: string;
}

interface Subject {
	id: string;
	name: string;
	description: string;
	progress: number;
	totalHours: number;
	studiedHours: number;
	nextSession?: string;
	materials: StudyMaterial[];
	recentSessions: StudySession[];
	goals: string[];
}

// Mock data - in a real app, this would come from an API or context
const MOCK_SUBJECTS: Record<string, Subject> = {
	mathematics: {
		id: "mathematics",
		name: "Mathematics",
		description: "Advanced calculus, linear algebra, and mathematical analysis",
		progress: 75,
		totalHours: 120,
		studiedHours: 90,
		nextSession: "Tomorrow at 2:00 PM",
		goals: [
			"Master differential equations",
			"Complete linear algebra course",
			"Solve 50 practice problems",
		],
		materials: [
			{
				id: "1",
				title: "Calculus Fundamentals",
				type: "video",
				completed: true,
			},
			{
				id: "2",
				title: "Linear Algebra Textbook Ch. 1-5",
				type: "document",
				completed: true,
			},
			{
				id: "3",
				title: "Practice Problem Set A",
				type: "exercise",
				completed: false,
			},
			{
				id: "4",
				title: "Midterm Practice Quiz",
				type: "quiz",
				completed: false,
			},
		],
		recentSessions: [
			{
				id: "1",
				date: "2025-06-29",
				duration: 90,
				topics: ["Derivatives", "Chain Rule"],
				notes: "Good progress on chain rule applications",
			},
			{
				id: "2",
				date: "2025-06-27",
				duration: 60,
				topics: ["Integration techniques"],
			},
		],
	},
	physics: {
		id: "physics",
		name: "Physics",
		description:
			"Quantum mechanics, thermodynamics, and electromagnetic theory",
		progress: 60,
		totalHours: 100,
		studiedHours: 60,
		nextSession: "Wednesday at 10:00 AM",
		goals: [
			"Understand quantum superposition",
			"Master thermodynamic cycles",
			"Complete lab experiments",
		],
		materials: [
			{
				id: "1",
				title: "Quantum Mechanics Basics",
				type: "video",
				completed: true,
			},
			{
				id: "2",
				title: "Thermodynamics Lab Manual",
				type: "document",
				completed: false,
			},
			{
				id: "3",
				title: "Wave Function Exercises",
				type: "exercise",
				completed: true,
			},
			{ id: "4", title: "Quantum Quiz #1", type: "quiz", completed: false },
		],
		recentSessions: [
			{
				id: "1",
				date: "2025-06-28",
				duration: 120,
				topics: ["Quantum States", "Wave Functions"],
				notes: "Complex but fascinating concepts",
			},
		],
	},
	chemistry: {
		id: "chemistry",
		name: "Chemistry",
		description:
			"Organic chemistry, molecular structures, and reaction mechanisms",
		progress: 45,
		totalHours: 80,
		studiedHours: 36,
		nextSession: "Friday at 3:00 PM",
		goals: [
			"Memorize functional groups",
			"Understand reaction mechanisms",
			"Complete synthesis problems",
		],
		materials: [
			{
				id: "1",
				title: "Organic Chemistry Intro",
				type: "video",
				completed: true,
			},
			{
				id: "2",
				title: "Molecular Structure Guide",
				type: "document",
				completed: false,
			},
			{
				id: "3",
				title: "Synthesis Practice",
				type: "exercise",
				completed: false,
			},
			{
				id: "4",
				title: "Functional Groups Quiz",
				type: "quiz",
				completed: true,
			},
		],
		recentSessions: [],
	},
};

const materialTypeIcons = {
	video: "🎥",
	document: "📄",
	exercise: "✏️",
	quiz: "📝",
};

export default function SubjectPage() {
	const { subjectId } = useParams<{ subjectId: string }>();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<
		"overview" | "materials" | "sessions" | "goals"
	>("overview");

	const subject = subjectId ? MOCK_SUBJECTS[subjectId.toLowerCase()] : null;

	if (!subject) {
		return (
			<div className="text-center py-12">
				<h1 className="text-2xl font-bold text-over-dark mb-4">
					Subject Not Found
				</h1>
				<p className="text-neutral mb-6">
					The subject you're looking for doesn't exist.
				</p>
				<button
					type="button"
					onClick={() => navigate("/subjects")}
					className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
				>
					Back to Subjects
				</button>
			</div>
		);
	}

	const completedMaterials = subject.materials.filter(
		(m) => m.completed,
	).length;
	const totalMaterials = subject.materials.length;

	return (
		<div className="space-y-8">
			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative"
			>
				<button
					type="button"
					onClick={() => navigate("/subjects")}
					className="text-neutral hover:text-white mb-4 flex items-center space-x-2 transition-colors"
				>
					<span>←</span>
					<span>Back to Subjects</span>
				</button>

				<div className="bg-dark-muted/30 rounded-xl p-6 border border-dark-muted">
					<h1 className="text-3xl font-bold text-over-dark mb-2">
						{subject.name}
					</h1>
					<p className="text-neutral mb-4">{subject.description}</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-400">
								{subject.progress}%
							</div>
							<div className="text-sm text-neutral">Progress</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-400">
								{subject.studiedHours}h
							</div>
							<div className="text-sm text-neutral">Studied</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-400">
								{completedMaterials}/{totalMaterials}
							</div>
							<div className="text-sm text-neutral">Materials</div>
						</div>
					</div>

					<ProgressBar
						progress={subject.progress}
						className="mb-4"
						color="blue"
					/>

					{subject.nextSession && (
						<div className="text-sm text-neutral">
							<span className="font-medium">Next session:</span>{" "}
							{subject.nextSession}
						</div>
					)}
				</div>
			</motion.header>

			{/* Tabs */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<div className="flex space-x-1 bg-dark-muted/30 p-1 rounded-lg mb-6">
					{[
						{ id: "overview", label: "Overview" },
						{ id: "materials", label: "Materials" },
						{ id: "sessions", label: "Sessions" },
						{ id: "goals", label: "Goals" },
					].map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id as typeof activeTab)}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
								activeTab === tab.id
									? "bg-dark-muted text-white"
									: "text-neutral hover:text-white hover:bg-dark-muted/50"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</motion.div>

			{/* Tab Content */}
			<motion.div
				key={activeTab}
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4 }}
			>
				{activeTab === "overview" && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="bg-dark-muted/30 rounded-lg p-6">
							<h3 className="text-xl font-semibold text-over-dark mb-4">
								Study Progress
							</h3>
							<div className="space-y-4">
								<div>
									<div className="flex justify-between text-sm mb-1">
										<span className="text-neutral">Overall Progress</span>
										<span className="text-white">{subject.progress}%</span>
									</div>
									<ProgressBar progress={subject.progress} color="blue" />
								</div>
								<div>
									<div className="flex justify-between text-sm mb-1">
										<span className="text-neutral">Materials Completed</span>
										<span className="text-white">
											{Math.round((completedMaterials / totalMaterials) * 100)}%
										</span>
									</div>
									<ProgressBar
										progress={(completedMaterials / totalMaterials) * 100}
										color="green"
									/>
								</div>
								<div>
									<div className="flex justify-between text-sm mb-1">
										<span className="text-neutral">Time Progress</span>
										<span className="text-white">
											{Math.round(
												(subject.studiedHours / subject.totalHours) * 100,
											)}
											%
										</span>
									</div>
									<ProgressBar
										progress={(subject.studiedHours / subject.totalHours) * 100}
										color="purple"
									/>
								</div>
							</div>
						</div>

						<div className="bg-dark-muted/30 rounded-lg p-6">
							<h3 className="text-xl font-semibold text-over-dark mb-4">
								Quick Stats
							</h3>
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-neutral">Total Study Time</span>
									<span className="text-white">
										{subject.studiedHours} / {subject.totalHours} hours
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-neutral">Materials Progress</span>
									<span className="text-white">
										{completedMaterials} / {totalMaterials}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-neutral">Recent Sessions</span>
									<span className="text-white">
										{subject.recentSessions.length}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-neutral">Goals Set</span>
									<span className="text-white">{subject.goals.length}</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeTab === "materials" && (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold text-over-dark">
								Study Materials
							</h3>
							<button
								type="button"
								className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
							>
								Add Material
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{subject.materials.map((material, index) => (
								<motion.div
									key={material.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className={`bg-dark-muted/30 rounded-lg p-4 border transition-all hover:bg-dark-muted/50 ${
										material.completed
											? "border-green-500/30"
											: "border-neutral/20"
									}`}
								>
									<div className="flex items-start justify-between">
										<div className="flex items-start space-x-3">
											<span className="text-2xl">
												{materialTypeIcons[material.type]}
											</span>
											<div>
												<h4 className="font-medium text-over-dark">
													{material.title}
												</h4>
												<p className="text-sm text-neutral capitalize">
													{material.type}
												</p>
											</div>
										</div>
										<div
											className={`w-4 h-4 rounded-full ${
												material.completed
													? "bg-green-500"
													: "border-2 border-neutral/50"
											}`}
										/>
									</div>
									{material.completed && (
										<div className="mt-2 text-xs text-green-400">
											✓ Completed
										</div>
									)}
								</motion.div>
							))}
						</div>
					</div>
				)}

				{activeTab === "sessions" && (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold text-over-dark">
								Study Sessions
							</h3>
							<button
								type="button"
								className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
							>
								Start Session
							</button>
						</div>
						{subject.recentSessions.length > 0 ? (
							<div className="space-y-4">
								{subject.recentSessions.map((session, index) => (
									<motion.div
										key={session.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4, delay: index * 0.1 }}
										className="bg-dark-muted/30 rounded-lg p-4"
									>
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-medium text-over-dark">
												{new Date(session.date).toLocaleDateString("en-US", {
													weekday: "long",
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</h4>
											<span className="text-sm text-neutral">
												{session.duration} minutes
											</span>
										</div>
										<div className="mb-2">
											<span className="text-sm text-neutral">Topics: </span>
											<span className="text-sm text-white">
												{session.topics.join(", ")}
											</span>
										</div>
										{session.notes && (
											<div className="text-sm text-neutral italic">
												"{session.notes}"
											</div>
										)}
									</motion.div>
								))}
							</div>
						) : (
							<div className="text-center py-8">
								<p className="text-neutral">No study sessions recorded yet.</p>
								<button
									type="button"
									className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
								>
									Start Your First Session
								</button>
							</div>
						)}
					</div>
				)}

				{activeTab === "goals" && (
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold text-over-dark">
								Study Goals
							</h3>
							<button
								type="button"
								className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
							>
								Add Goal
							</button>
						</div>
						<div className="space-y-3">
							{subject.goals.map((goal, index) => (
								<motion.div
									key={`goal-${goal.slice(0, 20)}-${index}`}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className="flex items-center space-x-3 bg-dark-muted/30 rounded-lg p-4"
								>
									<div className="w-4 h-4 border-2 border-neutral/50 rounded" />
									<span className="text-over-dark">{goal}</span>
								</motion.div>
							))}
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
}
