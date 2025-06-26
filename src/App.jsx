import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import LoadingSpinner from './components/LoadingSpinner';
import BlogTools from './components/BlogTools';
import WritingTool from './components/WritingTool';
import OthelloGame from './components/OthelloGame';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'blog-tools':
        return <BlogTools />;
      case 'writing-tool':
        return <WritingTool />;
      case 'othello':
        return <OthelloGame />;
      case 'home':
      default:
        return (
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Blog />
            <Contact />
          </main>
        );
    }
  };

  return (
    <div className="App">
      <LoadingSpinner />
      <ScrollProgress />
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;