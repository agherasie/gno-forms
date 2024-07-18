import { constants } from "../constants";
import { CreatedForm } from "../type";
import { parseDataJson } from "../utils";
import { useProviderStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  const { provider } = useProviderStore();

  const data = useQuery({
    queryKey: [id ?? "id", "forms"],
    enabled: !!provider && "evaluateExpression" in provider,
    queryFn: () =>
      provider
        ?.evaluateExpression(constants.realmPath, `GetFormByID("${id}")`)
        .then(parseDataJson<CreatedForm>),
  });

  return data;
};
