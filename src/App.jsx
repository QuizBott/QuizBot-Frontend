import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/LogoQuiz.png';
import Navbar from './components/Navbar';
import CreateQuiz from './components/CreateQuiz';
import './index.css';

function App() {
	return (
		<>
			<Navbar />
			<CreateQuiz />
		</>
	);
}

export default App;
