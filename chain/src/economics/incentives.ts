import type { BlockIncentiveSummary, LifeTransaction } from '../types.js';

export interface IncentivePolicy {
  readonly proposerBasisPoints: number;
  readonly validatorBasisPoints: number;
  readonly publicGoodsBasisPoints: number;
  readonly slashingReserveBasisPoints: number;
}

export const defaultIncentivePolicy: IncentivePolicy = {
  proposerBasisPoints: 2500,
  validatorBasisPoints: 5500,
  publicGoodsBasisPoints: 1500,
  slashingReserveBasisPoints: 500,
};

export function calculateBlockIncentives(transactions: readonly LifeTransaction[], policy = defaultIncentivePolicy): BlockIncentiveSummary {
  const totalFees = transactions.reduce((sum, transaction) => sum + transaction.fee, 0n);
  return {
    proposerReward: allocate(totalFees, policy.proposerBasisPoints),
    validatorRewardPool: allocate(totalFees, policy.validatorBasisPoints),
    publicGoodsTreasury: allocate(totalFees, policy.publicGoodsBasisPoints),
    slashingReserve: allocate(totalFees, policy.slashingReserveBasisPoints),
  };
}

function allocate(amount: bigint, basisPoints: number): bigint {
  return (amount * BigInt(basisPoints)) / 10_000n;
}
