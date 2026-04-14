import styles from './PulsePoint.module.scss';

interface PulsePointProps {
	id: string;
	x: number;
	y: number;
	active: boolean;
	onClick: () => void;
	label: string;
}

export default function PulsePoint({ id, x, y, active, onClick, label }: PulsePointProps) {
	return (
		<button
			className={[
				styles.pulsePoint,
				active ? styles.pulsePointActive : styles.pulsePointInactive
			].join(' ')}
			style={{ left: `${x}%`, top: `${y}%` }}
			onClick={onClick}
			aria-label={label}
		>
			<svg viewBox='0 0 24 24' fill='none'>
				<defs>
					<radialGradient id={`rg-outer-${id}`} cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(12 12) rotate(90) scale(12)'>
						<stop stopColor='var(--icon-fill)' stopOpacity='0' />
						<stop offset='0.9' stopColor='var(--icon-fill)' />
					</radialGradient>
					<radialGradient id={`rg-inner-${id}`} cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(12 12) rotate(90) scale(8)'>
						<stop stopColor='var(--icon-fill)' stopOpacity='0' />
						<stop offset='0.9' stopColor='var(--icon-fill)' />
					</radialGradient>
				</defs>
				<circle opacity='0.2' cx='12' cy='12' r='12' fill={`url(#rg-outer-${id})`} />
				<circle opacity='0.2' cx='12' cy='12' r='8' fill={`url(#rg-inner-${id})`} />
				<circle cx='12' cy='12' r='4' fill='var(--icon-fill)' />
			</svg>
		</button>
	);
}
