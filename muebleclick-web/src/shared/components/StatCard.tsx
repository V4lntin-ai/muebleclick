import { FadeIn } from './FadeIn';

export function StatCard({ icon: Icon, label, value, trend, trendUp, delay = 0 }) {
  return (
    <FadeIn delay={delay}>
      <div className="neo-card p-5 sm:p-6 card-hover" data-testid={`stat-card-${label?.toLowerCase().replace(/\s+/g,'-')}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-[color:var(--fg)] opacity-60 mb-1">{label}</p>
            <p className="text-2xl sm:text-3xl font-bold font-display tabular-nums text-[color:var(--fg)]">{value}</p>
            {trend && (
              <p className={`text-xs mt-2 font-medium ${
                trendUp ? 'text-[color:var(--clr-primary)]' : 'text-red-500'
              }`}>
                {trendUp ? '\u2191' : '\u2193'} {trend}
              </p>
            )}
          </div>
          {Icon && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-[color:rgba(46,94,78,0.10)]">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[color:var(--clr-primary)]" />
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
