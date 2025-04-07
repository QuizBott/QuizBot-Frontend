function Question() {
  return (
    <>
      <div className="mb-3 p-3 border rounded bg-white shadow-sm">
        <h5>❔ Question 1</h5>
        <p>What is the correct way to define a function in Python?</p>
        {/* Choices */}
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a" >def myFunction(): ✅</label>
        </div>
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a">void myFunction():</label>
        </div>
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a">define myFunction():</label>
        </div>
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a">function myFunction():</label>
        </div>
        
      </div>

      {/* To Do: Сега засега нека останат hard-coded вака */}
      <div className="mb-3 p-3 border rounded bg-white shadow-sm">
        <h5>❔ Question 2</h5>
        <p>Which is the correct way to annotate a Repository in Java Spring?</p>
        {/* Choices */}
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a" >@Database </label>
        </div>
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a">@Repository ✅</label>
        </div>
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a">@PostgreSQL</label>
        </div>
        <div>
          <input type="checkbox" id="q1a" name="q1" style={{marginRight: '5px'}}/>
          <label htmlFor="q1a">@Data</label>
        </div>
        
      </div>
    </>
  );
}
export default Question;
