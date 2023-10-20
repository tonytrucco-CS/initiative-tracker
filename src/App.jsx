import Header from './components/Header';
import Participant from './components/Participant';

const PARTS = [
  {
    name: 'Skiski',
    type: 'pc',
    initiative: 25,
    action: 'normal',
    status: 'alive',
    conditions: [],
  },
  {
    name: 'Red Dragon',
    type: 'foe',
    initiative: 15,
    action: 'normal',
    status: 'alive',
    conditions: [],
  },
  {
    name: 'Denithorne',
    type: 'ally',
    initiative: 31,
    action: 'normal',
    status: 'alive',
    conditions: ['frightened'],
  },
  {
    name: 'Spinning Blades',
    type: 'hazard',
    initiative: 4,
    action: 'normal',
    status: 'alive',
    conditions: [],
  },
];

function App() {
  return (
    <>
      <Header />
      {PARTS.map((part) => {
        const { name, type, initiative, action, status, conditions } = part;
        return (
          <Participant
            key={name}
            name={name}
            type={type}
            initiative={initiative}
            action={action}
            status={status}
            conditions={conditions}
          />
        );
      })}
    </>
  );
}

export default App;
