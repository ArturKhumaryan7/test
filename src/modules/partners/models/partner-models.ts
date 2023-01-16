export enum PartnerStatus {
  Active = "active",
  InActive = "inactive",
}
export interface PartnerModel {
  id: number;
  name: string;
  contactEmail: string;
  contactPersonName: string;
  targetRegions: string[];
  creationDate: string;
  status: PartnerStatus;
}

export interface UpdateData {
  id: number;
  partner: PartnerModel;
}
