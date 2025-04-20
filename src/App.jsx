import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import './index.css';
import EditQuiz from './components/EditQuiz';
import QuizStartedV1 from './components/QuizStartedV1';
import Homepage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import ProfileScreen from './components/ProfilePage';
import CreateQuiz from './components/CreateQuiz';
function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path='/home' element={<Homepage />} />
				<Route path="/profilescreen" element={<ProfileScreen />} />
				<Route path="/create" element={<CreateQuiz />} />
				<Route path="/edit" element={<EditQuiz />} />
				<Route path="/started" element={<QuizStartedV1 />} />
			</Routes>
		</Router>
	);
}

export default App;
