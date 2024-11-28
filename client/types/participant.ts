export interface Participant {
    _id: string;
    name: string;
    email: string;
  }
  

  export type SortField = 'name' | 'email';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}