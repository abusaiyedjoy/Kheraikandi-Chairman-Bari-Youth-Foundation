// ============================================================
// Mock Notices — 12 records
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { Notice } from "@/types/notice";

export const NOTICES: Notice[] = [
  {
    id: "n001",
    title: "Flood Emergency Fund Notice",
    titleBn: "বন্যা জরুরি তহবিল নোটিশ",
    content:
      "Due to the ongoing flood situation, the organization has decided to create an emergency fund. All active members are requested to contribute an additional ৳200 voluntarily. The funds will be used for flood relief distribution.",
    contentBn:
      "চলমান বন্যা পরিস্থিতির কারণে সংগঠন একটি জরুরি তহবিল গঠনের সিদ্ধান্ত নিয়েছে। সকল সক্রিয় সদস্যকে স্বেচ্ছায় অতিরিক্ত ৳২০০ প্রদানের অনুরোধ করা হচ্ছে। অর্থ বন্যা ত্রাণ বিতরণে ব্যবহৃত হবে।",
    category: "urgent",
    priority: "urgent",
    audience: "all",
    publishedDate: "2024-09-08",
    publishedBy: "m001",
    publishedByName: "মোহাম্মদ রফিকুল ইসলাম",
    isPinned: true,
    tags: ["বন্যা", "জরুরি", "তহবিল"],
  },
  {
    id: "n002",
    title: "Annual General Meeting Notice",
    titleBn: "বার্ষিক সাধারণ সভার নোটিশ",
    content:
      "The Annual General Meeting of KCBYW will be held on August 15, 2024 at 3:00 PM at the Community Center. All members are required to attend. Agenda: Financial report, new committee formation, and annual plan discussion.",
    contentBn:
      "আগামী ১৫ আগস্ট ২০২৪ তারিখে বিকাল ৩টায় কমিউনিটি সেন্টারে বার্ষিক সাধারণ সভা অনুষ্ঠিত হবে। সকল সদস্যকে উপস্থিত থাকতে অনুরোধ করা হচ্ছে। আলোচ্য বিষয়: আর্থিক প্রতিবেদন, নতুন কমিটি গঠন ও বার্ষিক পরিকল্পনা।",
    category: "meeting",
    priority: "high",
    audience: "all",
    publishedDate: "2024-08-01",
    expiresDate: "2024-08-15",
    publishedBy: "m002",
    publishedByName: "মো. জাহাঙ্গীর আলম",
    isPinned: false,
    tags: ["সভা", "বার্ষিক"],
  },
  {
    id: "n003",
    title: "September Contribution Collection",
    titleBn: "সেপ্টেম্বর মাসের চাঁদা সংগ্রহ",
    content:
      "Members are informed that September 2024 monthly contributions (৳100) will be collected from September 1–10. Please pay your contribution to the Treasurer (KYK-003) on time to avoid any late fees.",
    contentBn:
      "সকল সদস্যকে জানানো যাচ্ছে যে সেপ্টেম্বর ২০২৪ মাসের মাসিক চাঁদা (৳১০০) ১–১০ সেপ্টেম্বরের মধ্যে সংগ্রহ করা হবে। বিলম্ব জরিমানা এড়াতে নির্ধারিত সময়ের মধ্যে কোষাধ্যক্ষকে (KYK-003) চাঁদা প্রদান করুন।",
    category: "financial",
    priority: "medium",
    audience: "member",
    publishedDate: "2024-09-01",
    expiresDate: "2024-09-10",
    publishedBy: "m003",
    publishedByName: "মো. আব্দুর রহমান",
    isPinned: false,
    tags: ["চাঁদা", "সেপ্টেম্বর"],
  },
  {
    id: "n004",
    title: "FDR Maturity Notice",
    titleBn: "এফডিআর মেয়াদপূর্তি নোটিশ",
    content:
      "The FDR with Sonali Bank has matured on July 20, 2024. The total amount received including profit is ৳115,600. The committee has decided to redistribute the profit of ৳15,600 among active members.",
    contentBn:
      "সোনালী ব্যাংকের এফডিআর গত ২০ জুলাই ২০২৪ তারিখে মেয়াদ পূর্ণ হয়েছে। মুনাফাসহ মোট প্রাপ্ত অর্থ ৳১,১৫,৬০০। কমিটি সিদ্ধান্ত নিয়েছে মুনাফা ৳১৫,৬০০ সক্রিয় সদস্যদের মধ্যে বিতরণ করা হবে।",
    category: "financial",
    priority: "high",
    audience: "all",
    publishedDate: "2024-07-22",
    publishedBy: "m003",
    publishedByName: "মো. আব্দুর রহমান",
    isPinned: false,
    tags: ["এফডিআর", "মুনাফা", "বিনিয়োগ"],
  },
  {
    id: "n005",
    title: "Winter Clothes Drive Announcement",
    titleBn: "শীতবস্ত্র বিতরণ কর্মসূচি ঘোষণা",
    content:
      "The organization will conduct a winter clothes distribution program on December 1, 2024. Members are requested to donate old but usable winter clothes. Collection points will be announced soon.",
    contentBn:
      "সংগঠন আগামী ১ ডিসেম্বর ২০২৪ তারিখে শীতবস্ত্র বিতরণ কর্মসূচি পরিচালনা করবে। সদস্যদের পুরনো কিন্তু ব্যবহারযোগ্য শীতবস্ত্র দান করার অনুরোধ করা হচ্ছে। সংগ্রহ পয়েন্ট শীঘ্রই জানানো হবে।",
    category: "activity",
    priority: "medium",
    audience: "all",
    publishedDate: "2024-09-15",
    publishedBy: "m001",
    publishedByName: "মোহাম্মদ রফিকুল ইসলাম",
    isPinned: false,
    tags: ["শীত", "বস্ত্র", "দান"],
  },
  {
    id: "n006",
    title: "New Member Registration Open",
    titleBn: "নতুন সদস্য নিবন্ধন উন্মুক্ত",
    content:
      "KCBYW is accepting new member applications for the 2024-25 session. Eligible persons aged 18–40 from Kheraikandi village are encouraged to apply. Registration fee: ৳100. Contact the Secretary for details.",
    contentBn:
      "KCBYW ২০২৪-২৫ সেশনের জন্য নতুন সদস্য আবেদন গ্রহণ করছে। খিরাইকান্দি গ্রামের ১৮-৪০ বছর বয়সী যোগ্য ব্যক্তিদের আবেদন করতে উৎসাহিত করা হচ্ছে। নিবন্ধন ফি: ৳১০০। বিস্তারিত জানতে সাধারণ সম্পাদকের সাথে যোগাযোগ করুন।",
    category: "general",
    priority: "medium",
    audience: "all",
    publishedDate: "2024-09-01",
    expiresDate: "2024-10-31",
    publishedBy: "m002",
    publishedByName: "মো. জাহাঙ্গীর আলম",
    isPinned: false,
    tags: ["সদস্য", "নিবন্ধন"],
  },
  {
    id: "n007",
    title: "Member Suspension Notice",
    titleBn: "সদস্যপদ স্থগিত নোটিশ",
    content:
      "The committee has decided to suspend the membership of KYK-020 (Md. Anisur Rahman) for non-payment of contributions for 6+ months and violation of organization rules. This suspension is effective immediately.",
    contentBn:
      "কমিটি সিদ্ধান্ত নিয়েছে যে ৬+ মাসের চাঁদা না দেওয়া এবং সংগঠনের নিয়ম লঙ্ঘনের কারণে KYK-020 (মো. আনিসুর রহমান)-এর সদস্যপদ স্থগিত করা হয়েছে। এই স্থগিতাদেশ তাৎক্ষণিকভাবে কার্যকর।",
    category: "general",
    priority: "high",
    audience: "admin",
    publishedDate: "2024-06-01",
    publishedBy: "m001",
    publishedByName: "মোহাম্মদ রফিকুল ইসলাম",
    isPinned: false,
    tags: ["সদস্যপদ", "স্থগিত"],
  },
  {
    id: "n008",
    title: "Committee Meeting — Financial Review",
    titleBn: "কমিটি সভা — আর্থিক পর্যালোচনা",
    content:
      "An emergency committee meeting will be held on September 20, 2024 at 7:00 PM to review the organization's financial position and discuss the investment strategy for Q4 2024.",
    contentBn:
      "সংগঠনের আর্থিক অবস্থান পর্যালোচনা এবং ২০২৪ সালের শেষ প্রান্তিকের বিনিয়োগ কৌশল নিয়ে আলোচনার জন্য ২০ সেপ্টেম্বর ২০২৪ রাত ৭টায় জরুরি কমিটি সভা অনুষ্ঠিত হবে।",
    category: "meeting",
    priority: "high",
    audience: "admin",
    publishedDate: "2024-09-18",
    publishedBy: "m001",
    publishedByName: "মোহাম্মদ রফিকুল ইসলাম",
    isPinned: true,
    tags: ["কমিটি", "সভা", "আর্থিক"],
  },
  {
    id: "n009",
    title: "Eid Welfare Distribution",
    titleBn: "ঈদ উপলক্ষে কল্যাণ বিতরণ",
    content:
      "This Eid-ul-Adha, the organization will distribute welfare packages to 10 poor families. The packages include essential food items and a cash grant of ৳500 per family. Distribution will take place on the day before Eid.",
    contentBn:
      "এই ঈদুল আযহায়, সংগঠন ১০টি দরিদ্র পরিবারকে কল্যাণ প্যাকেজ বিতরণ করবে। প্যাকেজে নিত্যপ্রয়োজনীয় খাদ্যসামগ্রী এবং প্রতি পরিবারকে ৳৫০০ নগদ সহায়তা অন্তর্ভুক্ত। ঈদের আগের দিন বিতরণ করা হবে।",
    category: "activity",
    priority: "medium",
    audience: "all",
    publishedDate: "2024-05-15",
    expiresDate: "2024-05-20",
    publishedBy: "m002",
    publishedByName: "মো. জাহাঙ্গীর আলম",
    isPinned: false,
    tags: ["ঈদ", "কল্যাণ", "দরিদ্র"],
  },
  {
    id: "n010",
    title: "Investment Profit Distribution",
    titleBn: "বিনিয়োগ মুনাফা বিতরণ",
    content:
      "The profit of ৳15,600 from the matured Sonali Bank FDR will be distributed among 24 active members. Each member will receive ৳650. Please collect your share from the Treasurer by August 31, 2024.",
    contentBn:
      "সোনালী ব্যাংক এফডিআর থেকে প্রাপ্ত মুনাফা ৳১৫,৬০০ ২৪ জন সক্রিয় সদস্যের মধ্যে বিতরণ করা হবে। প্রতি সদস্য ৳৬৫০ পাবেন। ৩১ আগস্ট ২০২৪-এর মধ্যে কোষাধ্যক্ষের কাছ থেকে আপনার ভাগ সংগ্রহ করুন।",
    category: "financial",
    priority: "high",
    audience: "member",
    publishedDate: "2024-07-25",
    expiresDate: "2024-08-31",
    publishedBy: "m003",
    publishedByName: "মো. আব্দুর রহমান",
    isPinned: false,
    tags: ["মুনাফা", "বিতরণ", "এফডিআর"],
  },
  {
    id: "n011",
    title: "Health Camp — Volunteer Registration",
    titleBn: "স্বাস্থ্য শিবির — স্বেচ্ছাসেবক নিবন্ধন",
    content:
      "Volunteers are needed for the upcoming Free Medical Camp on July 20. Members interested in volunteering should register with the Secretary by July 15. Volunteers will receive refreshments.",
    contentBn:
      "২০ জুলাইয়ের আসন্ন বিনামূল্যে চিকিৎসা ক্যাম্পের জন্য স্বেচ্ছাসেবক প্রয়োজন। স্বেচ্ছাসেবক হতে ইচ্ছুক সদস্যরা ১৫ জুলাইয়ের মধ্যে সাধারণ সম্পাদকের কাছে নিবন্ধন করুন। স্বেচ্ছাসেবকরা খাবার পাবেন।",
    category: "activity",
    priority: "medium",
    audience: "member",
    publishedDate: "2024-07-01",
    expiresDate: "2024-07-15",
    publishedBy: "m002",
    publishedByName: "মো. জাহাঙ্গীর আলম",
    isPinned: false,
    tags: ["স্বেচ্ছাসেবক", "স্বাস্থ্য", "ক্যাম্প"],
  },
  {
    id: "n012",
    title: "Overdue Contribution Warning",
    titleBn: "বকেয়া চাঁদা পরিশোধ সতর্কতা",
    content:
      "Members with overdue contributions (3+ months) are urgently requested to clear their dues by September 30, 2024. Failure to do so may result in membership suspension as per organization rules.",
    contentBn:
      "যেসব সদস্যের ৩+ মাসের চাঁদা বকেয়া রয়েছে, তাদের ৩০ সেপ্টেম্বর ২০২৪-এর মধ্যে বকেয়া পরিশোধের জন্য জরুরি অনুরোধ করা হচ্ছে। অন্যথায় সংগঠনের নিয়ম অনুযায়ী সদস্যপদ স্থগিত হতে পারে।",
    category: "financial",
    priority: "urgent",
    audience: "member",
    publishedDate: "2024-09-10",
    expiresDate: "2024-09-30",
    publishedBy: "m003",
    publishedByName: "মো. আব্দুর রহমান",
    isPinned: false,
    tags: ["বকেয়া", "চাঁদা", "সতর্কতা"],
  },
];

export const getPinnedNotices = (): Notice[] =>
  NOTICES.filter((n) => n.isPinned);

export const getActiveNotices = (): Notice[] => {
  const today = new Date().toISOString().split("T")[0];
  return NOTICES.filter((n) => !n.expiresDate || n.expiresDate >= today);
};

export const getNoticesByCategory = (category: Notice["category"]): Notice[] =>
  NOTICES.filter((n) => n.category === category);
