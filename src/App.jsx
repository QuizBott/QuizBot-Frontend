import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import CreateQuiz from './components/CreateQuiz';

import './index.css';
import EditQuiz from './components/EditQuiz';

function App() {
	return (
		<>
			<Navbar />
			<CreateQuiz /> 
			<EditQuiz />
		</>
	);
}

export default App;
