export function VerificationBadge({ verified }: { verified: boolean }) {
  return (
    <span className={verified ? 'rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300' : 'rounded-full bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300'}>
      {verified ? 'Verified human' : 'Verification pending'}
    </span>
  );
}
