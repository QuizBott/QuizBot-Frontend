import 'bootstrap/dist/css/bootstrap.min.css';
function CreateQuiz() {
	return (
		<div className="container mt-5 ">
			<div className="text-center mb-4">
				<h1 className="fw-bold">Generate quiz with QuizBot</h1>
			</div>

			<div className="row">
				<div className="col-md-6">
					<label className="form-label">Quiz name:</label>
					<input
						type="text"
						className="form-control"
						placeholder="Name of the quiz"
					/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Quiz description:</label>
					<textarea
						className="form-control"
						placeholder="Description of the quiz"
					></textarea>
				</div>
			</div>

			<div className="row mt-3">
				<div className="col-md-6">
					<label className="form-label">Choose and image for the quiz:</label>
					<div className="w-100">
						<label
							htmlFor="docUpload"
							className="btn btn-outline-dark w-100 text-start"
						>
							Upload Files
						</label>
						<input
							type="file"
							id="docUpload"
							multiple
							style={{ display: 'none' }}
							onChange={(e) => {
								const selected = Array.from(e.target.files)
									.map((f) => f.name)
									.join(', ');
								alert(`You selected: ${selected}`);
							}}
						/>
					</div>
				</div>
				<div className="col-md-6">
					<label className="form-label">
						Choose documents needed for the subject of the quiz:
					</label>
					<div className="w-100">
						<label
							htmlFor="docUpload"
							className="btn btn-outline-dark w-100 text-start"
						>
							Upload Files
						</label>
						<input
							type="file"
							id="docUpload"
							multiple
							style={{ display: 'none' }}
							onChange={(e) => {
								const selected = Array.from(e.target.files)
									.map((f) => f.name)
									.join(', ');
								alert(`You selected: ${selected}`);
							}}
						/>
					</div>
				</div>
			</div>

			<div className="row mt-3">
				<div className="col-md-6">
					<label className="form-label">
						Choose number of single-answer questions:
					</label>
					<input
						type="number"
						className="form-control"
						min="1"
						max="20"
						placeholder="1-20"
					/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Choose a category for the quiz:</label>
					<select className="form-select">
						<option>Programming</option>
						<option>Math</option>
						<option>Science</option>
						<option>History</option>
					</select>
				</div>
			</div>

			<div className="mt-3 d-flex justify-content-center row">
				<div className="d-flex justify-content-center">
					<label className="form-label">Send a prompt to the model</label>
				</div>

				<textarea
					className="form-control"
					style={{ width: '50vh', height: '100px' }}
					placeholder="Generate easy questions for my students from the documents I sent you..."
				></textarea>
			</div>

			<div className="text-center mt-4">
				<button className="btn btn-dark">Generate quiz</button>
			</div>
		</div>
	);
}
export default CreateQuiz;
