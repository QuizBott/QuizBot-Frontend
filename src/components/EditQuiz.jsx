import "bootstrap/dist/css/bootstrap.min.css";

function EditQuiz() {
  return (
    <div className="container mt-5 ">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Quiz Name</h1>
      </div>

      <div className="row">
        {/* Left column */}
        <div className="col-md-7">
          <div className="p-3 border rounded bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Multiple choice</span>
              <span>
                Points{" "}
                <span className="badge bg-white text-dark border">15</span>
              </span>
            </div>

            <div className="mb-3 p-3 border rounded bg-white shadow-sm">
              <h5>❔ Question 1</h5>
              <p>What is the correct way to define a function in Python?</p>
              {/* Choices */}
              <ul>
                <li>def myFunction(): ✅</li>
                <li>void myFunction():</li>
                <li>define myFunction():</li>
                <li>function myFunction():</li>
              </ul>
            </div>

            {/* To Do: Мислам дека овие можеме да ги направиме како посебна компонента(Question) за да биде посреден кодот */}
            <div className="mb-3 p-3 border rounded bg-white shadow-sm">
              <h5>❔ Question 2</h5>
              <p>Which is the correct way to annotate a Repository in Java Spring?</p>
              {/* Choices */}
              <ul>
                <li>@Database</li>
                <li>@Repository ✅</li>
                <li>@PostgreSQL</li>
                <li>@Data</li>
              </ul>
            </div>
            <button className="btn btn-light border d-flex align-items-center">
              ➕ Add answers
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="col-md-5">
          {/* This is for the image */}
          <div className="p-4 bg-light rounded shadow-sm">
            <div
              className="mb-4 bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
              style={{ height: "120px", borderRadius: "8px" }}
            >
              <span className="text-muted">Image placeholder</span>
            </div>
          </div>

          {/* Category */}
          <div className="mb-3" d-flex align-items-center>
            <label className="form-label fw-semibold me-2 mb-0">
              Category:
            </label>
            <select className="form-select" style={{ width: "150px" }}>
              <option>Programming</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Description:</label>
            <textarea
              className="form-control"
              rows="5"
              defaultValue={
                "Covering fundamental concepts like functions, data types and loops, this quiz is perfect for beginners and intermediate programmers looking to refresh their python skills. Can you get a perfect score? 🚀🔥"
              }
              style={{ fontSize: "12px" }}
            />
          </div>

          <div className="text-center">
            <button className="btn btn-dark px-5 rounder-pill mb-5">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditQuiz;
