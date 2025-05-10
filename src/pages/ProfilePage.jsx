import React, { useState, useEffect } from 'react';
import logoQuiz from '../assets/LogoQuiz.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import api from "../api";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ProfileScreen = () => {
	const [activeTab, setActiveTab] = useState('quizResults');
	const [quizzes, setQuizzes] = useState([]);
	const [quizzesTaken, setQuizzesTaken] = useState(0);
	const [averageScore, setAverageScore] = useState(0);
	const [averageMaxScore, setAverageMaxScore] = useState(0);
	const [bestScoreQuiz, setBestScoreQuiz] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`/quiz/quizAttempted`);
				const data = response.data;

				setQuizzes(data.quizAttemptDTOList || []);
				setQuizzesTaken(data.quizzesTaken || 0);
				setAverageScore(data.quizzesAvg || 0);
				setAverageMaxScore(data.quizzesMaxAvg || 0);
				setBestScoreQuiz(data.quizBestScore || null);
			} catch (err) {
				console.error(err);
			}
		};

		async function fetchUser() {
			try {
				const response = await api.get("/user");
				setUser(response.data);
			} catch (error) {
				console.error("Failed to fetch user:", error);
			}
		}

		fetchUser();
		fetchData();
	}, []);

	const exportQuizToPDF = async (quiz) => {
		try {
			const response = await api.get(`/quiz/${quiz.id}`);

			const doc = new jsPDF();
			doc.setFontSize(18);
			doc.text('Quiz Result', 14, 22);

			doc.setFontSize(12);
			doc.text(`Title: ${quiz.quizName}`, 14, 40);
			doc.text(`Tags: ${quiz.quizTags}`, 14, 50);
			doc.text(`Score: ${quiz.points}/${quiz.maxPoints}`, 14, 60);

			doc.save(`${quiz.quizName}_result.pdf`);
		} catch (err) {
			console.error("Failed to export quiz:", err);
		}
	};

	const renderQuizResults = () => (
		<div className="px-4">
			<div className="row">
				{quizzes.map((quiz, index) => (
					<div key={`${quiz.id}-${index}`} className="col-md-4 mb-4">
						<div className="card h-100 shadow-sm">
							<img
								src={`data:image/png;base64,${quiz.image}`}
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
									<h5 className="card-title fw-bold">{quiz.quizName}</h5>
									<p className="text-muted mb-2">{quiz.quizTags}</p>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<span className="fw-bold">{quiz.points}/{quiz.maxPoints}</span>
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
		</div>
	);


	const renderAverageScore = () => (
		<div className="text-center p-4">
			<h4 className="mb-3">📊 Your Quiz Statistics</h4>
			<p>Number of quizzes taken: <strong>{quizzesTaken}</strong></p>
			<p>Average Score: <strong>{averageScore.toFixed(1)}/{averageMaxScore.toFixed(1)}</strong></p>
			{bestScoreQuiz && (
				<p>
					Best Score: <strong>{bestScoreQuiz.points}/{bestScoreQuiz.maxPoints}</strong> in{' '}
					{bestScoreQuiz.quizName}
				</p>
			)}
		</div>
	);

	return (
		<>
			<div
				className="w-100 text-center text-white mb-4"
				style={{ backgroundColor: '#6c757d', padding: '3rem 1rem' }}
			>
				<img
					src={user?.profileImage ? user.profileImage : logoQuiz}
					className="rounded-circle mb-3"
					alt="profile"
					width={120}
					height={120}
					style={{ border: '4px solid white' }}
				/>
				<h2 className="fw-bold">{user?.username}</h2>
				<p className="text-light mb-0">
					Student at Faculty of Computer Science & Engineering
				</p>
			</div>

			<div className="d-flex justify-content-center mb-4">
				<button
					className={`btn mx-2 ${activeTab === 'average' ? 'bg-dark text-white' : 'btn-outline-dark'}`}
					onClick={() => setActiveTab('average')}
				>
					Average Score
				</button>
				<button
					className={`btn mx-2 ${activeTab === 'quizResults' ? 'bg-dark text-white' : 'btn-outline-dark'}`}
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
