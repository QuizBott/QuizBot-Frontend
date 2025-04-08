import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CreateQuiz from './components/CreateQuiz';

import './index.css';
import EditQuiz from './components/EditQuiz';
import QuizStartedV1 from './components/QuizStartedV1';
import Homepage from './components/HomePage';

function App() {
	return (
		<>
			<Navbar />
			<Homepage />
		</>
	);
}

export default App;
