import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch, FiChevronRight } from 'react-icons/fi';

import { Container, Form, Content, Filter } from './style';

import JobCard from '../../components/JobCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import logo from '../../assets/logo.png';

import api from '../../services/api';

interface JobProps {
  id: number;
  title: string;
  name: string;
  experienceLevel: string;
  contract: string;
  salary: string;
  location: string;
  companySize: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [jobs, setJobs] = useState<JobProps[]>([]);

  function navigateToDetail(job: JobProps): void {
    localStorage.setItem('@Job-Finder:JobID', JSON.stringify(job.id));
    history.push(`/job-details/${job.id}`);
  }

  useEffect(() => {
    localStorage.removeItem('@Job-Finder:JobID');
    api.get('/jobs').then(response => {
      setJobs(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1>Várias oportunidades</h1>
        <Form>
          <div>
            <FiSearch size={25} />
          </div>
          <select name="dev-skills">
            <option value="front-end">Front End</option>
            <option value="back-end">Back End</option>
            <option value="dev-ops">Dev Ops</option>
          </select>
        </Form>
        <Content>
          <Filter>
            <div>
              <h2>Filtros</h2>
            </div>
            <div>
              <h2>Tipo de contrato</h2>
              <button type="button">CLT</button>
              <button type="button">PJ</button>
              <button type="button">Estágio</button>
            </div>
            <div>
              <h2>Nível de experiência</h2>
              <button type="button">Júnior</button>
              <button type="button">Pleno</button>
              <button type="button">Sênior</button>
            </div>
            <div>
              <h2>Tamanho da empresa</h2>
              <button type="button">Startup</button>
              <button type="button">Pequena ou Média empresa</button>
              <button type="button">Grande empresa</button>
              <button type="button">Multinacional</button>
            </div>
          </Filter>
          <div>
            {jobs.map(job => (
              <JobCard
                key={job.id}
                title={job.title}
                companySize={job.companySize}
                salary={job.salary}
                experienceLevel={job.experienceLevel}
                location={job.location}
                companyLogo={logo}
                companyName={job.name}
              >
                <button type="button" onClick={() => navigateToDetail(job)}>
                  Ver mais detalhes <FiChevronRight size={20} />
                </button>
              </JobCard>
            ))}
          </div>
        </Content>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
