'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import styles from './PlatformDiagram.module.scss';
import PulsePoint from '@/components/PulsePoint/PulsePoint';
import TextHeader from '../TextHeader/TextHeader';
import { USE_CASES } from '@/data/useCases';
import {
	ChevronLeft,
	ChevronRight,
	Landmark,
	PiggyBank,
	TrendingUp,
	CreditCard,
	Receipt,
	Banknote,
	Link2,
	ClipboardCheck,
	type LucideIcon
} from 'lucide-react';

const CHIP_ICONS: Record<string, LucideIcon> = {
	'Checking Accounts': Landmark,
	'Savings Accounts': PiggyBank,
	'Treasury Accounts': TrendingUp,
	'Rho Cards': CreditCard,
	'Expense Management': Receipt,
	'Bill Pay': Banknote,
	'Accounting Integrations': Link2,
	'Approval Workflows': ClipboardCheck
};

const SCALE = 1.18;
const IMG_W = 2048;
const IMG_H = 1365;

function imageToContainerPct(
	imgX: number,
	imgY: number,
	containerW: number,
	containerH: number
): { left: number; top: number } {
	if (containerW === 0 || containerH === 0) {
		return { left: imgX, top: imgY };
	}
	const boxW = 1.1 * containerW;
	const boxH = 1.08 * containerH;
	const scale = Math.min(boxW / IMG_W, boxH / IMG_H);
	const rendW = IMG_W * scale;
	const rendH = IMG_H * scale;
	const contentLeft = -0.05 * containerW + (boxW - rendW) / 2;
	const contentTop = containerH + 20 - rendH;
	const dotLeft = contentLeft + (imgX / 100) * rendW;
	const dotTop = contentTop + (imgY / 100) * rendH;
	return {
		left: (dotLeft / containerW) * 100,
		top: (dotTop / containerH) * 100
	};
}

const SLIDE_MARGIN = 80;
const SLIDE_GAP = 12;

export default function PlatformDiagram() {
	const [active, setActive] = useState(0);
	const [fading, setFading] = useState(false);
	const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

	const wrapRef = useRef<HTMLDivElement>(null);
	const pulseWrapRef = useRef<HTMLDivElement>(null);
	const areaRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = areaRef.current;
		if (!el) return;
		const ro = new ResizeObserver(() => {
			setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
		});
		ro.observe(el);
		setContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
		return () => ro.disconnect();
	}, []);

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

			if (areaRef.current) {
				const W = areaRef.current.offsetWidth;
				const H = areaRef.current.offsetHeight;
				const { left: cx, top: cy } = imageToContainerPct(
					uc.dot.x,
					uc.dot.y,
					W,
					H
				);
				const t = buildTransform(cx, cy, SCALE);
				if (wrapRef.current) wrapRef.current.style.transform = t;
				if (pulseWrapRef.current) pulseWrapRef.current.style.transform = t;
			}

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

	useEffect(() => {
		const track = scrollRef.current;
		if (!track) return;
		const onScrollEnd = () => {
			const slideWidth = track.clientWidth - SLIDE_MARGIN;
			const index = Math.round(track.scrollLeft / (slideWidth + SLIDE_GAP));
			const clamped = Math.max(0, Math.min(index, USE_CASES.length - 1));
			switchTo(clamped, true);
		};
		track.addEventListener('scrollend', onScrollEnd, { passive: true });
		return () => track.removeEventListener('scrollend', onScrollEnd);
	}, [switchTo]);

	useEffect(() => {
		const track = scrollRef.current;
		if (!track) return;
		const slideWidth = track.clientWidth - SLIDE_MARGIN;
		const targetLeft = active * (slideWidth + SLIDE_GAP);
		if (Math.abs(track.scrollLeft - targetLeft) > 4) {
			track.scrollTo({ left: targetLeft, behavior: 'smooth' });
		}
	}, [active]);

	const current = USE_CASES[active];

	const pathData = useMemo(() => {
		const { w, h } = containerSize;
		if (w === 0 || h === 0) return '';
		const sorted = [...USE_CASES].sort((a, b) => a.order - b.order);
		const pts = sorted.map((uc) => {
			const pos = imageToContainerPct(uc.dot.x, uc.dot.y, w, h);
			return { x: (pos.left / 100) * w, y: (pos.top / 100) * h };
		});
		return pts.reduce((d, pt, i) => {
			if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
			const prev = pts[i - 1];
			const mx = (prev.x + pt.x) / 2;
			const my = (prev.y + pt.y) / 2;
			const dx = pt.x - prev.x;
			const dy = pt.y - prev.y;
			const len = Math.sqrt(dx * dx + dy * dy);
			const cf = len * 0.12;
			const cpx = mx + (-dy / len) * cf;
			const cpy = my + (dx / len) * cf;
			return `${d} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
		}, '');
	}, [containerSize]);

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
					{pathData && (
						<svg
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								pointerEvents: 'none',
								overflow: 'visible'
							}}
							viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d={pathData}
								fill='none'
								stroke='var(--brand-caribbean-300)'
								strokeWidth='1.5'
								strokeOpacity='0.5'
								strokeDasharray='6 8'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					)}
					{USE_CASES.map((uc, i) => {
						const pos = imageToContainerPct(
							uc.dot.x,
							uc.dot.y,
							containerSize.w,
							containerSize.h
						);
						return (
							<PulsePoint
								key={uc.id}
								id={uc.id}
								left={`${pos.left.toFixed(2)}%`}
								top={`${pos.top.toFixed(2)}%`}
								active={i === active}
								onClick={() => switchTo(i)}
								label={`View ${uc.label}`}
							/>
						);
					})}
				</div>
			</div>
			<div className={styles.contentWrapper}>
				<button
					className={styles.arrowBtn}
					onClick={() => switchTo(active - 1)}
					aria-label='Previous use case'
				>
					<ChevronLeft size={20} strokeWidth={1.8} />
				</button>
				<div className={styles.content}>
					<div
						className={[styles.contentInner, fading ? styles.fading : ''].join(
							' '
						)}
					>
						<h3 className={styles.useCaseLabel}>{current.label}</h3>
					</div>
					<div
						className={[styles.contentInner, fading ? styles.fading : ''].join(
							' '
						)}
					>
						<p className={styles.useCaseDesc}>{current.desc}</p>
					</div>
					<div
						className={[styles.contentInner, fading ? styles.fading : ''].join(
							' '
						)}
					>
						<div className={styles.chipsWrapper}>
							{current.chips.map((chip) => {
								const Icon = CHIP_ICONS[chip];
								return (
									<span key={chip} className={styles.chip}>
										{Icon && <Icon size={16} strokeWidth={1.75} />}
										{chip}
									</span>
								);
							})}
						</div>
					</div>
				</div>
				<button
					className={styles.arrowBtn}
					onClick={() => switchTo(active + 1)}
					aria-label='Next use case'
				>
					<ChevronRight size={20} strokeWidth={1.8} />
				</button>
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
			<div className={styles.contentWrapperMobile}>
				<div className={styles.slidesWrapper}>
					<div className={styles.slidesTrack} ref={scrollRef}>
						{USE_CASES.map((uc) => (
							<div key={uc.id} className={styles.slide}>
								<h3 className={styles.useCaseLabel}>{uc.label}</h3>
								<p className={styles.useCaseDesc}>{uc.desc}</p>
								<div className={styles.chipsWrapper}>
									{uc.chips.map((chip) => {
										const Icon = CHIP_ICONS[chip];
										return (
											<span key={chip} className={styles.chip}>
												{Icon && <Icon size={16} strokeWidth={1.75} />}
												{chip}
											</span>
										);
									})}
								</div>
							</div>
						))}
					</div>
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
