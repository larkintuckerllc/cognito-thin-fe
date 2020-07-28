import React, { useCallback } from 'react';
import { getExample } from '../api/example';


function Authenticated() {
    const handleClick = useCallback(async () => {
      try {
        await getExample();
      } catch (err) {
        console.log(err);
      }
    }, []);
  return <button onClick={handleClick}>example</button>;
}

export default Authenticated;
