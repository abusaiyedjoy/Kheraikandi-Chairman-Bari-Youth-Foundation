// ============================================================
// Mock Refunds — 6 records
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { Refund } from "@/types/finance";

export const REFUNDS: Refund[] = [
  {
    id: "r001",
    memberId: "m014",
    memberName: "মো. সিরাজুল ইসলাম",
    refundType: "full_savings",
    requestedAmount: 2160,
    approvedAmount: 2160,
    requestDate: "2023-07-01",
    approvalDate: "2023-07-10",
    paymentDate: "2023-07-15",
    approvedBy: "m001",
    paymentMethod: "cash",
    status: "paid",
    reason: "সংগঠন থেকে স্বেচ্ছায় পদত্যাগ এবং সম্পূর্ণ সঞ্চয় ফেরত",
    remarks: "সদস্য স্বেচ্ছায় পদত্যাগ করেছেন। পূর্ণ সঞ্চয় ফেরত দেওয়া হয়েছে।",
  },
  {
    id: "r002",
    memberId: "m020",
    memberName: "মো. আনিসুর রহমান",
    refundType: "partial_savings",
    requestedAmount: 1000,
    approvedAmount: 800,
    requestDate: "2023-04-05",
    approvalDate: "2023-04-20",
    paymentDate: "2023-04-25",
    approvedBy: "m001",
    paymentMethod: "bkash",
    status: "paid",
    reason: "জরুরি চিকিৎসার জন্য আংশিক সঞ্চয় উত্তোলন",
    remarks: "চিকিৎসা খরচের জন্য আংশিক উত্তোলন অনুমোদিত।",
  },
  {
    id: "r003",
    memberId: "m008",
    memberName: "মো. রুবেল আহমেদ",
    refundType: "partial_savings",
    requestedAmount: 2000,
    approvedAmount: 1500,
    requestDate: "2024-03-10",
    approvalDate: "2024-03-20",
    paymentDate: "2024-03-22",
    approvedBy: "m001",
    paymentMethod: "cash",
    status: "paid",
    reason: "উচ্চশিক্ষা ভর্তির জন্য আংশিক সঞ্চয় উত্তোলন",
    remarks: "শিক্ষা সহায়তা হিসেবে আংশিক উত্তোলন।",
  },
  {
    id: "r004",
    memberId: "m012",
    memberName: "মো. মামুন রশীদ",
    refundType: "partial_savings",
    requestedAmount: 1500,
    approvedAmount: 1500,
    requestDate: "2024-07-15",
    approvalDate: "2024-07-25",
    approvedBy: "m001",
    paymentMethod: "bkash",
    status: "approved",
    reason: "বিবাহ উপলক্ষে আংশিক সঞ্চয় উত্তোলন",
  },
  {
    id: "r005",
    memberId: "m019",
    memberName: "মো. মনিরুল ইসলাম",
    refundType: "partial_savings",
    requestedAmount: 2500,
    approvedAmount: 2500,
    requestDate: "2024-09-05",
    approvedBy: "m001",
    paymentMethod: "cash",
    status: "pending",
    reason: "পরিবারের কৃষি কাজের জন্য জরুরি আংশিক সঞ্চয় উত্তোলন",
  },
  {
    id: "r006",
    memberId: "m016",
    memberName: "মো. আরিফুর রহমান",
    refundType: "partial_savings",
    requestedAmount: 3000,
    approvedAmount: 0,
    requestDate: "2024-08-01",
    approvalDate: "2024-08-10",
    approvedBy: "m001",
    paymentMethod: "cash",
    status: "rejected",
    reason: "ব্যক্তিগত ব্যবসায়িক উদ্দেশ্যে সঞ্চয় উত্তোলন",
    remarks: "নীতিমালা অনুযায়ী ব্যক্তিগত ব্যবসায়িক উদ্দেশ্যে সঞ্চয় উত্তোলন অনুমোদিত নয়।",
  },
];

export const getPendingRefunds = (): Refund[] =>
  REFUNDS.filter((r) => r.status === "pending");

export const getApprovedRefunds = (): Refund[] =>
  REFUNDS.filter((r) => r.status === "approved");

export const getTotalRefundsPaid = (): number =>
  REFUNDS.filter((r) => r.status === "paid").reduce((sum, r) => sum + r.approvedAmount, 0);
