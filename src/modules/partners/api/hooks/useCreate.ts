import { useMutation } from "@tanstack/react-query";
import { partnerApi } from "modules/partners/api/partner-api";

export const useCreate = () => {
  return useMutation(partnerApi.create);
};
