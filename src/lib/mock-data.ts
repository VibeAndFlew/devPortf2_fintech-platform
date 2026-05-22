export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'flagged';
  type: 'payment' | 'transfer' | 'deposit' | 'withdrawal';
  description: string;
  counterparty: string;
  date: string;
  riskScore: number;
  reference: string;
}

export interface TreasuryBalance {
  asset: string;
  label: string;
  balance: number;
  available: number;
  pending: number;
  change24h: number;
  changePct: number;
  icon: string;
}

export interface RevenueMetric {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  subscriptions: number;
  transactions: number;
  arr: number;
}

export interface RiskItem {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  entity: string;
  detectedAt: string;
  status: 'open' | 'investigating' | 'mitigated' | 'resolved';
  score: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'failure' | 'warning';
}

export interface ForecastPoint {
  date: string;
  actual?: number;
  predicted: number;
  upperBound: number;
  lowerBound: number;
}

export interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'anomaly';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  timestamp: string;
  category: string;
  actionable: boolean;
}

export const transactions: Transaction[] = [
  { id: 'tx-001', amount: 1250000, currency: 'USD', status: 'completed', type: 'transfer', description: 'Wire transfer - International settlement', counterparty: 'Deutsche Bank AG', date: '2026-05-22T09:15:00Z', riskScore: 12, reference: 'WIRE-20260522-001' },
  { id: 'tx-002', amount: 450000, currency: 'EUR', status: 'pending', type: 'payment', description: 'SWIFT MT103 cross-border payment', counterparty: 'BNP Paribas', date: '2026-05-22T08:45:00Z', riskScore: 45, reference: 'SWIFT-20260522-002' },
  { id: 'tx-003', amount: 25000, currency: 'USDC', status: 'completed', type: 'deposit', description: 'USDC treasury top-up via Polygon', counterparty: 'Circle Yield', date: '2026-05-22T07:30:00Z', riskScore: 8, reference: 'CRYPTO-20260522-003' },
  { id: 'tx-004', amount: 780000, currency: 'GBP', status: 'flagged', type: 'transfer', description: 'CHAPS large value payment', counterparty: 'Barclays PLC', date: '2026-05-21T16:20:00Z', riskScore: 78, reference: 'CHAPS-20260521-004' },
  { id: 'tx-005', amount: 12000, currency: 'USD', status: 'completed', type: 'withdrawal', description: 'ACH operating expense disbursement', counterparty: 'Stripe Payouts', date: '2026-05-21T15:00:00Z', riskScore: 5, reference: 'ACH-20260521-005' },
  { id: 'tx-006', amount: 3200000, currency: 'USD', status: 'completed', type: 'deposit', description: 'T-bill maturity proceeds', counterparty: 'US Treasury', date: '2026-05-21T14:30:00Z', riskScore: 3, reference: 'TBILL-20260521-006' },
  { id: 'tx-007', amount: 89000, currency: 'EUR', status: 'failed', type: 'payment', description: 'SEPA instant credit transfer', counterparty: 'Santander', date: '2026-05-21T11:15:00Z', riskScore: 35, reference: 'SEPA-20260521-007' },
  { id: 'tx-008', amount: 560000, currency: 'USD', status: 'completed', type: 'transfer', description: 'FX swap USD/EUR settlement', counterparty: 'JP Morgan Chase', date: '2026-05-21T10:00:00Z', riskScore: 28, reference: 'FXSWAP-20260521-008' },
  { id: 'tx-009', amount: 15000, currency: 'BTC', status: 'completed', type: 'transfer', description: 'Bitcoin treasury rebalancing', counterparty: 'Coinbase Prime', date: '2026-05-20T22:00:00Z', riskScore: 55, reference: 'CRYPTO-20260520-009' },
  { id: 'tx-010', amount: 940000, currency: 'USD', status: 'pending', type: 'payment', description: 'Vendor settlement - infrastructure services', counterparty: 'AWS Inc.', date: '2026-05-20T18:45:00Z', riskScore: 10, reference: 'AP-20260520-010' },
  { id: 'tx-011', amount: 275000, currency: 'USD', status: 'completed', type: 'withdrawal', description: 'Payroll disbursement - May cycle', counterparty: 'ADP', date: '2026-05-20T09:00:00Z', riskScore: 2, reference: 'PAYROLL-20260520-011' },
  { id: 'tx-012', amount: 1100000, currency: 'EUR', status: 'flagged', type: 'transfer', description: 'High-value cross-border M&A payment', counterparty: 'Credit Suisse', date: '2026-05-19T15:30:00Z', riskScore: 82, reference: 'WIRE-20260519-012' },
  { id: 'tx-013', amount: 45000, currency: 'USD', status: 'completed', type: 'deposit', description: 'Subscription revenue batch settlement', counterparty: 'Stripe', date: '2026-05-19T14:00:00Z', riskScore: 4, reference: 'STRIPE-20260519-013' },
  { id: 'tx-014', amount: 600000, currency: 'GOLD', status: 'pending', type: 'payment', description: 'Gold-backed stablecoin redemption', counterparty: 'Paxos Trust', date: '2026-05-19T12:20:00Z', riskScore: 38, reference: 'PAXG-20260519-014' },
  { id: 'tx-015', amount: 430000, currency: 'USD', status: 'completed', type: 'transfer', description: 'Treasury sweep to money market fund', counterparty: 'Fidelity', date: '2026-05-19T08:30:00Z', riskScore: 6, reference: 'SWEEP-20260519-015' },
  { id: 'tx-016', amount: 185000, currency: 'GBP', status: 'failed', type: 'payment', description: 'Faster Payment outgoing', counterparty: 'HSBC UK', date: '2026-05-18T16:45:00Z', riskScore: 42, reference: 'FPS-20260518-016' },
  { id: 'tx-017', amount: 920000, currency: 'USD', status: 'completed', type: 'deposit', description: 'Corporate bond coupon payment', counterparty: 'Goldman Sachs', date: '2026-05-18T11:00:00Z', riskScore: 7, reference: 'BOND-20260518-017' },
  { id: 'tx-018', amount: 350000, currency: 'EUR', status: 'pending', type: 'transfer', description: 'Liquidity pool rebalancing', counterparty: 'Uniswap Treasury', date: '2026-05-18T09:15:00Z', riskScore: 50, reference: 'DEFI-20260518-018' },
  { id: 'tx-019', amount: 78000, currency: 'USD', status: 'completed', type: 'withdrawal', description: 'Expense reimbursement batch', counterparty: 'Brex', date: '2026-05-17T14:30:00Z', riskScore: 9, reference: 'EXP-20260517-019' },
  { id: 'tx-020', amount: 2100000, currency: 'USD', status: 'flagged', type: 'transfer', description: 'Suspicious rapid movement through nested accounts', counterparty: 'Unknown Entity', date: '2026-05-17T06:00:00Z', riskScore: 95, reference: 'ALERT-20260517-020' },
  { id: 'tx-021', amount: 165000, currency: 'USDC', status: 'completed', type: 'deposit', description: 'USDC yield strategy return', counterparty: 'Aave Treasury', date: '2026-05-16T20:00:00Z', riskScore: 15, reference: 'AAVE-20260516-021' },
  { id: 'tx-022', amount: 720000, currency: 'USD', status: 'pending', type: 'payment', description: 'Quarterly dividend distribution', counterparty: 'DTC', date: '2026-05-16T10:00:00Z', riskScore: 18, reference: 'DIV-20260516-022' },
  { id: 'tx-023', amount: 40000, currency: 'BTC', status: 'completed', type: 'transfer', description: 'OTC BTC acquisition', counterparty: 'Coinbase Institutional', date: '2026-05-15T15:00:00Z', riskScore: 60, reference: 'OTC-20260515-023' },
  { id: 'tx-024', amount: 990000, currency: 'USD', status: 'completed', type: 'withdrawal', description: 'Commercial paper maturity repayment', counterparty: 'BlackRock', date: '2026-05-15T09:00:00Z', riskScore: 11, reference: 'CP-20260515-024' },
  { id: 'tx-025', amount: 510000, currency: 'EUR', status: 'completed', type: 'transfer', description: 'Euro-denominated repo agreement settlement', counterparty: 'ECB', date: '2026-05-14T12:00:00Z', riskScore: 14, reference: 'REPO-20260514-025' },
];

export const treasuryBalances: TreasuryBalance[] = [
  { asset: 'USD', label: 'US Dollar', balance: 42500000, available: 38800000, pending: 3700000, change24h: 1250000, changePct: 3.02, icon: 'dollar' },
  { asset: 'EUR', label: 'Euro', balance: 18200000, available: 15900000, pending: 2300000, change24h: -450000, changePct: -2.41, icon: 'euro' },
  { asset: 'GBP', label: 'British Pound', balance: 8900000, available: 8100000, pending: 800000, change24h: 210000, changePct: 2.42, icon: 'pound' },
  { asset: 'BTC', label: 'Bitcoin', balance: 12500000, available: 12500000, pending: 0, change24h: 890000, changePct: 7.67, icon: 'bitcoin' },
  { asset: 'USDC', label: 'USD Coin', balance: 18500000, available: 15000000, pending: 3500000, change24h: -320000, changePct: -1.70, icon: 'circle' },
  { asset: 'GOLD', label: 'Gold (PAXG)', balance: 7200000, available: 6500000, pending: 700000, change24h: 180000, changePct: 2.56, icon: 'gem' },
];

export const revenueMetrics: RevenueMetric[] = [
  { month: '2026-01', revenue: 2840000, cost: 1650000, profit: 1190000, margin: 41.9, subscriptions: 12450, transactions: 892000, arr: 34080000 },
  { month: '2026-02', revenue: 3120000, cost: 1720000, profit: 1400000, margin: 44.9, subscriptions: 13200, transactions: 945000, arr: 37440000 },
  { month: '2026-03', revenue: 3580000, cost: 1810000, profit: 1770000, margin: 49.4, subscriptions: 14150, transactions: 1012000, arr: 42960000 },
  { month: '2026-04', revenue: 3950000, cost: 1900000, profit: 2050000, margin: 51.9, subscriptions: 15200, transactions: 1089000, arr: 47400000 },
  { month: '2026-05', revenue: 4320000, cost: 1980000, profit: 2340000, margin: 54.2, subscriptions: 16300, transactions: 1175000, arr: 51840000 },
  { month: '2026-06', revenue: 4680000, cost: 2050000, profit: 2630000, margin: 56.2, subscriptions: 17100, transactions: 1240000, arr: 56160000 },
  { month: '2026-07', revenue: 4950000, cost: 2120000, profit: 2830000, margin: 57.2, subscriptions: 17800, transactions: 1310000, arr: 59400000 },
  { month: '2026-08', revenue: 5210000, cost: 2180000, profit: 3030000, margin: 58.2, subscriptions: 18500, transactions: 1375000, arr: 62520000 },
  { month: '2026-09', revenue: 5480000, cost: 2250000, profit: 3230000, margin: 58.9, subscriptions: 19200, transactions: 1420000, arr: 65760000 },
  { month: '2026-10', revenue: 5720000, cost: 2310000, profit: 3410000, margin: 59.6, subscriptions: 19800, transactions: 1480000, arr: 68640000 },
  { month: '2026-11', revenue: 5950000, cost: 2380000, profit: 3570000, margin: 60.0, subscriptions: 20400, transactions: 1530000, arr: 71400000 },
  { month: '2026-12', revenue: 6200000, cost: 2450000, profit: 3750000, margin: 60.5, subscriptions: 21000, transactions: 1580000, arr: 74400000 },
];

export const riskItems: RiskItem[] = [
  { id: 'risk-001', severity: 'critical', category: 'AML', description: 'Suspicious transaction pattern detected - nested account layering', entity: 'Account #ACC-8842', detectedAt: '2026-05-22T06:00:00Z', status: 'open', score: 95 },
  { id: 'risk-002', severity: 'high', category: 'Counterparty', description: 'Sanctions screening hit on beneficiary entity', entity: 'Global Trade Ltd', detectedAt: '2026-05-21T14:30:00Z', status: 'investigating', score: 78 },
  { id: 'risk-003', severity: 'medium', category: 'Liquidity', description: 'Concentration risk - single counterparty exceeds 15% of portfolio', entity: 'JP Morgan Chase', detectedAt: '2026-05-21T10:15:00Z', status: 'investigating', score: 55 },
  { id: 'risk-004', severity: 'low', category: 'Operational', description: 'Failed SWIFT message ACK - possible network issue', entity: 'SWIFT Network', detectedAt: '2026-05-20T23:45:00Z', status: 'resolved', score: 20 },
  { id: 'risk-005', severity: 'high', category: 'Market', description: 'FX exposure breach - EUR position exceeds VAR threshold', entity: 'FX Portfolio', detectedAt: '2026-05-20T16:00:00Z', status: 'mitigated', score: 72 },
  { id: 'risk-006', severity: 'critical', category: 'Fraud', description: 'Potential account takeover detected - unusual login pattern', entity: 'Admin Portal', detectedAt: '2026-05-20T03:15:00Z', status: 'open', score: 91 },
  { id: 'risk-007', severity: 'medium', category: 'Compliance', description: 'KYC documentation expiry for high-value client', entity: 'Client #CL-4421', detectedAt: '2026-05-19T11:00:00Z', status: 'open', score: 48 },
  { id: 'risk-008', severity: 'high', category: 'Credit', description: 'Bond issuer downgrade triggers collateral call', entity: 'Corp Bond Portfolio', detectedAt: '2026-05-19T08:30:00Z', status: 'investigating', score: 76 },
  { id: 'risk-009', severity: 'low', category: 'Technical', description: 'API rate limit threshold approaching 85%', entity: 'Treasury API Gateway', detectedAt: '2026-05-18T14:20:00Z', status: 'mitigated', score: 15 },
  { id: 'risk-010', severity: 'medium', category: 'Regulatory', description: 'ESFR reporting deadline in 48 hours - data incomplete', entity: 'Compliance Dept', detectedAt: '2026-05-18T09:00:00Z', status: 'open', score: 42 },
  { id: 'risk-011', severity: 'high', category: 'Crypto', description: 'Smart contract upgrade notice on DeFi protocol with exposure', entity: 'Aave Treasury Pool', detectedAt: '2026-05-17T22:00:00Z', status: 'investigating', score: 74 },
  { id: 'risk-012', severity: 'critical', category: 'AML', description: 'Structured transaction detection - multiple sub-reporting threshold deposits', entity: 'Account #ACC-9011', detectedAt: '2026-05-17T07:30:00Z', status: 'open', score: 88 },
  { id: 'risk-013', severity: 'low', category: 'Operational', description: 'Minor discrepancy in end-of-day reconciliation', entity: 'Cash Ops', detectedAt: '2026-05-16T23:00:00Z', status: 'resolved', score: 18 },
  { id: 'risk-014', severity: 'medium', category: 'Market', description: 'Interest rate shift impacts floating-rate note portfolio', entity: 'Fixed Income', detectedAt: '2026-05-16T15:00:00Z', status: 'mitigated', score: 52 },
  { id: 'risk-015', severity: 'high', category: 'Security', description: 'Unusual API access pattern from non-whitelisted IP range', entity: 'API Gateway', detectedAt: '2026-05-15T04:30:00Z', status: 'open', score: 70 },
  { id: 'risk-016', severity: 'low', category: 'Compliance', description: 'Quarterly audit evidence package incomplete', entity: 'Internal Audit', detectedAt: '2026-05-14T12:00:00Z', status: 'open', score: 22 },
  { id: 'risk-017', severity: 'medium', category: 'Liquidity', description: 'Pending settlement volume exceeds daily liquidity buffer', entity: 'Settlement Ops', detectedAt: '2026-05-14T08:00:00Z', status: 'investigating', score: 58 },
  { id: 'risk-018', severity: 'critical', category: 'Fraud', description: 'Invoice payment fraud - altered beneficiary bank details', entity: 'Vendor Payments', detectedAt: '2026-05-13T10:00:00Z', status: 'open', score: 93 },
  { id: 'risk-019', severity: 'medium', category: 'Operational', description: 'Database replication lag exceeding SLA threshold', entity: 'Treasury DB Cluster', detectedAt: '2026-05-12T19:30:00Z', status: 'mitigated', score: 40 },
  { id: 'risk-020', severity: 'high', category: 'Regulatory', description: 'OFAC compliance report submission overdue by 2 days', entity: 'Compliance Dept', detectedAt: '2026-05-12T09:00:00Z', status: 'investigating', score: 80 },
  { id: 'risk-021', severity: 'low', category: 'Technical', description: 'SSL certificate renewal pending - expiring in 7 days', entity: '*.aegis-finance.io', detectedAt: '2026-05-11T14:00:00Z', status: 'open', score: 25 },
  { id: 'risk-022', severity: 'medium', category: 'Credit', description: 'CDS spread widening on major counterparty', entity: 'Credit Suisse', detectedAt: '2026-05-11T08:00:00Z', status: 'investigating', score: 62 },
];

export const auditLogs: AuditEntry[] = [
  { id: 'aud-001', timestamp: '2026-05-22T09:15:22Z', actor: 'v.buldeo@aegis.io', action: 'CREATE', resource: 'Wire Transfer #WIRE-20260522-001', details: 'Initiated international wire transfer of $1,250,000 to Deutsche Bank AG', ipAddress: '192.168.1.42', status: 'success' },
  { id: 'aud-002', timestamp: '2026-05-22T08:45:10Z', actor: 'anika.sharma@aegis.io', action: 'MODIFY', resource: 'Transaction #SWIFT-20260522-002', details: 'Updated SWIFT beneficiary details for BNP Paribas payment', ipAddress: '192.168.1.105', status: 'success' },
  { id: 'aud-003', timestamp: '2026-05-22T07:30:45Z', actor: 'system@aegis-finance.io', action: 'SYSTEM', resource: 'Treasury Balance Reconcile', details: 'Automated reconciliation completed - all balances match', ipAddress: '10.0.0.1', status: 'success' },
  { id: 'aud-004', timestamp: '2026-05-21T16:20:33Z', actor: 'marcus.rivera@aegis.io', action: 'FLAG', resource: 'Transaction #CHAPS-20260521-004', details: 'Flagged high-value CHAPS payment for compliance review (£780,000)', ipAddress: '192.168.1.88', status: 'warning' },
  { id: 'aud-005', timestamp: '2026-05-21T15:00:00Z', actor: 'system@aegis-finance.io', action: 'AUTO', resource: 'ACH Batch #ACH-20260521-005', details: 'Automatic ACH disbursement batch processed ($12,000)', ipAddress: '10.0.0.2', status: 'success' },
  { id: 'aud-006', timestamp: '2026-05-21T14:30:15Z', actor: 'v.buldeo@aegis.io', action: 'APPROVE', resource: 'T-Bill Maturity #TBILL-20260521-006', details: 'Approved T-bill maturity proceeds of $3,200,000', ipAddress: '192.168.1.42', status: 'success' },
  { id: 'aud-007', timestamp: '2026-05-21T11:15:50Z', actor: 'system@aegis-finance.io', action: 'FAIL', resource: 'SEPA Credit #SEPA-20260521-007', details: 'SEPA instant transfer failed - invalid IBAN format', ipAddress: '10.0.0.3', status: 'failure' },
  { id: 'aud-008', timestamp: '2026-05-21T10:00:22Z', actor: 'anika.sharma@aegis.io', action: 'CREATE', resource: 'FX Swap #FXSWAP-20260521-008', details: 'Executed USD/EUR FX swap settlement of $560,000', ipAddress: '192.168.1.105', status: 'success' },
  { id: 'aud-009', timestamp: '2026-05-20T22:00:00Z', actor: 'marcus.rivera@aegis.io', action: 'TRANSFER', resource: 'Crypto Transfer #CRYPTO-20260520-009', details: 'Transferred 15 BTC to Coinbase Prime for rebalancing', ipAddress: '192.168.1.88', status: 'success' },
  { id: 'aud-010', timestamp: '2026-05-20T18:45:30Z', actor: 'system@aegis-finance.io', action: 'PENDING', resource: 'Vendor Payment #AP-20260520-010', details: 'Vendor payment queued for approval - $940,000 to AWS Inc.', ipAddress: '10.0.0.1', status: 'warning' },
  { id: 'aud-011', timestamp: '2026-05-20T09:00:12Z', actor: 'system@aegis-finance.io', action: 'AUTO', resource: 'Payroll Run #PAYROLL-20260520-011', details: 'Monthly payroll disbursement completed ($275,000)', ipAddress: '10.0.0.2', status: 'success' },
  { id: 'aud-012', timestamp: '2026-05-19T15:30:45Z', actor: 'v.buldeo@aegis.io', action: 'CREATE', resource: 'M&A Payment #WIRE-20260519-012', details: 'Initiated M&A related wire transfer of €1,100,000', ipAddress: '192.168.1.42', status: 'success' },
  { id: 'aud-013', timestamp: '2026-05-19T14:00:18Z', actor: 'system@aegis-finance.io', action: 'AUTO', resource: 'Stripe Settlement #STRIPE-20260519-013', details: 'Stripe revenue batch settled - $45,000', ipAddress: '10.0.0.1', status: 'success' },
  { id: 'aud-014', timestamp: '2026-05-19T12:20:00Z', actor: 'anika.sharma@aegis.io', action: 'INITIATE', resource: 'PAXG Redemption #PAXG-20260519-014', details: 'Initiated Gold-backed token redemption ($600,000)', ipAddress: '192.168.1.105', status: 'success' },
  { id: 'aud-015', timestamp: '2026-05-19T08:30:22Z', actor: 'system@aegis-finance.io', action: 'AUTO', resource: 'Money Market Sweep #SWEEP-20260519-015', details: 'Automated treasury sweep to Fidelity money market fund', ipAddress: '10.0.0.1', status: 'success' },
  { id: 'aud-016', timestamp: '2026-05-18T16:45:33Z', actor: 'marcus.rivera@aegis.io', action: 'MODIFY', resource: 'FPS Payment #FPS-20260518-016', details: 'Corrected beneficiary sort code - retrying payment', ipAddress: '192.168.1.88', status: 'success' },
  { id: 'aud-017', timestamp: '2026-05-18T11:00:10Z', actor: 'system@aegis-finance.io', action: 'RECEIVE', resource: 'Bond Coupon #BOND-20260518-017', details: 'Corporate bond coupon payment received ($920,000)', ipAddress: '10.0.0.3', status: 'success' },
  { id: 'aud-018', timestamp: '2026-05-18T09:15:45Z', actor: 'v.buldeo@aegis.io', action: 'CREATE', resource: 'DeFi Rebalance #DEFI-20260518-018', details: 'Uniswap liquidity pool rebalancing initiated', ipAddress: '192.168.1.42', status: 'success' },
  { id: 'aud-019', timestamp: '2026-05-17T14:30:00Z', actor: 'system@aegis-finance.io', action: 'AUTO', resource: 'Expense Reimbursement #EXP-20260517-019', details: 'Expense reimbursement batch processed via Brex', ipAddress: '10.0.0.2', status: 'success' },
  { id: 'aud-020', timestamp: '2026-05-17T06:00:15Z', actor: 'system@aegis-finance.io', action: 'ALERT', resource: 'Suspicious Activity #ALERT-20260517-020', details: 'CRITICAL: Suspicious nested account movement detected - $2,100,000', ipAddress: '10.0.0.1', status: 'warning' },
  { id: 'aud-021', timestamp: '2026-05-16T20:00:00Z', actor: 'system@aegis-finance.io', action: 'RECEIVE', resource: 'Aave Yield #AAVE-20260516-021', details: 'DeFi yield strategy return received ($165,000 USDC)', ipAddress: '10.0.0.3', status: 'success' },
  { id: 'aud-022', timestamp: '2026-05-16T10:00:22Z', actor: 'anika.sharma@aegis.io', action: 'CREATE', resource: 'Dividend Distribution #DIV-20260516-022', details: 'Quarterly dividend distribution initiated ($720,000)', ipAddress: '192.168.1.105', status: 'success' },
  { id: 'aud-023', timestamp: '2026-05-15T15:00:00Z', actor: 'marcus.rivera@aegis.io', action: 'EXECUTE', resource: 'OTC BTC Trade #OTC-20260515-023', details: 'Executed OTC Bitcoin acquisition - 40 BTC', ipAddress: '192.168.1.88', status: 'success' },
  { id: 'aud-024', timestamp: '2026-05-15T09:00:10Z', actor: 'system@aegis-finance.io', action: 'AUTO', resource: 'CP Maturity #CP-20260515-024', details: 'Commercial paper maturity repayment to BlackRock ($990,000)', ipAddress: '10.0.0.1', status: 'success' },
  { id: 'aud-025', timestamp: '2026-05-14T12:00:00Z', actor: 'v.buldeo@aegis.io', action: 'SETTLE', resource: 'Repo Agreement #REPO-20260514-025', details: 'Euro repo agreement settlement with ECB', ipAddress: '192.168.1.42', status: 'success' },
];

export const forecastData: ForecastPoint[] = [
  { date: '2026-06-01', actual: 42500000, predicted: 42800000, upperBound: 44100000, lowerBound: 41500000 },
  { date: '2026-06-08', predicted: 43200000, upperBound: 44800000, lowerBound: 41600000 },
  { date: '2026-06-15', predicted: 43800000, upperBound: 45600000, lowerBound: 42000000 },
  { date: '2026-06-22', predicted: 44500000, upperBound: 46500000, lowerBound: 42500000 },
  { date: '2026-07-01', predicted: 45100000, upperBound: 47400000, lowerBound: 42800000 },
  { date: '2026-07-08', predicted: 45800000, upperBound: 48300000, lowerBound: 43300000 },
  { date: '2026-07-15', predicted: 46400000, upperBound: 49100000, lowerBound: 43700000 },
  { date: '2026-07-22', predicted: 47100000, upperBound: 50000000, lowerBound: 44200000 },
  { date: '2026-08-01', predicted: 47800000, upperBound: 50900000, lowerBound: 44700000 },
  { date: '2026-08-08', predicted: 48500000, upperBound: 51800000, lowerBound: 45200000 },
  { date: '2026-08-15', predicted: 49200000, upperBound: 52700000, lowerBound: 45700000 },
  { date: '2026-08-22', predicted: 49900000, upperBound: 53600000, lowerBound: 46200000 },
  { date: '2026-09-01', predicted: 50600000, upperBound: 54500000, lowerBound: 46700000 },
  { date: '2026-09-08', predicted: 51300000, upperBound: 55400000, lowerBound: 47200000 },
  { date: '2026-09-15', predicted: 52000000, upperBound: 56300000, lowerBound: 47700000 },
  { date: '2026-09-22', predicted: 52700000, upperBound: 57200000, lowerBound: 48200000 },
  { date: '2026-10-01', predicted: 53400000, upperBound: 58100000, lowerBound: 48700000 },
  { date: '2026-10-08', predicted: 54100000, upperBound: 59000000, lowerBound: 49200000 },
  { date: '2026-10-15', predicted: 54800000, upperBound: 59900000, lowerBound: 49700000 },
  { date: '2026-10-22', predicted: 55500000, upperBound: 60800000, lowerBound: 50200000 },
  { date: '2026-11-01', predicted: 56200000, upperBound: 61700000, lowerBound: 50700000 },
  { date: '2026-11-08', predicted: 56900000, upperBound: 62600000, lowerBound: 51200000 },
  { date: '2026-11-15', predicted: 57600000, upperBound: 63500000, lowerBound: 51700000 },
  { date: '2026-11-22', predicted: 58300000, upperBound: 64400000, lowerBound: 52200000 },
];

export const insights: Insight[] = [
  { id: 'ins-001', type: 'opportunity', title: 'Interest Rate Arbitrage', description: 'Current EUR/USD forward points indicate 23bps arbitrage opportunity through covered interest rate parity', impact: 89, confidence: 92, timestamp: '2026-05-22T08:00:00Z', category: 'FX', actionable: true },
  { id: 'ins-002', type: 'risk', title: 'Concentration Risk Alert', description: 'JP Morgan exposure at 18.2% of total portfolio - exceeds 15% threshold by 3.2%', impact: 72, confidence: 95, timestamp: '2026-05-22T07:00:00Z', category: 'Credit Risk', actionable: true },
  { id: 'ins-003', type: 'trend', title: 'Revenue Growth Acceleration', description: 'MRR growth trajectory shifted from 8% to 12% MoM - driven by Enterprise tier adoption', impact: 85, confidence: 88, timestamp: '2026-05-21T18:00:00Z', category: 'Revenue', actionable: false },
  { id: 'ins-004', type: 'anomaly', title: 'Unusual Transaction Velocity', description: 'Account ACC-8842 shows 3.5x normal transaction volume in 24h - pattern consistent with layering', impact: 95, confidence: 97, timestamp: '2026-05-22T06:00:00Z', category: 'AML', actionable: true },
  { id: 'ins-005', type: 'opportunity', title: 'T-Bill Yield Curve Positioning', description: 'Short-end yield curve steepening suggests roll 3-month T-bills to 6-month for 15bps pickup', impact: 65, confidence: 78, timestamp: '2026-05-21T14:00:00Z', category: 'Fixed Income', actionable: true },
  { id: 'ins-006', type: 'trend', title: 'DeFi Yield Compression', description: 'Aave USDC deposit rate declining from 4.2% to 3.1% - consider reallocating to real-world assets', impact: 58, confidence: 85, timestamp: '2026-05-21T12:00:00Z', category: 'Crypto', actionable: true },
  { id: 'ins-007', type: 'risk', title: 'Regulatory Filing Gap', description: 'ESFR report data incomplete - missing 3 required fields for May reporting cycle', impact: 78, confidence: 90, timestamp: '2026-05-20T10:00:00Z', category: 'Compliance', actionable: true },
  { id: 'ins-008', type: 'anomaly', title: 'API Call Pattern Deviation', description: 'Treasury API gateway received requests from IP range 45.33.0.0/16 not in whitelist', impact: 70, confidence: 88, timestamp: '2026-05-20T04:30:00Z', category: 'Security', actionable: true },
  { id: 'ins-009', type: 'opportunity', title: 'Cross-Border Payment Optimization', description: 'Shift EUR-denominated payments from SWIFT to SEPA Instant saves €2.50/tx and 1-day settlement', impact: 45, confidence: 95, timestamp: '2026-05-19T16:00:00Z', category: 'Payments', actionable: true },
  { id: 'ins-010', type: 'trend', title: 'Subscription Churn Decrease', description: 'Monthly churn rate declined from 1.8% to 1.2% - retention initiatives showing effect', impact: 82, confidence: 91, timestamp: '2026-05-19T09:00:00Z', category: 'Revenue', actionable: false },
  { id: 'ins-011', type: 'risk', title: 'Smart Contract Upgrade Risk', description: 'Aave protocol v3.2 upgrade scheduled - treasury has $1.8M USDC at risk during migration', impact: 62, confidence: 75, timestamp: '2026-05-18T22:00:00Z', category: 'Crypto', actionable: true },
  { id: 'ins-012', type: 'anomaly', title: 'Reconciliation Discrepancy', description: 'End-of-day cash position shows $47,300 unexplained variance in EUR account', impact: 35, confidence: 80, timestamp: '2026-05-18T23:30:00Z', category: 'Operations', actionable: true },
  { id: 'ins-013', type: 'opportunity', title: 'Volume Discount Re negotiation', description: 'Transaction volume growth of 32% YoY qualifies for Stripe custom pricing tier - estimated 18% savings', impact: 55, confidence: 72, timestamp: '2026-05-18T11:00:00Z', category: 'Cost Optimization', actionable: true },
  { id: 'ins-014', type: 'trend', title: 'BTC Treasury Performance', description: 'Bitcoin holdings returned 42% YTD - outperforming all other asset classes in portfolio', impact: 75, confidence: 95, timestamp: '2026-05-17T20:00:00Z', category: 'Crypto', actionable: false },
  { id: 'ins-015', type: 'risk', title: 'Counterparty Downgrade Risk', description: 'Credit Suisse CDS spread widening 200bps in 2 weeks - review counterparty limits', impact: 80, confidence: 82, timestamp: '2026-05-17T14:00:00Z', category: 'Credit Risk', actionable: true },
  { id: 'ins-016', type: 'opportunity', title: 'Gold Hedging Strategy', description: 'Gold/crypto correlation breaking down - 60-day rolling correlation dropped to 0.12 from 0.65', impact: 50, confidence: 68, timestamp: '2026-05-16T16:00:00Z', category: 'Hedging', actionable: true },
  { id: 'ins-017', type: 'anomaly', title: 'Unusual Failed Transaction Rate', description: 'Failed SEPA transactions spiked to 4.8% vs 0.3% normal - possible systemic issue', impact: 48, confidence: 93, timestamp: '2026-05-16T11:00:00Z', category: 'Operations', actionable: true },
  { id: 'ins-018', type: 'trend', title: 'Custody Fee Trend', description: 'Custody fees increased 15% QoQ due to asset appreciation - consider renegotiation', impact: 30, confidence: 88, timestamp: '2026-05-15T10:00:00Z', category: 'Cost Optimization', actionable: true },
  { id: 'ins-019', type: 'opportunity', title: 'Corporate Bond Ladder Construction', description: 'Current yield curve favors building 1-3-5 year ladder with 47bps spread pickup vs money market', impact: 68, confidence: 82, timestamp: '2026-05-15T08:00:00Z', category: 'Fixed Income', actionable: true },
  { id: 'ins-020', type: 'risk', title: 'Liquidity Coverage Ratio Decline', description: 'LCR dropped from 145% to 128% approaching internal minimum of 125%', impact: 85, confidence: 94, timestamp: '2026-05-14T09:00:00Z', category: 'Liquidity', actionable: true },
  { id: 'ins-021', type: 'trend', title: 'Enterprise Tier Growth', description: 'Enterprise subscriptions grew 28% in Q2 - now represents 45% of total ARR', impact: 90, confidence: 96, timestamp: '2026-05-14T07:00:00Z', category: 'Revenue', actionable: false },
  { id: 'ins-022', type: 'anomaly', title: 'Odd-Lot Bond Trade Pattern', description: 'Multiple $97,000 bond trades just below reporting threshold at same counterparty', impact: 72, confidence: 85, timestamp: '2026-05-13T16:30:00Z', category: 'AML', actionable: true },
];
