import Calendar from './Calendar/Calendar.jsx';
import './Appointment.css';
import appointmentdata from './data/appointments.json'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './assets/profile pics.jpg'

function Appointments() {
  const [selectedDate, setSelectedDate] = useState(() => {
  const today = new Date().toLocaleDateString("en-CA");
  return new Date(today);
});

  if (!selectedDate) return null;

  const formattedDate = selectedDate.toISOString().split('T')[0];

  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
  const formattedDate = selectedDate.toISOString().split('T')[0];
  const stored = JSON.parse(localStorage.getItem("appointments")) || {};
  const localAppointments = stored[formattedDate] || [];
  const staticAppointments = appointmentdata[formattedDate] || [];
  
  const combined = localAppointments.length > 0 ? localAppointments : staticAppointments;
  setDoctorFilter("All")
  setAppointments(combined);
}, [selectedDate]);

  const handleDelete = (indexToRemove) => {
  const dateKey = selectedDate.toISOString().split("T")[0];
  const existingData = JSON.parse(localStorage.getItem("appointments")) || {};
  const todayList =
    existingData[dateKey] ??
    appointmentdata[dateKey] ??
    [];
  const updatedDay = todayList.filter((_, idx) => idx !== indexToRemove);
  if (updatedDay.length) {
    existingData[dateKey] = updatedDay;
  } else {
    delete existingData[dateKey];
  }
  localStorage.setItem("appointments", JSON.stringify(existingData));
  setAppointments(updatedDay);
};
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");
  const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDate = selectedDate.toISOString().split("T")[0];
        const newAppointment = {patient,doctor,time: formatTime(time)};
        const existingData = JSON.parse(localStorage.getItem("appointments")) || {};
        const dayAppointments = existingData[formattedDate] || [];
        const updatedDay = [...dayAppointments, newAppointment];
        const updatedData = {
          ...existingData,
          [formattedDate]: updatedDay
        };
        localStorage.setItem("appointments", JSON.stringify(updatedData));
        setAppointments(updatedDay);
        setShowOverlay(false);
        setPatient("");
        setDoctor("");
        setTime("");
      };
      const formatTime = (t) => {
      const [h, m] = t.split(":");
      const hour = +h;
      const min = m.padStart(2, "0");
      const period = hour >= 12 ? "PM" : "AM";
      return `${hour % 12 || 12}:${min} ${period}`;
    };
  const [showOverlay, setShowOverlay] = useState(false);
  const [doctorFilter, setDoctorFilter] = useState("All");
  const allDoctors = Array.from(new Set(appointments.map(a => a.doctor)));
  const filteredAppointments =
    doctorFilter === "All"
      ? appointments
      : appointments.filter(a => a.doctor === doctorFilter);
  const navigate = useNavigate();
    const handleLogout = () => {
  navigate("/");
  };
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const saved = localStorage.getItem("theme");
      if (saved === "dark") setDarkMode(true);
    }, []);

    useEffect(() => {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);
    const handlePrevDate = () => {
    const prev = new Date(selectedDate);
      prev.setDate(prev.getDate() - 1);
      setSelectedDate(prev);
    };

    const handleNextDate = () => {
      const next = new Date(selectedDate);
      next.setDate(next.getDate() + 1);
      setSelectedDate(next);
    };
    const appointmentsForSelectedDate = appointmentdata[formattedDate] || [];


  return (
    <div className={`appointment-layout ${darkMode ? "dark" : "light"}`}>
      {/* Calendar Panel */}
      <div className="calendar-panel">
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <div className="profile">
          <div className='profile-setup'>
          <img src={Profile}/>
          <div className='profile-content'>

          <h5>StaffName</h5>
          <h5>Staff ID</h5>
          </div>
          </div>
          <hr className="profile-divider" />
          <div className='btns'>
          <button
            className={`dark-mode-toggle ${darkMode ? "dark" : ""}`}
            onClick={() => setDarkMode(prev => !prev)}
          ></button>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      {/* Appointment Panel */}
      <div className="panel-wrapper">
        <div className="mobile-view">
          <div className="date-nav">
            <button onClick={handlePrevDate}>&lt;</button>

            <input
              type="date"
              value={formattedDate}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="date-picker"
            />

            <button onClick={handleNextDate}>&gt;</button>
          </div>

          </div>
        <div className='name-filter'>
        <h2 className="panel-date-heading">{selectedDate.toDateString()}</h2>
        <div className="doctor-filter-dropdown">
            <select
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
            >
              <option value="All">By Doctor</option>
              {allDoctors.map((doc, i) => (
                <option key={i} value={doc}>{doc}</option>
              ))}
            </select>
        </div>
        </div>
        <div className="table-wrapper">
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0
            ?(
                <tr>
                  <td colSpan="4">No appointments scheduled for this date</td>
                </tr>
              ) : (
                filteredAppointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{appt.time}</td>
                    <td>{appt.doctor}</td>
                    <td>{appt.patient}</td>
                    <td><button className='delete-btn' onClick={()=>handleDelete(index)}><i className="bi bi-trash"></i></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className='buttons'>
          <button className='panel-btn'onClick={() => setShowOverlay(true)}><i className="bi bi-plus-square-fill"></i></button>
          {showOverlay && (
            <div className="overlay-form-wrapper">
              <div className="overlay-form">
                <h3>Add Appointment</h3>
                <form  onSubmit={handleSubmit}>
                  <select className='forms-content'value={patient} onChange={(e) => setPatient(e.target.value)} required>
                    <option value="">Select Patient</option>
                    <option value="Alice">Alice</option>
                    <option value="Bob">Bob</option>
                  </select>

                  <select className='forms-content' value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
                    <option value="">Select Doctor</option>
                    <option value="Dr. Verma">Dr. Verma</option>
                    <option value="Dr. Rahul">Dr. Banu Iyer</option>
                    <option value="Dr. Karthik R.">Dr. Karthik R.</option>
                  </select>

                  <input className='forms-content' type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

                  <div className="form-buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setShowOverlay(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}

export default Appointments;
