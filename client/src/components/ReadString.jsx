import { useEffect, useState } from "react";

const ReadString = ({ drizzle, drizzleState }) => {
  const [dataKey, setDataKey] = useState(null);
  const [myString, setMyString] = useState({});

  useEffect(() => {
    if (drizzleState && drizzle) {

      const { MyStringStore } = drizzleState.contracts;
      const contract = drizzle.contracts.MyStringStore;

      // let drizzle know we want to watch the `myString` method
      const myDataKey = contract.methods["myString"].cacheCall();
      console.log('myDataKey :>> ', myDataKey);

      // save the `dataKey` to local component state for later reference
      setDataKey(myDataKey);

      const dataString = MyStringStore.myString[myDataKey];
      setMyString(dataString);
    }
  }, [drizzle, drizzleState]);


  return (
    <>
      <div>ReadString Component</div>
      <p>My stored string: {myString && myString.value}</p>
    </>
  );
}

export default ReadString
