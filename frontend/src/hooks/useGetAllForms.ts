import { useQuery } from "@tanstack/react-query";
import { constants } from "../constants";
import { useProviderStore } from "../store";
import { CreatedForm } from "../type";
import { parseDataJson } from "../utils";

export default () => {
  const { provider } = useProviderStore();

  const data = useQuery({
    queryKey: ["forms"],
    enabled: !!provider && "evaluateExpression" in provider,
    queryFn: () =>
      provider
        ?.evaluateExpression(constants.realmPath, `GetForms()`)
        .then((res) =>
          parseDataJson<CreatedForm[]>(res).map((f) => ({
            ...f,
            openAt: f.openAt?.split(" ").slice(0, 2).join(" "),
            closeAt: f.closeAt?.split(" ").slice(0, 2).join(" "),
            createdAt: f.createdAt.split(" ").slice(0, 2).join(" "),
          }))
        ),
  });

  return data;
};
