import React, { useState } from 'react';
import Logo from '../assets/LogoQuiz.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const quizzes = Array.from({ length: 15 }, (_, i) => ({
	id: i + 1,
	title: `Quiz Title ${i + 1}`,
	description: 'Short description of the quiz content.',
	category: ['Math', 'Science', 'Programming'][i % 3],
}));

const categories = ['All', 'Math', 'Science', 'Programming'];

const Homepage = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [activePage, setActivePage] = useState(1);
	const quizzesPerPage = 6;

	const filteredQuizzes =
		selectedCategory === 'All'
			? quizzes
			: quizzes.filter((quiz) => quiz.category === selectedCategory);

	const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);
	const startIdx = (activePage - 1) * quizzesPerPage;
	const currentQuizzes = filteredQuizzes.slice(
		startIdx,
		startIdx + quizzesPerPage
	);

	const handlePageClick = (pageNum) => {
		setActivePage(pageNum);
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center fw-bold mb-4">Available Quizzes</h2>

			{/* Category Tabs */}
			<ul className="nav nav-pills justify-content-center mb-4">
				{categories.map((cat) => (
					<li className="nav-item" key={cat}>
						<button
							className={`nav-link mx-2 ${
								selectedCategory === cat
									? 'bg-dark text-white fw-bold'
									: 'btn-outline-dark'
							}`}
							onClick={() => {
								setSelectedCategory(cat);
								setActivePage(1); // reset to page 1 when category changes
							}}
						>
							{cat}
						</button>
					</li>
				))}
			</ul>

			{/* Quiz Cards */}
			<div className="row">
				{currentQuizzes.map((quiz) => (
					<div className="col-md-4 mb-4" key={quiz.id}>
						<div className="card shadow-sm h-100">
							<img
								src={Logo}
								className="card-img-top"
								alt="Quiz"
								style={{ objectFit: 'cover', height: '180px' }}
							/>
							<div className="card-body">
								<h5 className="card-title">{quiz.title}</h5>
								<p className="card-text text-muted">{quiz.description}</p>
								<span className="badge bg-secondary">{quiz.category}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination with arrows */}
			{/* Pagination with arrows */}
			<nav className="d-flex justify-content-center">
				<ul className="pagination">
					{/* Previous Arrow */}
					<li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
						<button
							className="page-link border-0 bg-white"
							onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
						>
							&laquo;
						</button>
					</li>

					{/* Page Numbers */}
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(
						(pageNum) => (
							<li key={pageNum} className={`page-item`}>
								<button
									className={`page-link border-0 ${
										pageNum === activePage
											? 'bg-dark text-white fw-bold'
											: 'bg-white'
									}`}
									onClick={() => handlePageClick(pageNum)}
								>
									{pageNum}
								</button>
							</li>
						)
					)}

					{/* Next Arrow */}
					<li
						className={`page-item ${
							activePage === totalPages ? 'disabled' : ''
						}`}
					>
						<button
							className="page-link border-0 bg-white"
							onClick={() =>
								setActivePage((prev) => Math.min(prev + 1, totalPages))
							}
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
