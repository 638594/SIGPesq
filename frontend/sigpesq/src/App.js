import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/header/Header';
import NoMatch from './pages/noMatch/NoMatch';
import PostProject from './pages/project/PostProject';
import AllProjects from './pages/allProjects/AllProjects';
import UpdateProject from './pages/project/UpdateProject';
import AllParticipants from './pages/participant/AllParticipants';
import PostParticipant from './pages/participant/PostParticipant';
import UpdateParticipant from './pages/participant/UpdateParticipant';
import ProjectTeam from './pages/project/ProjectTeam';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/projects' element={<AllProjects/>}/>
        <Route path='/project' element={<PostProject/>}/>
        <Route path='/projects/:codProjeto' element={<UpdateProject/>}/>
        <Route path='/projects/:codProjeto/team' element={<ProjectTeam/>}/>
        <Route path='/participants' element={<AllParticipants/>}/>
        <Route path='/participant' element={<PostParticipant/>}/>
        <Route path='/participant/:cpf' element={<UpdateParticipant/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </>
  );
}

export default App;
