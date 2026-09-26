export const REQUEST_CATEGORIES = [
  'equipment',
  'electrical',
  'plumbing',
  'facility',
  'other',
] as const;
export type RequestCategory = (typeof REQUEST_CATEGORIES)[number];

export const REQUEST_STATUSES = ['open', 'resolved'] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
