import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project';
function App() {
  const [loading, set_loading] = useState(true);
  const [jobs, set_jobs] = useState([]);
  const [value, set_value] = useState(0);

  const fetch_jobs = async () => {
    const response = await fetch(url);
    const new_jobs = await response.json();

    set_jobs(new_jobs);
    set_loading(false);
  }

  useEffect(() => {
    fetch_jobs()
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    )
  }

  const { company, dates, duties, title } = jobs[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn */}
        <div className="btn-container">
          {
            jobs.map((item, index) => (
              <button
                key={item.id}
                className={`job-btn ${index === value && 'active-btn'}`}
                onClick={() => set_value(index)}
              >
                {item.company}
              </button>
            ))
          }
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => (
            <div key={index} className="job-desc">
              <FaAngleDoubleRight className="job-icon" />
              <p>{duty}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  )
}

export default App
