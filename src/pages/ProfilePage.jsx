import React, { useState } from 'react';
import logoQuiz from '../assets/LogoQuiz.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const quizzes = [
	{ id: 1, title: 'Quiz #1', subtitle: 'SQL Essentials', score: '14/15' },
	{ id: 2, title: 'Quiz #2', subtitle: 'C# Beginners', score: '15/15' },
	{ id: 3, title: 'Quiz #3', subtitle: 'JavaScript Basics', score: '9/15' },
];

const ProfileScreen = () => {
	const [activeTab, setActiveTab] = useState('quizResults');
	const location = useLocation()
	const user = location.state?.user;
	const renderQuizResults = () => (
		<div className="row px-4">
			{quizzes.map((quiz) => (
				<div key={quiz.id} className="col-md-4 mb-4">
					<div className="card h-100 shadow-sm">
						<img
							src={logoQuiz}
							alt="Quiz"
							className="card-img-top img-fluid"
							style={{
								height: '150px',
								objectFit: 'contain',
								background: '#f0f0f0',
							}}
						/>
						<div className="card-body d-flex flex-column justify-content-between">
							<div>
								<h5 className="card-title fw-bold">{quiz.title}</h5>
								<p className="text-muted mb-2">{quiz.subtitle}</p>
							</div>
							<div className="d-flex justify-content-between align-items-center">
								<span className="fw-bold">{quiz.score}</span>
								<button className="btn btn-dark btn-sm">Review Score</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);

	const renderAverageScore = () => (
		<div className="text-center p-4">
			<h4 className="mb-3">📊 Your Quiz Statistics</h4>
			<p>
				Number of quizzes taken: <strong>{quizzes.length}</strong>
			</p>
			<p>
				Average Score: <strong>12.7/15</strong>
			</p>
			<p>
				Best Score: <strong>{quizzes[1].score}</strong> in {quizzes[1].subtitle}
			</p>
		</div>
	);

	const renderEditProfile = () => (
		<div className="p-4">
			<h4 className="mb-3 text-center">📝 Edit Profile</h4>
			<form className="mx-auto" style={{ maxWidth: '500px' }}>
				<div className="mb-3">
					<label className="form-label">Full Name</label>
					<input
						type="text"
						className="form-control"
						defaultValue="Vasil Strezov"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						defaultValue="vasil@example.com"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">University</label>
					<input
						type="text"
						className="form-control"
						defaultValue="Faculty of Computer Science & Engineering"
					/>
				</div>
				<button type="submit" className="btn btn-dark w-100">
					Save Changes
				</button>
			</form>
		</div>
	);

	return (
		<>
			<div
				className="w-100 text-center text-white mb-4"
				style={{
					backgroundColor: '#6c757d',
					padding: '3rem 1rem',
				}}
			>
				<img
					src={user?.profileImage ? user.profileImage : logoQuiz}
					className="rounded-circle mb-3"
					alt="profile"
					width={120}
					height={120}
					style={{ border: '4px solid white' }}
				/>
				<h2 className="fw-bold">Vasil Strezov</h2>
				<p className="text-light mb-0">
					Student at Faculty of Computer Science & Engineering
				</p>
			</div>

			<div className=" d-flex justify-content-center mb-4">
				<button
					className={`btn mx-2 ${
						activeTab === 'edit' ? 'bg-dark text-white' : 'btn-outline-dark'
					}`}
					onClick={() => setActiveTab('edit')}
				>
					Edit Profile
				</button>
				<button
					className={`btn mx-2 ${
						activeTab === 'average' ? 'bg-dark text-white' : 'btn-outline-dark'
					}`}
					onClick={() => setActiveTab('average')}
				>
					Average Score
				</button>
				<button
					className={`btn mx-2 ${
						activeTab === 'quizResults'
							? 'bg-dark text-white'
							: 'btn-outline-dark'
					}`}
					onClick={() => setActiveTab('quizResults')}
				>
					Quiz Results
				</button>
			</div>

			{activeTab === 'quizResults' && renderQuizResults()}
			{activeTab === 'average' && renderAverageScore()}
			{activeTab === 'edit' && renderEditProfile()}
		</>
	);
};

export default ProfileScreen;
