import { PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function EmptyState({ icon: Icon = PackageOpen, title = 'Sin resultados', description, actionLabel, actionHref }) {
  return (
    <div className="neo-card p-8 sm:p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[color:rgba(46,94,78,0.08)]">
        <Icon className="w-8 h-8 text-[color:var(--clr-primary)] opacity-60" />
      </div>
      <h3 className="text-lg font-display font-semibold text-[color:var(--fg)] mb-2">{title}</h3>
      {description && <p className="text-sm text-[color:var(--fg)] opacity-50 mb-6 max-w-sm mx-auto">{description}</p>}
      {actionLabel && actionHref && (
        <Button asChild className="rounded-xl bg-[var(--clr-primary)] text-[color:var(--bg)] hover:opacity-90 btn-transition">
          <Link to={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
