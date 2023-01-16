import {
  PartnerModel,
  UpdateData,
} from "modules/partners/models/partner-models";
import { httpClient } from "modules/common/api/http-client";

export const partnerApi = {
  async getAll(queryOptions: {
    pageSize: number;
    page: number;
    sortModel: Object;
  }) {
    const { data } = await httpClient.get(`partners`, {
      params: {
        countPerPage: queryOptions.pageSize,
        page: queryOptions.page,
      },
    });
    return data;
  },
  async getByID(id: number) {
    const { data } = await httpClient.get(`partners/${id}`);
    return data;
  },
  async create(newPartner: PartnerModel) {
    return httpClient.post(`partners`, newPartner);
  },

  async update(updateData: UpdateData) {
    return httpClient.put(`partners/${updateData.id}`, updateData.partner);
  },

  async changeStatus(updateData: { id: number; status: string }) {
    return httpClient.put(`partners/status`, {
      id: updateData.id,
      status: updateData.status,
    });
  },
};
