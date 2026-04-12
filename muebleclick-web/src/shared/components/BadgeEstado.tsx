import { Badge } from '@/components/ui/badge';

const STATE_STYLES = {
  entregado: { bg: 'bg-[color:rgba(46,94,78,0.15)]', text: 'text-[color:var(--clr-primary)]', label: 'Entregado' },
  completada: { bg: 'bg-[color:rgba(46,94,78,0.15)]', text: 'text-[color:var(--clr-primary)]', label: 'Completada' },
  completado: { bg: 'bg-[color:rgba(46,94,78,0.15)]', text: 'text-[color:var(--clr-primary)]', label: 'Completado' },
  recibida: { bg: 'bg-[color:rgba(46,94,78,0.15)]', text: 'text-[color:var(--clr-primary)]', label: 'Recibida' },
  enviado: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Enviado' },
  en_transito: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En tránsito' },
  en_proceso: { bg: 'bg-[color:rgba(212,163,115,0.25)]', text: 'text-[color:var(--clr-accent)]', label: 'En proceso' },
  preparando: { bg: 'bg-[color:rgba(212,163,115,0.25)]', text: 'text-[color:var(--clr-accent)]', label: 'Preparando' },
  confirmado: { bg: 'bg-[color:rgba(163,177,138,0.3)]', text: 'text-[color:var(--clr-primary)]', label: 'Confirmado' },
  pendiente: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Pendiente' },
  cancelado: { bg: 'bg-red-100', text: 'text-red-600', label: 'Cancelado' },
  aprobada: { bg: 'bg-[color:rgba(163,177,138,0.3)]', text: 'text-[color:var(--clr-primary)]', label: 'Aprobada' },
};

export function BadgeEstado({ estado, className = '' }) {
  const style = STATE_STYLES[estado] || { bg: 'bg-gray-100', text: 'text-gray-600', label: estado };
  return (
    <Badge
      variant="secondary"
      className={`${style.bg} ${style.text} border-0 font-medium text-xs px-2.5 py-0.5 ${className}`}
      data-testid={`badge-estado-${estado}`}
    >
      {style.label}
    </Badge>
  );
}
