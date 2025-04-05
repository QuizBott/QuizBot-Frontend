import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/LogoQuiz.png';
function Navbar() {
	return (
		<nav className="navbar navbar-light bg-light px-3">
			<div className="container-fluid">
				<div className="d-flex align-items-center">
					<img
						src={Logo}
						alt="Logo"
						className="img-fluid me-2"
						style={{ width: '40px', height: '40px' }}
					/>
					<div className="navbar-brand d-flex flex-column">
						<span className="fw-bold fs-6">Quizzes</span>
						<span className="fw-bold text-muted fs-6">Professor</span>
					</div>
				</div>

				<div className="d-flex align-items-center ms-auto">
					<img
						src={Logo}
						alt="Logo"
						className="img-fluid me-2"
						style={{ width: '40px', height: '40px' }}
					/>
					<i className="bi bi-person-circle fs-4"></i>
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
