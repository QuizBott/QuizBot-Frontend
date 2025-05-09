import React, { useState, useEffect } from 'react';
import logoQuiz from '../assets/LogoQuiz.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import api from "../api";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


const quizzes = [
	{ id: 1, title: 'Quiz #1', subtitle: 'SQL Essentials', score: '14/15' },
	{ id: 2, title: 'Quiz #2', subtitle: 'C# Beginners', score: '15/15' },
	{ id: 3, title: 'Quiz #3', subtitle: 'JavaScript Basics', score: '9/15' },
];

const ProfileScreen = () => {
	const [activeTab, setActiveTab] = useState('quizResults');
	const location = useLocation()
	const user = location.state?.user;

	const exportQuizToPDF = (quiz) => {

		const response = api.get(`/quiz/${quiz.id}`)

		console.log(response.data)


		const doc = new jsPDF();

		// doc.setFontSize(18);
		// doc.text('Quiz Result', 14, 22);

		// doc.setFontSize(12);
		// doc.text(`Title: ${quiz.title}`, 14, 40);
		// doc.text(`Subtitle: ${quiz.subtitle}`, 14, 50);
		// doc.text(`Score: ${quiz.score}`, 14, 60);

		// // Optional: add image (logoQuiz must be base64 or public path)
		// // doc.addImage(logoQuiz, 'PNG', 150, 15, 40, 40);

		// doc.save(`${quiz.title}_result.pdf`);
	};

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
								<button
									className="btn btn-dark btn-sm"
									onClick={() => exportQuizToPDF(quiz)}
								>
									Export PDF
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);

	useEffect(() => {


		const fetchData = async () => {
			try {
				const response = await api.get(`/quiz/quizAttempted`)
				console.log(response.data)

			} catch (err) {
				console.error(err);
			}
		};

		fetchData();

	}, []);

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
				<h2 className="fw-bold">{user.username}</h2>
				<p className="text-light mb-0">
					Student at Faculty of Computer Science & Engineering
				</p>
			</div>

			<div className=" d-flex justify-content-center mb-4">
				<button
					className={`btn mx-2 ${activeTab === 'average' ? 'bg-dark text-white' : 'btn-outline-dark'
						}`}
					onClick={() => setActiveTab('average')}
				>
					Average Score
				</button>
				<button
					className={`btn mx-2 ${activeTab === 'quizResults'
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
		</>
	);
};

export default ProfileScreen;
