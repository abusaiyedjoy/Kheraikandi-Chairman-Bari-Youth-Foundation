// ============================================================
// Finance Types — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export type ContributionStatus = "paid" | "pending" | "overdue" | "waived";
export type TransactionType = "income" | "expense";
export type ExpenseCategory =
  | "office"
  | "event"
  | "maintenance"
  | "welfare"
  | "administrative"
  | "emergency"
  | "other";
export type IncomeCategory =
  | "membership_fee"
  | "donation"
  | "investment_return"
  | "fine"
  | "other";
export type InvestmentType = "land" | "fdr" | "business" | "loan" | "other";
export type InvestmentStatus = "active" | "matured" | "withdrawn" | "cancelled";
export type PaymentMethod = "cash" | "bkash" | "nagad" | "bank_transfer" | "other";

// Monthly contribution from a member
export interface Contribution {
  id: string;
  memberId: string;
  memberName: string;
  amount: number; // total contribution
  savingsAmount: number; // 90% → member savings
  developmentAmount: number; // 10% → development fund
  month: number; // 1–12
  year: number;
  paymentDate: string; // ISO date string
  status: ContributionStatus;
  paymentMethod: PaymentMethod;
  collectedBy: string; // member id of collector (usually treasurer)
  remarks?: string;
}

// General ledger transaction
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO date string
  referenceId?: string; // link to contribution/expense/income id
  recordedBy: string; // member id
  balance: number; // running balance after transaction
  remarks?: string;
}

// Organization expense
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  approvedBy: string; // member id of approver
  paidBy: string; // member id who paid
  paymentMethod: PaymentMethod;
  receipt?: string; // receipt url or number
  remarks?: string;
}

// Organization income
export interface Income {
  id: string;
  title: string;
  amount: number;
  category: IncomeCategory;
  date: string;
  receivedBy: string; // member id
  paymentMethod: PaymentMethod;
  donorName?: string; // for donations
  remarks?: string;
}

// Investment record
export interface Investment {
  id: string;
  title: string;
  type: InvestmentType;
  investedAmount: number;
  currentValue?: number;
  expectedReturn?: number;
  investmentDate: string;
  maturityDate?: string;
  status: InvestmentStatus;
  managedBy: string; // member id
  description: string;
  profits?: InvestmentProfit[];
}

// Profit from an investment
export interface InvestmentProfit {
  id: string;
  investmentId: string;
  investmentTitle: string;
  amount: number;
  profitDate: string;
  distributedToMembers: boolean;
  perMemberShare?: number;
  remarks?: string;
}

// Refund to a member (savings refund on exit/request)
export interface Refund {
  id: string;
  memberId: string;
  memberName: string;
  refundType: "full_savings" | "partial_savings" | "development_share";
  requestedAmount: number;
  approvedAmount: number;
  requestDate: string;
  approvalDate?: string;
  paymentDate?: string;
  approvedBy: string;
  paymentMethod: PaymentMethod;
  status: "pending" | "approved" | "paid" | "rejected";
  reason: string;
  remarks?: string;
}

// Development fund snapshot
export interface DevelopmentFund {
  totalCollected: number;
  totalSpent: number;
  currentBalance: number;
  lastUpdated: string;
}

// Dashboard summary aggregation
export interface DashboardSummary {
  totalMembers: number;
  activeMembers: number;
  totalSavings: number;
  totalDevelopmentFund: number;
  totalInvestments: number;
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  thisMonthContributions: number;
  pendingContributions: number;
  overdueContributions: number;
  investmentProfits: number;
  lastUpdated: string;
}
