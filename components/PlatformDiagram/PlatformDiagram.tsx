'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './PlatformDiagram.module.scss';
import PulsePoint from '@/components/PulsePoint/PulsePoint';
import TextHeader from '../TextHeader/TextHeader';
import { USE_CASES } from '@/data/useCases';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SCALE = 1.18;

export default function PlatformDiagram() {
	const [active, setActive] = useState(0);
	const [fading, setFading] = useState(false);

	const wrapRef = useRef<HTMLDivElement>(null);
	const pulseWrapRef = useRef<HTMLDivElement>(null);
	const areaRef = useRef<HTMLDivElement>(null);

	const buildTransform = useCallback(
		(pctX: number, pctY: number, s: number): string => {
			if (!areaRef.current) return `translate(0px, 0px) scale(${s})`;
			const W = areaRef.current.offsetWidth;
			const H = areaRef.current.offsetHeight;
			const dx = ((pctX / 100) * W * (1 - s)) / s;
			const dy = ((pctY / 100) * H * (1 - s)) / s;
			return `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${s})`;
		},
		[]
	);

	const switchTo = useCallback(
		(index: number, instant = false) => {
			const next =
				((index % USE_CASES.length) + USE_CASES.length) % USE_CASES.length;
			const uc = USE_CASES[next];

			const t = buildTransform(uc.dot.x, uc.dot.y, SCALE);
			if (wrapRef.current) wrapRef.current.style.transform = t;
			if (pulseWrapRef.current) pulseWrapRef.current.style.transform = t;

			if (instant) {
				setActive(next);
				return;
			}

			setFading(true);
			setTimeout(() => {
				setActive(next);
				setFading(false);
			}, 180);
		},
		[buildTransform]
	);

	useEffect(() => {
		switchTo(0, true);
	}, [switchTo]);

	const current = USE_CASES[active];

	return (
		<section className={styles.PlatformDiagram}>
			<TextHeader />
			<div className={styles.mountain} ref={areaRef}>
				<div className={styles.mountainWrapper} ref={wrapRef}>
					<Image
						src='/images/mountain.png'
						alt='Mountain'
						fill
						className={styles.mountainImg}
						priority
					/>
				</div>
				<div className={styles.fadeBottom} aria-hidden='true' />
				<div className={styles.pulseWrapper} ref={pulseWrapRef}>
					{USE_CASES.map((uc, i) => (
						<PulsePoint
							key={uc.id}
							id={uc.id}
							x={uc.dot.x}
							y={uc.dot.y}
							active={i === active}
							onClick={() => switchTo(i)}
							label={`View ${uc.label}`}
						/>
					))}
				</div>
			</div>
			<div className={styles.contentSection}>
				<div className={styles.contentWrapper}>
					<button
						className={styles.arrowBtn}
						onClick={() => switchTo(active - 1)}
						aria-label='Previous use case'
					>
						<ChevronLeft size={16} strokeWidth={1.8} />
					</button>
					<div className={styles.content}>
						<div className={[styles.contentInner, fading ? styles.fading : ''].join(' ')}>
							<h3 className={styles.useCaseLabel}>{current.label}</h3>
						</div>
						<div className={[styles.contentInner, fading ? styles.fading : ''].join(' ')}>
							<p className={styles.useCaseDesc}>{current.desc}</p>
						</div>
						<div className={[styles.contentInner, fading ? styles.fading : ''].join(' ')}>
							<div className={styles.chipsRow}>
								{current.chips.map((chip) => (
									<span key={chip} className={styles.chip}>
										<span className={styles.chipDot} />
										{chip}
									</span>
								))}
							</div>
						</div>
					</div>
					<button
						className={styles.arrowBtn}
						onClick={() => switchTo(active + 1)}
						aria-label='Next use case'
					>
						<ChevronRight size={16} strokeWidth={1.8} />
					</button>
				</div>
				<div className={styles.pagination} role='tablist'>
					{USE_CASES.map((uc, i) => (
						<button
							key={uc.id}
							role='tab'
							aria-selected={i === active}
							aria-label={uc.label}
							className={[
								styles.pagDot,
								i === active ? styles.pagDotActive : ''
							].join(' ')}
							onClick={() => switchTo(i)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
