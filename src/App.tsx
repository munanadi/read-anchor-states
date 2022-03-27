import { Keypair } from "@solana/web3.js";
import React, { ReactEventHandler, useEffect, useMemo, useState } from "react";

import { CyclosCore, IDL } from "./cyclos-core";

import * as anchor from "@project-serum/anchor";
import { Body } from "./Body";

function App() {
  const accountTypes = IDL.accounts.map((acc) => acc.name);

  const wallet = new anchor.Wallet(Keypair.generate());
  const connection = new anchor.web3.Connection(
    // "https://api.mainnet-beta.solana.com",
    "https://ssc-dao.genesysgo.net",
    {
      commitment: "processed",
    }
  );

  const provider = new anchor.Provider(connection, wallet, {
    skipPreflight: false,
  });

  const cyclosCore = new anchor.Program<CyclosCore>(
    IDL,
    "cysPXAjehMpVKUapzbMCCnpFxUFFryEWEaLgnb9NrR8",
    provider
  );

  const [states, setStates] = useState<any>();
  const [selectedState, setSelectedState] = useState<any>(accountTypes[0]);

  const cacheStates = useMemo(() => new Map(), []);

  useEffect(() => {
    async function fetchStates() {
      const index = IDL.accounts.findIndex((a) => a.name == selectedState);

      const accClient = new anchor.AccountClient(
        IDL,
        IDL.accounts[index],
        cyclosCore.programId,
        provider
      );

      const data = await accClient.all();

      cacheStates.set(selectedState, data);
      setStates(data);
    }

    const cachedState = cacheStates.get(selectedState);
    console.log(cachedState, " cache");
    if (!cachedState) {
      fetchStates();
    }
    setStates(cachedState);
  }, [selectedState]);

  const userSelectState = (e: any) => {
    setSelectedState(e.target.nodeValue);
  };

  return (
    <div className="App">
      <h1>States</h1>
      <Body
        userSelectState={userSelectState}
        states={states}
        selectedState={selectedState}
      />
    </div>
  );
}

export default App;
