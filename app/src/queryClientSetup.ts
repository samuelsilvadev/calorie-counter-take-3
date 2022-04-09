import { QueryClient } from "react-query";

const TEN_MINUTES = 60 * 1000 * 10;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TEN_MINUTES,
    },
  },
});
