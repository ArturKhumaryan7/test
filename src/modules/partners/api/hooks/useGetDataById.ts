import { useQuery } from "@tanstack/react-query";
import { partnerApi } from "modules/partners/api/partner-api";
import { partnerById } from "modules/partners/api/constant";

export const useGetDataById = (id: number) => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [partnerById, id],
    queryFn: () => partnerApi.getByID(id),
    keepPreviousData: true,
    retry: false,
  });
  return { isLoading, error, data, isSuccess };
};
