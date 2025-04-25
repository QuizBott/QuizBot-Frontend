import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

import './index.css';

import EditQuiz from './pages/EditQuiz';
import QuizStartedV1 from './pages/QuizStartedV1';
import QuizStartedV2 from './pages/QuizStartedV2';
import Homepage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileScreen from './pages/ProfilePage';
import CreateQuiz from './pages/CreateQuiz';

function App() {
	return (
		<Router>
			<Main />
		</Router>
	);
}

function Main() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/' || location.pathname === '/register';

	return (
		<>
			{!hideNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Homepage />} />
				<Route path="/profilescreen" element={<ProfileScreen />} />
				<Route path="/create" element={<CreateQuiz />} />
				<Route path="/edit" element={<EditQuiz />} />
				<Route path="/started" element={<QuizStartedV1 />} />
				<Route path="/started2" element={<QuizStartedV2 />} />
			</Routes>
		</>
	);
}

export default App;
