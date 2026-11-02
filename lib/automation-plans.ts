/**
 * Shape of a plan produced by the AI Automation Lab, plus the example plans
 * shown when the live AI is unavailable or no description was entered.
 * The future /api/automation-lab route must return an object of type AutomationPlan.
 */

export type AutomationPlan = {
  name: string;
  items: { title: string; description: string }[];
  night: { time: string; text: string }[];
  gain: string;
};

export const businessTypes = [
  'Retail and shops',
  'Schools',
  'NGOs and associations',
  'Professional services',
  'Logistics and delivery',
  'Property and real estate',
] as const;

export type BusinessType = (typeof businessTypes)[number];

export const examplePlans: Record<BusinessType, AutomationPlan> = {
  'Retail and shops': {
    name: 'Retail and shops',
    items: [
      {
        title: 'One list for every order',
        description:
          'WhatsApp and website orders land in a single sheet with a status for each.',
      },
      {
        title: 'Low-stock alerts',
        description:
          'You get a message when an item runs low, before a customer finds it empty.',
      },
      {
        title: 'End-of-day summary',
        description:
          'A short recap of orders and payments, ready each morning.',
      },
    ],
    night: [
      {
        time: '7:00 pm',
        text: "The shop closes and the day's orders are tallied.",
      },
      {
        time: '10:00 pm',
        text: 'Customers who asked about an item get a follow-up message.',
      },
      {
        time: '2:00 am',
        text: 'Stock levels are checked and low items are flagged.',
      },
      { time: '6:00 am', text: 'Your summary and reorder list are waiting.' },
    ],
    gain: 'Customers hear back faster, and you start the day knowing exactly what needs restocking.',
  },
  Schools: {
    name: 'Schools',
    items: [
      {
        title: 'Admission enquiry replies',
        description:
          'Parents get an acknowledgement and the next steps as soon as they ask.',
      },
      {
        title: 'Fee reminders',
        description:
          'Polite reminders go out for approval instead of being typed one by one.',
      },
      {
        title: 'Attendance reports',
        description:
          'Daily records are compiled into a clear report for the office.',
      },
    ],
    night: [
      { time: '8:00 pm', text: 'New admission enquiries are acknowledged.' },
      {
        time: '11:00 pm',
        text: 'The unpaid-fee list is prepared for the bursar.',
      },
      {
        time: '3:00 am',
        text: 'Attendance records are compiled into a report.',
      },
      {
        time: '6:00 am',
        text: 'Reminders to parents are queued for your approval.',
      },
    ],
    gain: 'Parents get quicker answers and staff spend less time chasing and re-typing.',
  },
  'NGOs and associations': {
    name: 'NGOs and associations',
    items: [
      {
        title: 'Registration and confirmations',
        description: 'Event sign-ups are captured and confirmed automatically.',
      },
      {
        title: 'Member and donor follow-up',
        description:
          'New members and supporters get a timely, personal-sounding welcome.',
      },
      {
        title: 'Weekly activity report',
        description:
          "A draft summary for your board is prepared from the week's records.",
      },
    ],
    night: [
      { time: '9:00 pm', text: 'New registrations are confirmed by message.' },
      {
        time: '12:00 am',
        text: 'Dues and donations are matched to member records.',
      },
      {
        time: '4:00 am',
        text: "The week's activity is summarised for your board.",
      },
      { time: '7:00 am', text: 'Follow-ups to new members are ready to send.' },
    ],
    gain: 'Members feel looked after, and your small team spends its time on the mission instead of admin.',
  },
  'Professional services': {
    name: 'Professional services',
    items: [
      {
        title: 'Lead capture and triage',
        description:
          'Website enquiries are logged, acknowledged and sorted by service.',
      },
      {
        title: 'Appointment reminders',
        description:
          'Clients are reminded the day before, which cuts no-shows.',
      },
      {
        title: 'Invoice follow-up drafts',
        description: 'Overdue invoices are listed with a draft nudge for each.',
      },
    ],
    night: [
      {
        time: '8:00 pm',
        text: 'Website enquiries are logged and acknowledged.',
      },
      { time: '11:00 pm', text: "Tomorrow's appointments receive reminders." },
      {
        time: '2:00 am',
        text: 'Overdue invoices are listed with draft nudges.',
      },
      {
        time: '6:30 am',
        text: "Your day's agenda and new leads arrive in one message.",
      },
    ],
    gain: 'Prospects get a response straight away and you spend less of your day on follow-up.',
  },
  'Logistics and delivery': {
    name: 'Logistics and delivery',
    items: [
      {
        title: 'Delivery status updates',
        description:
          'Customers are told where their parcel is without calling the office.',
      },
      {
        title: 'Proof-of-delivery filing',
        description: 'Delivery confirmations are matched to orders and filed.',
      },
      {
        title: 'Delay and exception alerts',
        description:
          'Failed or late deliveries are flagged for the dispatch team.',
      },
    ],
    night: [
      {
        time: '8:00 pm',
        text: 'Customers receive updates on in-transit parcels.',
      },
      {
        time: '11:00 pm',
        text: 'Delivered parcels are matched with proof and filed.',
      },
      { time: '3:00 am', text: 'Delays and failed deliveries are flagged.' },
      {
        time: '6:00 am',
        text: 'A dispatch summary is ready for the morning team.',
      },
    ],
    gain: 'Fewer "where is my parcel" calls, and problems reach the right person before the customer notices.',
  },
  'Property and real estate': {
    name: 'Property and real estate',
    items: [
      {
        title: 'Viewing requests handled',
        description:
          'Enquirers are acknowledged and offered available viewing slots.',
      },
      {
        title: 'Listing enquiry follow-up',
        description:
          'Enquiries are sorted by interest so the warm ones get called first.',
      },
      {
        title: 'Rent reminders',
        description:
          'Tenants are reminded before the due date, and you see who has not paid.',
      },
    ],
    night: [
      {
        time: '8:00 pm',
        text: 'Viewing requests are acknowledged with slots offered.',
      },
      {
        time: '11:00 pm',
        text: 'Listing enquiries are sorted by level of interest.',
      },
      { time: '3:00 am', text: 'Upcoming rent due dates are checked.' },
      { time: '6:00 am', text: 'A summary of leads and reminders is ready.' },
    ],
    gain: 'Leads are answered while they are still interested, and rent follow-up stops depending on memory.',
  },
};

/** Runtime check for a response from the (future) AI route, so bad data never reaches the UI. */
export function isAutomationPlan(value: unknown): value is AutomationPlan {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  const rows = (a: unknown, keys: string[]) =>
    Array.isArray(a) &&
    a.length > 0 &&
    a.every(
      (r) =>
        typeof r === 'object' &&
        r !== null &&
        keys.every(
          (k) => typeof (r as Record<string, unknown>)[k] === 'string',
        ),
    );
  return (
    typeof v.name === 'string' &&
    typeof v.gain === 'string' &&
    rows(v.items, ['title', 'description']) &&
    rows(v.night, ['time', 'text'])
  );
}
