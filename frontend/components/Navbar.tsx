import Link from 'next/link';
import { WalletButton } from './WalletButton';

const links = [
  ['Dashboard', '/dashboard'],
  ['Verification', '/verification'],
  ['Proof of Life', '/proof-of-life'],
  ['Governance', '/governance'],
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-protocol-night/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          Proof<span className="text-protocol-cyan">OfLife</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-slate-300 hover:text-protocol-cyan">
              {label}
            </Link>
          ))}
        </div>
        <WalletButton />
      </nav>
    </header>
  );
}
