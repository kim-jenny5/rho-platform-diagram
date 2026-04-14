export interface UseCase {
	id: string;
	label: string;
	desc: string;
	chips: string[];
	dot: { x: number; y: number };
}

export const USE_CASES: UseCase[] = [
	{
		id: 'runway',
		label: 'Extend your runway',
		desc: 'Earn yield on idle cash and keep more of your funding working between raises.',
		chips: ['Checking Accounts', 'Savings Accounts', 'Treasury Accounts'],
		dot: { x: 23, y: 80 }
	},
	{
		id: 'spend',
		label: 'Control spend early',
		desc: 'Set limits and approval workflows before expenses scale with your growing team.',
		chips: ['Rho Cards', 'Expense Management', 'Bill Pay'],
		dot: { x: 38, y: 62 }
	},
	{
		id: 'scale',
		label: 'Scale finance operations',
		desc: 'Automate reconciliation and transaction syncing so finance keeps pace with company growth.',
		chips: ['Accounting Integrations', 'Bill Pay', 'Expense Management'],
		dot: { x: 52, y: 28 }
	},
	{
		id: 'standardize',
		label: 'Standardize company spend',
		desc: 'Create consistent workflows across teams while maintaining centralized oversight.',
		chips: ['Rho Cards', 'Expense Management', 'Approval Workflows'],
		dot: { x: 65, y: 57 }
	},
	{
		id: 'consolidate',
		label: 'Consolidate your finance stack',
		desc: 'Bring banking, cards, bill pay, and accounting workflows together in one platform.',
		chips: [
			'Checking Accounts',
			'Rho Cards',
			'Bill Pay',
			'Accounting Integrations'
		],
		dot: { x: 77, y: 76 }
	}
];
