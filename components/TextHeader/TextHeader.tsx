import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import styles from './TextHeader.module.scss';

const HEADING_BLOCK = [
	{
		_type: 'block',
		_key: 'heading',
		style: 'normal',
		children: [
			{ _type: 'span', _key: 'a', text: 'A ', marks: ['muted'] },
			{ _type: 'span', _key: 'b', text: 'single platform ', marks: [] },
			{ _type: 'span', _key: 'c', text: 'for', marks: ['muted'] },
			{ _type: 'span', _key: 'br', text: '\n', marks: [] },
			{
				_type: 'span',
				_key: 'd',
				text: 'all your banking needs.',
				marks: ['muted']
			}
		],
		markDefs: []
	}
];

const headingComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => <h2 className={styles.heading}>{children}</h2>
	},
	marks: {
		muted: ({ children }) => <span className={styles.muted}>{children}</span>
	}
};

export default function TextHeader() {
	return (
		<header className={styles.TextHeader}>
			<div className={styles.TextHeaderWrapper}>
				<PortableText value={HEADING_BLOCK} components={headingComponents} />
				<div className={styles.ActionWrapper}>
					<p className={styles.content}>
						Once you've opened your business banking accounts, get set up with
						the rest of the essentials.
					</p>
					<Link href='/' className={styles.cta}>
						Get Started
					</Link>
				</div>
			</div>
		</header>
	);
	1;
}
