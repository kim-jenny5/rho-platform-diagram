export interface UseCase {
	id: string;
	order: number;
	label: string;
	desc: string;
	chips: string[];
	dot: { x: number; y: number };
}

export const USE_CASES: UseCase[] = [
	{
		id: 'runway',
		order: 1,
		label: 'Extend your runway',
		desc: 'Earn yield on idle cash and keep more of your funding working between raises.',
		chips: ['Checking Accounts', 'Savings Accounts', 'Treasury Accounts'],
		dot: { x: 20, y: 80 }
	},
	{
		id: 'spend',
		order: 2,
		label: 'Control spend early',
		desc: 'Set limits and approval workflows before expenses scale with your growing team.',
		chips: ['Rho Cards', 'Expense Management', 'Bill Pay'],
		dot: { x: 70, y: 76 }
	},
	{
		id: 'scale',
		order: 3,
		label: 'Scale finance operations',
		desc: 'Automate reconciliation and transaction syncing so finance keeps pace with company growth.',
		chips: ['Accounting Integrations', 'Bill Pay', 'Expense Management'],
		dot: { x: 38, y: 62 }
	},
	{
		id: 'standardize',
		order: 4,
		label: 'Standardize company spend',
		desc: 'Create consistent workflows across teams while maintaining centralized oversight.',
		chips: ['Rho Cards', 'Expense Management', 'Approval Workflows'],
		dot: { x: 62, y: 48 }
	},
	{
		id: 'consolidate',
		order: 5,
		label: 'Consolidate your finance stack',
		desc: 'Bring banking, cards, bill pay, and accounting workflows together in one platform.',
		chips: [
			'Checking Accounts',
			'Rho Cards',
			'Bill Pay',
			'Accounting Integrations'
		],
		dot: { x: 48, y: 24 }
	}
];
