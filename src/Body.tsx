import { IDL } from "./cyclos-core";

export const Body = ({ userSelectState, states, selectedState }: any) => {
  const accountTypes = IDL.accounts.map((acc) => acc.name);

  const dropdown = (
    <select defaultValue={accountTypes[0]} onChange={userSelectState}>
      {accountTypes.map((accType) => (
        <option key={accType} value={accType}>
          {accType}
        </option>
      ))}
    </select>
  );

  return (
    <>
      {dropdown}

      {states && <h2>Fetched States for {selectedState}</h2> && (
        <div>{JSON.stringify(states, null, 2)}</div>
      )}
    </>
  );
};
