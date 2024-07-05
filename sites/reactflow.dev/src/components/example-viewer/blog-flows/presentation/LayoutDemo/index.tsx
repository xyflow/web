import Flow from './Flow';

// add more slides and create different layouts by
// linking slides in different ways.
const slides = {
  '1': { right: '2' },
  '2': { left: '1', up: '3', right: '4' },
  '3': { down: '2' },
  '4': { left: '2' },
};

export default function App() {
  return <Flow slides={slides} />;
}
