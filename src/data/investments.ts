// ============================================================
// Mock Investments — 6 records with profits
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { Investment, InvestmentProfit } from "@/types/finance";

export const INVESTMENTS: Investment[] = [
  {
    id: "inv001",
    title: "ইসলামী ব্যাংক এফডিআর",
    type: "fdr",
    investedAmount: 150000,
    currentValue: 175600,
    expectedReturn: 25600,
    investmentDate: "2022-01-10",
    maturityDate: "2025-01-10",
    status: "active",
    managedBy: "m003",
    description: "ইসলামী ব্যাংক বাংলাদেশ লিমিটেডে ৩ বছরের মেয়াদি আমানত। বার্ষিক মুনাফা ৮.৫৩%।",
  },
  {
    id: "inv002",
    title: "খিরাইকান্দি কৃষি জমি",
    type: "land",
    investedAmount: 200000,
    currentValue: 280000,
    investmentDate: "2020-06-15",
    status: "active",
    managedBy: "m001",
    description: "খিরাইকান্দি গ্রামে ০.৫০ একর কৃষি জমি ক্রয়। বর্তমানে ভাড়ায় দেওয়া আছে।",
  },
  {
    id: "inv003",
    title: "স্থানীয় মুদির দোকান বিনিয়োগ",
    type: "business",
    investedAmount: 50000,
    currentValue: 62000,
    investmentDate: "2021-03-01",
    status: "active",
    managedBy: "m004",
    description: "এলাকার একটি মুদির দোকানে অংশীদার হিসেবে বিনিয়োগ। মাসিক লভ্যাংশ পাওয়া যায়।",
  },
  {
    id: "inv004",
    title: "সোনালী ব্যাংক সঞ্চয়পত্র",
    type: "fdr",
    investedAmount: 100000,
    currentValue: 115600,
    expectedReturn: 15600,
    investmentDate: "2022-07-20",
    maturityDate: "2024-07-20",
    status: "matured",
    managedBy: "m003",
    description: "সোনালী ব্যাংকে ২ বছরের সঞ্চয়পত্র। মেয়াদ শেষ হয়েছে।",
  },
  {
    id: "inv005",
    title: "সদস্য সুদমুক্ত ঋণ তহবিল",
    type: "loan",
    investedAmount: 80000,
    currentValue: 80000,
    investmentDate: "2023-01-01",
    status: "active",
    managedBy: "m003",
    description: "সদস্যদের জরুরি প্রয়োজনে সুদমুক্ত ঋণ প্রদানের জন্য তহবিল গঠন।",
  },
  {
    id: "inv006",
    title: "মৎস্য চাষ প্রকল্প",
    type: "business",
    investedAmount: 75000,
    currentValue: 45000,
    investmentDate: "2023-06-01",
    maturityDate: "2024-06-01",
    status: "withdrawn",
    managedBy: "m005",
    description: "স্থানীয় পুকুরে মৎস্য চাষ প্রকল্প। বন্যার কারণে ক্ষতিগ্রস্ত হয়ে আংশিক ফেরত।",
  },
];

export const INVESTMENT_PROFITS: InvestmentProfit[] = [
  {
    id: "ip001",
    investmentId: "inv002",
    investmentTitle: "খিরাইকান্দি কৃষি জমি",
    amount: 18000,
    profitDate: "2024-01-15",
    distributedToMembers: true,
    perMemberShare: 750,
    remarks: "জমির বার্ষিক ভাড়া আয় — সক্রিয় সদস্যদের মধ্যে বিতরণ",
  },
  {
    id: "ip002",
    investmentId: "inv003",
    investmentTitle: "স্থানীয় মুদির দোকান বিনিয়োগ",
    amount: 6000,
    profitDate: "2024-06-30",
    distributedToMembers: false,
    remarks: "অর্ধ-বার্ষিক লভ্যাংশ — পুনরায় বিনিয়োগ করা হবে",
  },
  {
    id: "ip003",
    investmentId: "inv004",
    investmentTitle: "সোনালী ব্যাংক সঞ্চয়পত্র",
    amount: 15600,
    profitDate: "2024-07-20",
    distributedToMembers: true,
    perMemberShare: 650,
    remarks: "মেয়াদ শেষে মুনাফা বিতরণ",
  },
  {
    id: "ip004",
    investmentId: "inv001",
    investmentTitle: "ইসলামী ব্যাংক এফডিআর",
    amount: 12800,
    profitDate: "2024-01-10",
    distributedToMembers: false,
    remarks: "দ্বিতীয় বছরের মুনাফা — উন্নয়ন তহবিলে যোগ",
  },
  {
    id: "ip005",
    investmentId: "inv002",
    investmentTitle: "খিরাইকান্দি কৃষি জমি",
    amount: 16000,
    profitDate: "2023-01-15",
    distributedToMembers: true,
    perMemberShare: 680,
    remarks: "পূর্ববর্তী বছরের জমির ভাড়া আয়",
  },
];

export const getActiveInvestments = (): Investment[] =>
  INVESTMENTS.filter((i) => i.status === "active");

export const getTotalInvestedAmount = (): number =>
  INVESTMENTS.reduce((sum, i) => sum + i.investedAmount, 0);

export const getTotalProfits = (): number =>
  INVESTMENT_PROFITS.reduce((sum, p) => sum + p.amount, 0);
