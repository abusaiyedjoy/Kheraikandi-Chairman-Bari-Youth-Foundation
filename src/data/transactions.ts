// ============================================================
// Mock Transactions — 42 general ledger entries
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { Transaction } from "@/types/finance";

export const TRANSACTIONS: Transaction[] = [
  // Sep 2024
  { id: "t001", type: "income", amount: 2500, description: "সেপ্টেম্বর ২০২৪ চাঁদা সংগ্রহ (২৫ সদস্য)", category: "contribution", date: "2024-09-10", recordedBy: "m003", balance: 198560, referenceId: "batch-sep-2024" },
  { id: "t002", type: "expense", amount: 600, description: "ইন্টারনেট বিল — সেপ্টেম্বর", category: "maintenance", date: "2024-09-01", recordedBy: "m003", balance: 196060, referenceId: "e012" },
  { id: "t003", type: "expense", amount: 12000, description: "বন্যা ত্রাণ বিতরণ", category: "emergency", date: "2024-09-10", recordedBy: "m003", balance: 184060, referenceId: "e009" },
  { id: "t004", type: "expense", amount: 7500, description: "জরুরি চিকিৎসা সহায়তা", category: "welfare", date: "2024-09-05", recordedBy: "m003", balance: 176560, referenceId: "e016" },
  // Aug 2024
  { id: "t005", type: "income", amount: 2500, description: "আগস্ট ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-08-08", recordedBy: "m003", balance: 196260, referenceId: "batch-aug-2024" },
  { id: "t006", type: "income", amount: 25000, description: "বিশেষ দান — হাজী মোহাম্মদ ইলিয়াস", category: "donation", date: "2024-08-20", recordedBy: "m001", balance: 218760, referenceId: "i002" },
  { id: "t007", type: "expense", amount: 3500, description: "বার্ষিক সভার আয়োজন", category: "event", date: "2024-08-15", recordedBy: "m003", balance: 215260, referenceId: "e001" },
  { id: "t008", type: "expense", amount: 1200, description: "অফিস সরবরাহ", category: "office", date: "2024-08-01", recordedBy: "m003", balance: 214060, referenceId: "e002" },
  // Jul 2024
  { id: "t009", type: "income", amount: 2500, description: "জুলাই ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-07-06", recordedBy: "m003", balance: 193760, referenceId: "batch-jul-2024" },
  { id: "t010", type: "income", amount: 15600, description: "এফডিআর মুনাফা — ইসলামী ব্যাংক", category: "investment_return", date: "2024-07-15", recordedBy: "m003", balance: 209360, referenceId: "i003" },
  { id: "t011", type: "income", amount: 115600, description: "সোনালী ব্যাংক এফডিআর মেয়াদপূর্তি", category: "investment_return", date: "2024-07-20", recordedBy: "m003", balance: 324960, referenceId: "inv004" },
  { id: "t012", type: "expense", amount: 8500, description: "স্বাস্থ্য শিবির পরিচালনা", category: "welfare", date: "2024-07-20", recordedBy: "m003", balance: 316460, referenceId: "e003" },
  { id: "t013", type: "expense", amount: 650, description: "সদস্য রেজিস্টার মুদ্রণ", category: "administrative", date: "2024-07-10", recordedBy: "m003", balance: 315810, referenceId: "e004" },
  { id: "t014", type: "expense", amount: 850, description: "বিদ্যুৎ বিল — জুলাই", category: "maintenance", date: "2024-07-05", recordedBy: "m003", balance: 314960, referenceId: "e005" },
  { id: "t015", type: "income", amount: 450, description: "বিলম্ব চাঁদা জরিমানা", category: "fine", date: "2024-07-01", recordedBy: "m003", balance: 315410, referenceId: "i004" },
  // Jun 2024
  { id: "t016", type: "income", amount: 2500, description: "জুন ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-06-08", recordedBy: "m003", balance: 160460, referenceId: "batch-jun-2024" },
  { id: "t017", type: "income", amount: 45000, description: "জমি বিক্রয় লাভ", category: "investment_return", date: "2024-06-10", recordedBy: "m001", balance: 205460, referenceId: "i007" },
  { id: "t018", type: "expense", amount: 2200, description: "বৃক্ষরোপণ কর্মসূচি", category: "event", date: "2024-06-05", recordedBy: "m003", balance: 158260, referenceId: "e006" },
  { id: "t019", type: "expense", amount: 1800, description: "রক্তদান শিবির আয়োজন", category: "event", date: "2024-06-15", recordedBy: "m003", balance: 156460, referenceId: "e007" },
  // May 2024
  { id: "t020", type: "income", amount: 2500, description: "মে ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-05-06", recordedBy: "m003", balance: 113260, referenceId: "batch-may-2024" },
  { id: "t021", type: "expense", amount: 5000, description: "ঈদ উপলক্ষে কল্যাণ সহায়তা", category: "welfare", date: "2024-05-20", recordedBy: "m003", balance: 110760, referenceId: "e008" },
  // Apr 2024
  { id: "t022", type: "income", amount: 2500, description: "এপ্রিল ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-04-05", recordedBy: "m003", balance: 115760, referenceId: "batch-apr-2024" },
  { id: "t023", type: "income", amount: 3200, description: "সাংস্কৃতিক অনুষ্ঠান টিকিট", category: "other", date: "2024-04-05", recordedBy: "m003", balance: 116460, referenceId: "i009" },
  { id: "t024", type: "expense", amount: 1500, description: "কম্পিউটার রক্ষণাবেক্ষণ", category: "maintenance", date: "2024-04-25", recordedBy: "m003", balance: 114960, referenceId: "e010" },
  { id: "t025", type: "expense", amount: 300, description: "পরিষ্কার অভিযান উপকরণ", category: "event", date: "2024-04-15", recordedBy: "m003", balance: 116160, referenceId: "act006" },
  { id: "t026", type: "expense", amount: 3800, description: "সাংস্কৃতিক অনুষ্ঠান খরচ", category: "event", date: "2024-04-05", recordedBy: "m003", balance: 112260, referenceId: "act008" },
  // Mar 2024
  { id: "t027", type: "income", amount: 2500, description: "মার্চ ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-03-06", recordedBy: "m003", balance: 112560, referenceId: "batch-mar-2024" },
  { id: "t028", type: "income", amount: 12000, description: "মিলাদ অনুষ্ঠান দান", category: "donation", date: "2024-03-20", recordedBy: "m001", balance: 124560, referenceId: "i008" },
  { id: "t029", type: "expense", amount: 4500, description: "যুব উদ্যোক্তা প্রশিক্ষণ", category: "event", date: "2024-03-15", recordedBy: "m003", balance: 110060, referenceId: "e011" },
  // Feb 2024
  { id: "t030", type: "income", amount: 2500, description: "ফেব্রুয়ারি ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-02-07", recordedBy: "m003", balance: 114560, referenceId: "batch-feb-2024" },
  { id: "t031", type: "income", amount: 8000, description: "ক্রীড়া প্রতিযোগিতা স্পনসর", category: "donation", date: "2024-02-18", recordedBy: "m001", balance: 120560, referenceId: "i005" },
  { id: "t032", type: "expense", amount: 6000, description: "বার্ষিক ক্রীড়া প্রতিযোগিতা", category: "event", date: "2024-02-20", recordedBy: "m003", balance: 114560, referenceId: "e013" },
  // Jan 2024
  { id: "t033", type: "income", amount: 300, description: "সদস্য ভর্তি ফি (৩ জন)", category: "membership_fee", date: "2024-01-15", recordedBy: "m003", balance: 113760, referenceId: "i006" },
  { id: "t034", type: "income", amount: 2500, description: "জানুয়ারি ২০২৪ চাঁদা সংগ্রহ", category: "contribution", date: "2024-01-06", recordedBy: "m003", balance: 113460, referenceId: "batch-jan-2024" },
  { id: "t035", type: "expense", amount: 3000, description: "সদস্য মৃত্যুতে কল্যাণ সহায়তা", category: "welfare", date: "2024-01-30", recordedBy: "m003", balance: 107760, referenceId: "e014" },
  { id: "t036", type: "expense", amount: 2800, description: "বার্ষিক প্রতিবেদন মুদ্রণ", category: "administrative", date: "2024-01-10", recordedBy: "m003", balance: 110760, referenceId: "e015" },
  { id: "t037", type: "expense", amount: 7200, description: "মেধাবী শিক্ষার্থী সহায়তা", category: "welfare", date: "2024-01-05", recordedBy: "m003", balance: 113560, referenceId: "act010" },
  // 2023 records
  { id: "t038", type: "income", amount: 2160, description: "সদস্য ফেরত — মো. সিরাজুল ইসলাম সঞ্চয়", category: "other", date: "2023-07-15", recordedBy: "m003", balance: 88400, referenceId: "r001" },
  { id: "t039", type: "income", amount: 16000, description: "জমির বার্ষিক ভাড়া আয় ২০২৩", category: "investment_return", date: "2023-01-15", recordedBy: "m003", balance: 72400, referenceId: "ip005" },
  { id: "t040", type: "income", amount: 500, description: "নতুন সদস্য ভর্তি ফি (৫ জন)", category: "membership_fee", date: "2024-09-01", recordedBy: "m003", balance: 199060, referenceId: "i001" },
  { id: "t041", type: "income", amount: 18000, description: "জমির বার্ষিক ভাড়া আয় ২০২৪", category: "investment_return", date: "2024-01-15", recordedBy: "m003", balance: 120960, referenceId: "ip001" },
  { id: "t042", type: "income", amount: 6000, description: "দোকান অংশীদারিত্ব লভ্যাংশ", category: "investment_return", date: "2024-06-30", recordedBy: "m003", balance: 162960, referenceId: "ip002" },
];

export const getTransactionsByType = (type: "income" | "expense"): Transaction[] =>
  TRANSACTIONS.filter((t) => t.type === type);

export const getCurrentBalance = (): number => {
  if (TRANSACTIONS.length === 0) return 0;
  return [...TRANSACTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].balance;
};

export const getTotalIncomeTx = (): number =>
  TRANSACTIONS.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);

export const getTotalExpenseTx = (): number =>
  TRANSACTIONS.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
