
import {
  Home,
  Users,
  FileText,
  Search,
  Book,
  Bell,
  Phone,
  HelpCircle,
  Info,
  BarChart,
  Landmark,
  Gavel,
  ShieldCheck,
  Briefcase,
  Handshake,
  FileInput,
  Smile,
  Plane,
  GalleryVertical,
  Award,
  BookOpen,
  File,
  Library,
  Newspaper,
  CalendarDays,
  Megaphone,
  Star,
  Image as ImageIcon,
  Video,
  FilePenLine,
  MessageSquareQuote
} from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  {
    label: 'About Us',
    icon: Info,
    links: [
      { href: '/about', label: 'About the Mohtasib' },
      { href: '/success-stories', label: 'Success Stories' },
      { href: '/international-collaborations', label: 'Int. Collaborations' },
    ],
  },
  {
    label: 'Complaints & Redressal',
    icon: FileText,
    links: [
        { href: '/complaint', label: 'Lodge a Complaint' },
        { href: '/track-complaint', label: 'Track Complaint' },
        { href: '/daily-cause-list', label: 'Daily Cause List' },
        { href: '/judgments', label: 'Judgments' },
    ]
  },
  {
    label: 'Special Portals',
    icon: Star,
    links: [
        { href: '/childrens-complaints', label: 'Childrens Complaints' },
        { href: '/overseas-pakistanis', label: 'Overseas Pakistanis' },
    ]
  },
  {
    label: 'Resources',
    icon: Library,
    links: [
        { href: '/publications', label: 'Publications' },
        { href: '/tenders-and-vacancies', label: 'Tenders & Vacancies' },
        { href: '/rti', label: 'Right to Information' },
    ]
  },
    {
    label: 'Media & Updates',
    icon: Newspaper,
    links: [
        { href: '/media-gallery', label: 'Media Gallery' },
        { href: '/notifications', label: 'Notifications' },
    ]
  },
  { href: '/complaint-statistics', label: 'Statistics', icon: BarChart },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/contact', label: 'Contact Us', icon: Phone },
  { href: '/feedback', label: 'Feedback', icon: Megaphone },
];


export const faqs = [
  {
    id: 'faq1',
    question: 'What is the role of the Wafaqi Mohtasib?',
    answer:
      'The Wafaqi Mohtasib (Federal Ombudsman) is an independent institution that provides administrative justice to citizens by investigating and redressing their complaints against maladministration by Federal Government agencies.',
  },
  {
    id: 'faq2',
    question: 'Who can file a complaint?',
    answer:
      'Any individual, or a legal heir, or a registered society can file a complaint. The complaint can be made against any Federal Government agency, department, or official.',
  },
  {
    id: 'faq3',
    question: 'Is there any fee for filing a complaint?',
    answer:
      'No, there is no fee for filing a complaint with the Wafaqi Mohtasib. The service is completely free of charge to ensure accessibility for all citizens.',
  },
  {
    id: 'faq4',
    question: 'How long does it take to resolve a complaint?',
    answer:
      'The Wafaqi Mohtasib aims to resolve complaints within 60 days. Complex cases may take longer, but the complainant is kept informed about the progress.',
  },
    {
    id: 'faq5',
    question: 'What kind of complaints are not entertained?',
    answer:
      'Complaints related to matters pending in a court of law, matters related to the defense of Pakistan, external affairs, or service matters of government employees are generally not entertained.',
  },
];

export const publications = [
    { id: 'pub1', title: 'Annual Report 2023', category: 'Annual Reports', date: '2024-03-15', url: '#' },
    { id: 'pub2', title: 'Research Paper on Pension Reforms', category: 'Research Papers', date: '2023-11-20', url: '#' },
    { id: 'pub3', title: 'Establishment of the Office of Wafaqi Mohtasib (Ombudsman) Order, 1983', category: 'Laws & Regulations', date: '1983-01-24', url: '#' },
    { id: 'pub4', title: 'Annual Report 2022', category: 'Annual Reports', date: '2023-03-10', url: '#' },
    { id: 'pub5', title: 'The Freedom of Information Ordinance, 2002', category: 'Laws & Regulations', date: '2002-10-26', url: '#' },
    { id: 'pub6', title: 'Improving Service Delivery in Public Sector', category: 'Research Papers', date: '2022-09-01', url: '#' },
];

export const notifications = [
    { id: 'not1', title: 'Circular Regarding Timely Pension Disbursement', type: 'Notification', date: '2024-07-15', url: '#' },
    { id: 'not2', title: 'Wafaqi Mohtasib addresses seminar on administrative justice', type: 'Press Release', date: '2024-07-12', url: '#' },
    { id: 'not3', title: 'Public Hearing to be held in Karachi on 25th July', type: 'Notification', date: '2024-07-10', url: '#' },
    { id: 'not4', title: 'Mohtasib takes notice of delays in utility bill corrections', type: 'Press Release', date: '2024-07-08', url: '#' },
    { id: 'not5', title: 'New office timings for Ramazan', type: 'Notification', date: '2024-03-01', url: '#' },
    { id: 'not6', title: 'Awareness campaign launched in rural areas', type: 'Press Release', date: '2024-02-20', url: '#' },
];

export const successStories = [
    { id: 'ss1', title: 'Pensioner Receives 20 Years of Arrears', summary: 'An elderly pensioner, after years of struggle, received two decades worth of unpaid pension arrears within 45 days of filing a complaint with the Wafaqi Mohtasib.', date: '2024-05-20' },
    { id: 'ss2', title: 'Illegal Allotment of Plot Cancelled', summary: 'A citizen\'s complaint led to the cancellation of an illegally allotted commercial plot, which was then returned to the rightful government department for transparent auctioning.', date: '2024-04-15' },
    { id: 'ss3', title: 'Student Gets Unfairly Withheld Degree', summary: 'A university student who was unjustly denied their degree for over a year received it within a month after the Mohtasib\'s intervention.', date: '2024-03-10' },
    { id: 'ss4', title: 'Family Receives Death Grant After 5 Years', summary: 'The family of a deceased government employee was paid their entitled death grant, which had been pending for five years, following a directive from the Wafaqi Mohtasib.', date: '2024-02-25' },
];

export const regionalOffices = [
    { name: 'Head Office, Islamabad', address: 'Wafaqi Mohtasib Secretariat, 36-Constitution Avenue, G-5/2, Islamabad.', phone: '(051) 9217211', email: 'info@mohtasib.gov.pk', region: 'islamabad' },
    { name: 'Regional Office, Karachi', address: '4th Floor, Block C, FTC Building, Shahrah-e-Faisal, Karachi.', phone: '(021) 99207121', email: 'ro.khi@mohtasib.gov.pk', region: 'sindh' },
    { name: 'Regional Office, Lahore', address: 'State Life Building, 15-A Davis Road, Lahore.', phone: '(042) 99201021', email: 'ro.lhe@mohtasib.gov.pk', region: 'punjab' },
    { name: 'Regional Office, Peshawar', address: 'Banglow No.1, Shami Road, Peshawar Cantt.', phone: '(091) 9212877', email: 'ro.psh@mohtasib.gov.pk', region: 'kpk' },
    { name: 'Regional Office, Quetta', address: 'Zarghoon Road, Quetta Cantt.', phone: '(081) 9201582', email: 'ro.qta@mohtasib.gov.pk', region: 'balochistan' },
];

export const dailyCauseList = [
  { caseNo: 'WM-2024-12345', complainant: 'Ahmed Ali', agency: 'WAPDA', hearingTime: '10:00 AM' },
  { caseNo: 'WM-2024-23456', complainant: 'Fatima Khan', agency: 'Pakistan Post', hearingTime: '10:30 AM' },
  { caseNo: 'WM-2024-34567', complainant: 'Zubair Hussain', agency: 'PTCL', hearingTime: '11:00 AM' },
  { caseNo: 'WM-2024-45678', complainant: 'Ayesha Siddiqa', agency: 'Nadra', hearingTime: '11:30 AM' },
  { caseNo: 'WM-2024-56789', complainant: 'Imran Malik', agency: 'FBR', hearingTime: '12:00 PM' },
];

export const complaintStats = [
    { label: 'Received (YTD)', value: '125,342', change: '+15.2% from last year', icon: FileInput },
    { label: 'Resolved (YTD)', value: '119,876', change: '+18.1% from last year', icon: ShieldCheck },
    { label: 'In-Process', value: '5,466', change: '-5.7% from last month', icon: Users },
    { label: 'Resolution Rate', value: '95.6%', change: '+2.4% from last year', icon: Landmark },
];

export const monthlyStats = [
    { month: 'Jan', received: 430, resolved: 390 },
    { month: 'Feb', received: 450, resolved: 410 },
    { month: 'Mar', received: 520, resolved: 480 },
    { month: 'Apr', received: 480, resolved: 450 },
    { month: 'May', received: 550, resolved: 510 },
    { month: 'Jun', received: 530, resolved: 500 },
    { month: 'Jul', received: 580, resolved: 540 },
];

export const judgments = [
    { id: 'jud1', caseNo: 'WM-2023-54321', title: 'Landmark Decision on Pensioner Benefits', date: '2023-11-10', url: '#' },
    { id: 'jud2', caseNo: 'WM-2023-98765', title: 'Order Regarding Overseas Pakistani Property Dispute', date: '2023-09-22', url: '#' },
    { id: 'jud3', caseNo: 'WM-2022-11223', title: 'Ruling on University Degree Issuance Delay', date: '2022-12-05', url: '#' },
];

export const rtiDocs = [
    { id: 'rti1', title: 'Powers and Functions of the Wafaqi Mohtasib', category: 'Statutory Information', url: '#' },
    { id: 'rti2', title: 'Budget Allocation and Expenditure Report 2023-24', category: 'Financials', url: '#' },
    { id: 'rti3', title: 'Directory of Officers and Employees', category: 'Organizational', url: '#' },
    { id: 'rti4', title: 'Rules, Regulations, and Instructions', category: 'Legal Framework', url: '#' },
];

export const tenders = [
    { id: 'ten1', title: 'Tender for Procurement of IT Equipment', publishDate: '2024-07-15', deadline: '2024-08-05', url: '#' },
    { id: 'ten2', title: 'Expression of Interest for Media Campaign', publishDate: '2024-07-10', deadline: '2024-07-30', url: '#' },
];

export const vacancies = [
    { id: 'vac1', title: 'Investigation Officer (BS-17)', location: 'Islamabad', deadline: '2024-08-10', url: '#' },
    { id: 'vac2', title: 'Assistant Director (IT) (BS-17)', location: 'Head Office', deadline: '2024-08-10', url: '#' },
];

export const internationalAffiliations = [
    { name: 'International Ombudsman Institute (IOI)', description: 'A global organization of ombudsman institutions, promoting cooperation and development.', url: '#' },
    { name: 'Asian Ombudsman Association (AOA)', description: 'A regional body for ombudsman offices in Asia, facilitating knowledge sharing.', url: '#' },
    { name: 'Organisation of Islamic Cooperation Ombudsman Association (OICOA)', description: 'An association fostering collaboration among ombudsman institutions in OIC member states.', url: '#' },
];

export const mediaItems = [
  {
    id: 'media-1',
    title: 'Seminar on Administrative Justice',
    description: 'The Hon\'ble Wafaqi Mohtasib addressing a seminar in Islamabad.',
    type: 'Photo',
    date: '2024-07-15'
  },
  {
    id: 'media-2',
    title: 'Press Conference Highlights',
    description: 'Key points from the recent press conference on annual performance.',
    type: 'Video',
    date: '2024-07-12'
  },
  {
    id: 'media-3',
    title: 'Awareness Campaign Launch',
    description: 'Launch event for the nationwide awareness campaign on citizen rights.',
    type: 'Photo',
    date: '2024-07-10'
  },
  {
    id: 'media-4',
    title: 'International Collaboration Meeting',
    description: 'Meeting with delegates from the International Ombudsman Institute.',
    type: 'Photo',
    date: '2024-07-05'
  },
  {
    id: 'media-5',
    title: 'How to File a Complaint',
    description: 'An instructional video guiding users through the complaint process.',
    type: 'Video',
    date: '2024-07-01'
  },
   {
    id: 'media-6',
    title: 'Open Kachehri in Lahore',
    description: 'Photos from the public hearing session held in Lahore.',
    type: 'Photo',
    date: '2024-06-28'
  },
  {
    id: 'media-7',
    title: 'Visit to a Regional Office',
    description: 'The Mohtasib inspecting the facilities at the Peshawar regional office.',
    type: 'Photo',
    date: '2024-06-20'
  },
  {
    id: 'media-8',
    title: 'Annual Report 2023 Launch',
    description: 'Official launch ceremony of the Annual Report 2023.',
    type: 'Video',
    date: '2024-06-15'
  },
  {
    id: 'media-9',
    title: 'Children\'s Rights Symposium',
    description: 'A symposium focused on protecting the rights of children, with various stakeholders.',
    type: 'Photo',
    date: '2024-06-10'
  },
  {
    id: 'media-10',
    title: 'Training Workshop for Staff',
    description: 'Investigation officers attending a workshop on modern investigative techniques.',
    type: 'Photo',
    date: '2024-06-05'
  },
  {
    id: 'media-11',
    title: 'Interview with PTV World',
    description: 'The Wafaqi Mohtasib discusses the role of the institution on national television.',
    type: 'Video',
    date: '2024-05-30'
  },
  {
    id: 'media-12',
    title: 'One Window Desk Inauguration',
    description: 'Inauguration of the One Window Facilitation Desk at Sialkot Airport.',
    type: 'Photo',
    date: '2024-05-25'
  },
];

export const recentActivities = [
    {
      id: 'act-1',
      user: 'Ali Khan',
      description: 'Filed a new complaint (WM-20240726-54321).',
      time: '5 minutes ago',
      icon: FilePenLine
    },
    {
      id: 'act-2',
      user: 'Fatima Ahmed',
      description: 'Submitted feedback on the website.',
      time: '2 hours ago',
      icon: MessageSquareQuote
    },
    {
      id: 'act-3',
      user: 'System',
      description: 'A new publication "Annual Report 2023" was added.',
      time: '1 day ago',
      icon: BookOpen
    },
    {
      id: 'act-4',
      user: 'Zainab Omar',
      description: 'Filed a new complaint (WM-20240725-98765).',
      time: '2 days ago',
      icon: FilePenLine
    }
];
