import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { constants } from "../constants";
import { useProviderStore } from "../store";
import { parseDataJson } from "../utils";

export default () => {
  const { provider } = useProviderStore();
  const { id, author } = useParams();

  const data = useQuery({
    queryKey: [author ?? "author", "answers"],
    enabled: "evaluateExpression" in provider!,
    queryFn: () =>
      provider
        ?.evaluateExpression(
          constants.realmPath,
          `GetAnswer("${id}", "${author}")`
        )
        .then(parseDataJson<string[]>),
  });

  return data;
};
