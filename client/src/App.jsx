import { useEffect, useState } from 'react';
import ReadString from './components/ReadString';
import SetString from './components/SetString';

function App({ drizzle }) {
  const [loading, setLoading] = useState(true);
  const [drizzleState, setDrizzleState] = useState(null);


  useEffect(() => {
    const unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        setLoading(false);
        setDrizzleState(drizzleState);
      }
    })

    return () => unsubscribe();
  }, [drizzle]);

  return (
    loading ?
      <div>
        Loading Drizzle...
      </div>
      :
      <>
        <ReadString
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
        <SetString
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
      </>
  );
}

export default App;
