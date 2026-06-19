import type { Account, Address, GetProgramAccountsApi, Rpc } from "@solana/kit";

<<<<<<< HEAD
import { consolidateTickArray, TickArray } from "../state";
=======
import type { Account, Address, GetProgramAccountsApi, GetProgramAccountsMemcmpFilter, Rpc } from "@solana/kit";
import { getAddressEncoder, getBase58Decoder, getI32Encoder } from "@solana/kit";

import { FUSIONAMM_PROGRAM_ADDRESS, getTickArrayDecoder, TICK_ARRAY_DISCRIMINATOR, TickArray } from "../generated";

import { fetchDecodedProgramAccounts } from "./utils";
>>>>>>> upstream/main

import type { FixedTickArrayFilter } from "./fixedTickArray";
import {
  fetchAllFixedTickArrayWithFilter,
  fixedTickArrayFusionPoolFilter,
  fixedTickArrayStartTickIndexFilter,
} from "./fixedTickArray";
import type { SparseTickArrayFilter } from "./sparseTickArray";
import {
  fetchAllSparseTickArrayWithFilter,
  sparseTickArrayFusionPoolFilter,
  sparseTickArrayStartTickIndexFilter,
} from "./sparseTickArray";

export type TickArrayFilter = {
  fixed: FixedTickArrayFilter;
  sparse: SparseTickArrayFilter;
  readonly __kind: unique symbol;
};

export function tickArrayStartTickIndexFilter(startTickIndex: number): TickArrayFilter {
  return {
    fixed: fixedTickArrayStartTickIndexFilter(startTickIndex),
    sparse: sparseTickArrayStartTickIndexFilter(startTickIndex),
  } as TickArrayFilter;
}

export function tickArrayFusionPoolFilter(address: Address): TickArrayFilter {
  return {
<<<<<<< HEAD
    fixed: fixedTickArrayFusionPoolFilter(address),
    sparse: sparseTickArrayFusionPoolFilter(address),
=======
    memcmp: {
      offset: 12n,
      bytes: getBase58Decoder().decode(getAddressEncoder().encode(address)),
      encoding: "base58",
    },
>>>>>>> upstream/main
  } as TickArrayFilter;
}

export async function fetchAllTickArrayWithFilter(
  rpc: Rpc<GetProgramAccountsApi>,
  ...filters: TickArrayFilter[]
): Promise<Account<TickArray>[]> {
  const fixedAccounts = await fetchAllFixedTickArrayWithFilter(rpc, ...filters.map(filter => filter.fixed));
  const sparseAccounts = await fetchAllSparseTickArrayWithFilter(rpc, ...filters.map(filter => filter.sparse));

  const tickArrays: Account<TickArray>[] = [];

  for (const account of fixedAccounts) {
    tickArrays.push(consolidateTickArray(account));
  }
  for (const account of sparseAccounts) {
    tickArrays.push(consolidateTickArray(account));
  }

  return tickArrays;
}
