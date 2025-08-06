import { useParams } from 'react-router-dom';

export default function ModulePage() {
  const { moduleId } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Módulo: {moduleId}</h1>
      <p>Página do módulo em desenvolvimento...</p>
    </div>
  );
}


