import { useQuery } from "@tanstack/react-query";
import { partnerApi } from "modules/partners/api/partner-api";
import { partnerList } from "modules/partners/api/constant";

export const useGetData = (queryOptions: {
  pageSize: number;
  page: number;
  sortModel: Object;
}) => {
  return useQuery({
    queryKey: [partnerList, queryOptions],
    queryFn: () => partnerApi.getAll(queryOptions),
    keepPreviousData: true,
    retry: false,
  });
};
