import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

import { CyclosCore, IDL } from "./cyclos-core";

import * as anchor from "@project-serum/anchor";
import { AccountNamespace } from "@project-serum/anchor";
const { PublicKey } = anchor.web3;

export const Body = () => {
  const [accountTypes, setAccountTypes] = useState(
    IDL.accounts.map((acc) => acc.name)
  );

  console.log(accountTypes);

  const wallet = new anchor.Wallet(Keypair.generate());
  const connection = new anchor.web3.Connection(
    "https://api.mainnet-beta.solana.com",
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

  useEffect(() => {
    async function fetchStates() {
      const data = Promise.all(
        Object.keys(cyclosCore.account).map(async (accountType) => {
          console.log(`Fetching for ${accountType}`);

          return "";

          // console.log(poolStates);
        })
      );

      const res = await data;

      console.log(res);
    }
    fetchStates();
  }, []);

  return accountTypes.map((a) => <h2 key={a}>{a}</h2>);
};
