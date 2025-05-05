import React, { useState, useEffect } from 'react';
import Logo from '../assets/LogoQuiz.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Programming', 'Science', 'History'];

const Homepage = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [activePage, setActivePage] = useState(0);
	const [quizzes, setQuizzes] = useState([]);
	const [totalPages, setTotalPages] = useState(1);
	const quizzesPerPage = 6;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				const categoryParam = selectedCategory === 'All' ? '' : selectedCategory;
				const response = await api.get('/quiz', {
					params: {
						page: activePage,
						size: quizzesPerPage,
						category: categoryParam,
					},
				});
				setQuizzes(response.data.content);
				setTotalPages(response.data.totalPages);
			} catch (error) {
				console.error('Error fetching quizzes:', error);
			}
		};

		fetchQuizzes();
	}, [selectedCategory, activePage]);

	const handlePageClick = (pageNum) => setActivePage(pageNum);

	const handleCardClick = (id) => {
		navigate(`/quiz/${id}/intro`);
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center fw-bold mb-4">Available Quizzes</h2>

			<ul className="nav nav-pills justify-content-center mb-4">
				{categories.map((cat) => (
					<li className="nav-item" key={cat}>
						<button
							className={`nav-link mx-2 ${selectedCategory === cat
								? 'bg-dark text-white fw-bold'
								: 'btn-outline-dark'
								}`}
							onClick={() => {
								setSelectedCategory(cat);
								setActivePage(0);
							}}
						>
							{cat}
						</button>
					</li>
				))}
			</ul>

			<div className="row">
				{quizzes && quizzes.length > 0 ? (
					quizzes.map((quiz, index) => (
						<div className="col-md-4 mb-4" key={quiz.id || `quiz-${index}`} onClick={() => handleCardClick(quiz.id)}
							style={{ cursor: 'pointer' }}>
							<div className="card shadow-sm h-100">
								<img
									src={quiz.image ? `data:image/png;base64,${quiz.image}` : Logo}
									alt="Quiz"
									className="card-img-top"
									style={{ objectFit: 'cover', height: '180px' }}
								/>
								<div className="card-body">
									<h5 className="card-title">{quiz.name}</h5>
									<div className="mt-2">
										{quiz.tags.map((tag, tagIndex) => (
											<span key={tagIndex} style={{
												backgroundColor: "#e0e0e0",
												padding: "0.2rem 0.6rem",
												borderRadius: "12px",
												fontSize: "0.85rem",
												display: "inline-flex",
												alignItems: "center"
											}}>
												{"#"}{tag}
											</span>
										))}
									</div>
									<div style={{ width: "100%", textAlign: "right" }}>
										<p className='mb-0' style={{ fontWeight: "600" }}>{quiz.numberOfQuestions} {" Questions"}</p>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="col-12 text-center">
						<p className="text-muted">No quizzes available for this category.</p>
					</div>
				)}
			</div>

			<nav className="d-flex justify-content-center">
				<ul className="pagination">
					<li className={`page-item ${activePage === 0 ? 'disabled' : ''}`}>
						<button
							className="page-link border-0 bg-white"
							onClick={() => setActivePage((prev) => Math.max(prev - 1, 0))}
						>
							&laquo;
						</button>
					</li>

					{Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
						<li key={pageNum} className={`page-item`}>
							<button
								className={`page-link border-0 ${pageNum === activePage ? 'bg-dark text-white fw-bold' : 'bg-white'}`}
								onClick={() => handlePageClick(pageNum)}
							>
								{pageNum + 1}
							</button>
						</li>
					))}

					<li className={`page-item ${activePage === totalPages - 1 ? 'disabled' : ''}`}>
						<button
							className="page-link border-0 bg-white"
							onClick={() => setActivePage((prev) => Math.min(prev + 1, totalPages - 1))}
						>
							&raquo;
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Homepage;
