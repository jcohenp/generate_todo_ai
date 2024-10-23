import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Calendar from './pages/Calendar';
import MyTasks from './pages/MyTasks';
import Workspace from './pages/Workspace';
import CreateList from './pages/CreateList';  // Import the new CreateList component
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme } from './theme';
import styled from 'styled-components';

// Main layout container for the sidebar and content
const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;  // Make content area take up remaining space
  padding: 2rem;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Navbar />
          <Content>
            <Routes>
              <Route path="/" element={<MyTasks />} />
              <Route path="/search" element={<Search />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/create-list" element={<CreateList />} /> {/* Add route for CreateList */}
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
