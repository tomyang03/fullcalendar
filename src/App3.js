import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function App() {
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showCalendar, setShowCalendar] = useState(true);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [input, setInput] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);

  // Create an event when user clicks on the calendar
  const handleDateClick = (info) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      title: "My Event",
      // start time for event is the mouse click location on the calendar
      start: info.dateStr,
      // Give a default end time by adding 1 hour to start
      end: info.date.setHours(info.date.getHours() + 1),
    });
  };

  /* Open Modal and hide the calendar when an event is clicked, store information in state variables */
  const handleEventClick = (info) => {
    setDay(
      info.event.start.toLocaleString("en-us", {
        weekday: "long",
      })
    );
    setStart(
      info.event.start.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    setEnd(
      info.event.end.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    openModal();
    //setShowCalendar(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowCalendar(true);
    setIsChecked1(false);
    setIsChecked2(false);
    setInput("");
  };

  const toggleCheckbox1 = () => {
    setIsChecked1(!isChecked1);
  };

  const toggleCheckbox2 = () => {
    setIsChecked2(!isChecked2);
  };

  // fire axios post request once form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    let eventData = {
      selectedDay: day,
      selectedStartTime: start,
      selectedEndTime: end,
      item1: isChecked1,
      item2: isChecked2,
      item3: input,
    };
    console.log(eventData);
    setIsOpen(false);
    //setShowCalendar(true);
    setIsChecked1(false);
    setIsChecked2(false);
    setInput("");
    // axios post request
    try {
      const response = await axios.post("/myserver.endpoint", eventData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showCalendar && (
        <FullCalendar
          ref={calendarRef}
          plugins={[interactionPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          editable={true}
          droppable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={[]}
        />
      )}
      <Modal isOpen={modalIsOpen}>
        <div>
          {" "}
          <button
            onClick={closeModal}
            style={{ margin: "-20px", float: "right" }}
          >
            close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="checkbox"
              defaultChecked={isChecked1}
              onChange={toggleCheckbox1}
            />
            <label style={{ margin: "10px" }}>Item1</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={isChecked2}
              onChange={toggleCheckbox2}
            />
            <label style={{ margin: "10px" }}>Item2</label>
          </div>
          <div>
            <input value={input} onInput={(e) => setInput(e.target.value)} />
            <label style={{ margin: "10px" }}>Item3</label>
          </div>
          <input
            type="submit"
            value="Submit"
            style={{ marginTop: "20px", marginLeft: "5px" }}
          />
        </form>
      </Modal>
    </>
  );
}
