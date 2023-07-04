import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col, ListGroup, Table } from "react-bootstrap";

const teams = {
  teamA: ["a", "b", "c"],
  teamB: [1, 2, 3],
};

let currentTaskIndex = 0;


function App() {
  const [selectedTeam, setSelectedTeam] = useState(Object.keys(teams)[0]);
  const [task, setTask] = useState("");
  const [taskQueue, setTaskQueue] = useState((()=>{
    return teams[Object.keys(teams)[0]].map(item=>{
      return {
            member :item,
            task :""
      }
    })
    
  }));

  const handleTeamChange = (e) => {
    currentTaskIndex = 0
    setSelectedTeam(e.target.value);
    setTaskQueue(()=>{
      return teams[e.target.value].map(item=>{
        return {
              member :item,
              task :""
        }
      })
    })
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleNewTask = () => {
    const updatedTaskQueue = [...taskQueue]; // Create a copy of the task queue
    const nextMemberIndex = taskQueue.findIndex((item) => item.task === "");
  
    if (nextMemberIndex !== -1) {
      updatedTaskQueue[nextMemberIndex].task = task;
      setTaskQueue(updatedTaskQueue);
      setTask("");
    } else {
      updatedTaskQueue[currentTaskIndex].task = task;
      setTaskQueue(updatedTaskQueue);
      setTask("");
      currentTaskIndex = currentTaskIndex + 1
      if(currentTaskIndex >= teams[selectedTeam].length){
        currentTaskIndex == 0
      }
    }
  };
  

  
  

  return (
    <Container
      style={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Row className="mt-2 pt-2 ">
        <Col>
          <TeamSelector
            teams={teams}
            selectedTeam={selectedTeam}
            onChange={handleTeamChange}
          />
        </Col>
        <Col>
          <TaskInput value={task} onChange={handleTaskChange} />
        </Col>
      </Row>
      <Button variant="primary" className="p-2 m-2" onClick={handleNewTask}>
        Add Task
      </Button>
      <TaskListTable taskQueue={taskQueue} />
    </Container>
  );
}

export default App;

function TeamSelector({ teams, selectedTeam, onChange }) {
  return (
    <Form.Select  className="bg-warning text-black" value={selectedTeam} onChange={onChange}>
      {Object.keys(teams).map((team) => (
        <option key={team} value={team}>
          {team}
        </option>
      ))}
    </Form.Select>
  );
}

function TaskInput({ value, onChange }) {
  return (
    <Form.Control
      type="text"
      className=" text-black"
      placeholder="Enter your task"
      value={value}
      onChange={onChange}
    />
  );
}

function TaskListTable({ taskQueue }) {
  return (
    <Container>
      <h4 style={{textAlign:'left'}}>Task List</h4>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Member</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {taskQueue.map((item) => (
          <tr key={item.member}>
            <td>{item.member}</td>
            <td>{item.task}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
}
