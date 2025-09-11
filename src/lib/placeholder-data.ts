import {
  Home,
  Users,
  FileText,
  Search,
  Book,
  Bell,
  Phone,
  HelpCircle,
  Info
} from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/complaint', label: 'File a Complaint', icon: FileText },
  { href: '/track-complaint', label: 'Track Complaint', icon: Search },
  { href: '/publications', label: 'Publications', icon: Book },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/contact', label: 'Contact Us', icon: Phone },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
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
    { id: 'not1', title: 'Circular Regarding Timely Pension Disbursement', type: 'Notification', date: '2024-07-15' },
    { id: 'not2', title: 'Wafaqi Mohtasib addresses seminar on administrative justice', type: 'Press Release', date: '2024-07-12' },
    { id: 'not3', title: 'Public Hearing to be held in Karachi on 25th July', type: 'Notification', date: '2024-07-10' },
    { id: 'not4', title: 'Mohtasib takes notice of delays in utility bill corrections', type: 'Press Release', date: '2024-07-08' },
    { id: 'not5', title: 'New office timings for Ramazan', type: 'Notification', date: '2024-03-01' },
    { id: 'not6', title: 'Awareness campaign launched in rural areas', type: 'Press Release', date: '2024-02-20' },
];

export const successStories = [
    { id: 'ss1', title: 'Pensioner Receives 20 Years of Arrears', summary: 'An elderly pensioner, after years of struggle, received two decades worth of unpaid pension arrears within 45 days of filing a complaint with the Wafaqi Mohtasib.' },
    { id: 'ss2', title: 'Illegal Allotment of Plot Cancelled', summary: 'A citizen\'s complaint led to the cancellation of an illegally allotted commercial plot, which was then returned to the rightful government department for transparent auctioning.' },
    { id: 'ss3', title: 'Student Gets Unfairly Withheld Degree', summary: 'A university student who was unjustly denied their degree for over a year received it within a month after the Mohtasib\'s intervention.' },
    { id: 'ss4', title: 'Family Receives Death Grant After 5 Years', summary: 'The family of a deceased government employee was paid their entitled death grant, which had been pending for five years, following a directive from the Wafaqi Mohtasib.' },
];

export const regionalOffices = [
    { name: 'Head Office, Islamabad', address: 'Wafaqi Mohtasib Secretariat, 36-Constitution Avenue, G-5/2, Islamabad.', phone: '(051) 9217211', email: 'info@mohtasib.gov.pk' },
    { name: 'Regional Office, Karachi', address: '4th Floor, Block C, FTC Building, Shahrah-e-Faisal, Karachi.', phone: '(021) 99207121', email: 'ro.khi@mohtasib.gov.pk' },
    { name: 'Regional Office, Lahore', address: 'State Life Building, 15-A Davis Road, Lahore.', phone: '(042) 99201021', email: 'ro.lhe@mohtasib.gov.pk' },
    { name: 'Regional Office, Peshawar', address: 'Banglow No.1, Shami Road, Peshawar Cantt.', phone: '(091) 9212877', email: 'ro.psh@mohtasib.gov.pk' },
    { name: 'Regional Office, Quetta', address: 'Zarghoon Road, Quetta Cantt.', phone: '(081) 9201582', email: 'ro.qta@mohtasib.gov.pk' },
];

export const dailyCauseList = [
  { caseNo: 'WM-2024-12345', complainant: 'Ahmed Ali', agency: 'WAPDA', hearingTime: '10:00 AM' },
  { caseNo: 'WM-2024-23456', complainant: 'Fatima Khan', agency: 'Pakistan Post', hearingTime: '10:30 AM' },
  { caseNo: 'WM-2024-34567', complainant: 'Zubair Hussain', agency: 'PTCL', hearingTime: '11:00 AM' },
  { caseNo: 'WM-2024-45678', complainant: 'Ayesha Siddiqa', agency: 'Nadra', hearingTime: '11:30 AM' },
  { caseNo: 'WM-2024-56789', complainant: 'Imran Malik', agency: 'FBR', hearingTime: '12:00 PM' },
];
