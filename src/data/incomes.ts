// ============================================================
// Mock Incomes — 9 records
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { Income } from "@/types/finance";

export const INCOMES: Income[] = [
  {
    id: "i001",
    title: "নতুন সদস্য ভর্তি ফি (৫ জন)",
    amount: 500,
    category: "membership_fee",
    date: "2024-09-01",
    receivedBy: "m003",
    paymentMethod: "cash",
    remarks: "সেপ্টেম্বর ২০২৪ নতুন সদস্য নিবন্ধন ফি",
  },
  {
    id: "i002",
    title: "বিশেষ দান — স্থানীয় ব্যবসায়ী",
    amount: 25000,
    category: "donation",
    date: "2024-08-20",
    receivedBy: "m001",
    paymentMethod: "bank_transfer",
    donorName: "হাজী মোহাম্মদ ইলিয়াস",
    remarks: "স্বাস্থ্য শিবির পরিচালনার জন্য বিশেষ অনুদান",
  },
  {
    id: "i003",
    title: "এফডিআর মুনাফা",
    amount: 15600,
    category: "investment_return",
    date: "2024-07-15",
    receivedBy: "m003",
    paymentMethod: "bank_transfer",
    remarks: "ইসলামী ব্যাংক এফডিআর মেয়াদ শেষে মুনাফা",
  },
  {
    id: "i004",
    title: "বিলম্ব চাঁদা জরিমানা",
    amount: 450,
    category: "fine",
    date: "2024-07-01",
    receivedBy: "m003",
    paymentMethod: "cash",
    remarks: "বকেয়া চাঁদার বিপরীতে জরিমানা সংগ্রহ",
  },
  {
    id: "i005",
    title: "ক্রীড়া প্রতিযোগিতা স্পনসর",
    amount: 8000,
    category: "donation",
    date: "2024-02-18",
    receivedBy: "m001",
    paymentMethod: "cash",
    donorName: "আল-আমিন ট্রেডার্স",
    remarks: "বার্ষিক ক্রীড়া প্রতিযোগিতায় স্পনসরশিপ",
  },
  {
    id: "i006",
    title: "সদস্য ভর্তি ফি (৩ জন)",
    amount: 300,
    category: "membership_fee",
    date: "2024-01-15",
    receivedBy: "m003",
    paymentMethod: "cash",
  },
  {
    id: "i007",
    title: "জমি বিক্রয় লাভ",
    amount: 45000,
    category: "investment_return",
    date: "2024-06-10",
    receivedBy: "m001",
    paymentMethod: "bank_transfer",
    remarks: "সংগঠনের জমি থেকে আয় (আংশিক বিক্রয়)",
  },
  {
    id: "i008",
    title: "বার্ষিক মিলাদ অনুষ্ঠান দান",
    amount: 12000,
    category: "donation",
    date: "2024-03-20",
    receivedBy: "m001",
    paymentMethod: "cash",
    donorName: "এলাকাবাসী (বিভিন্ন ব্যক্তি)",
    remarks: "বার্ষিক মিলাদ ও দোয়া অনুষ্ঠানে সংগৃহীত দান",
  },
  {
    id: "i009",
    title: "সাংস্কৃতিক অনুষ্ঠান টিকিট বিক্রয়",
    amount: 3200,
    category: "other",
    date: "2024-04-05",
    receivedBy: "m003",
    paymentMethod: "cash",
    remarks: "বার্ষিক সাংস্কৃতিক অনুষ্ঠানের প্রবেশমূল্য",
  },
];

export const getTotalIncome = (): number =>
  INCOMES.reduce((sum, i) => sum + i.amount, 0);
