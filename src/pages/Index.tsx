
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard as this is now the main entry point
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
