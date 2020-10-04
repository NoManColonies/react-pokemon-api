import React, { useState, useCallback, useEffect } from "react";
import FetchAction from "./components/FetchAction";
import Response from "./interfaces/IAPIResponse";
import IAPIResult from "./interfaces/IAPIResult";
import IState from "./interfaces/IState";

const API_ENDPOINT: String = "https://pokeapi.co/api/v2/pokemon";

function App(): JSX.Element {
  const [fetchedData, setFetchedData]: IState<[]> = useState([]);
  const [isLoading, setIsLoading]: IState<boolean | undefined> = useState();
  const [nextSection, setNextSection]: IState<string> = useState("");
  const [prevSection, setPrevSection]: IState<string> = useState("");

  const handleAPICall = useCallback(async (section: string): Promise<
    Response
  > => {
    return fetch(`${API_ENDPOINT}${section}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    }).then((response: Response): Promise<Response> => response.json());
  }, []);

  const handleFetchAction = useCallback(
    async (section: string): Promise<void> => {
      setIsLoading(true);
      await handleAPICall(section)
        .then((response: Response): void => {
          setFetchedData(response.results ? response.results : []);
          setPrevSection(
            response.previous ? `?${response.previous.split("?")[1]}` : ""
          );
          setNextSection(
            response.next ? `?${response.next.split("?")[1]}` : ""
          );
        })
        .catch((e: Error): void => console.error(e))
        .finally((): void => setIsLoading(false));
    },
    [handleAPICall]
  );

  useEffect((): void => {
    handleFetchAction("/");
  }, [handleFetchAction]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {fetchedData && (
        <div>
          <h1>Pokedex</h1>
          {fetchedData.map((result: IAPIResult, index: number) => (
            <ul key={index}>
              <li>
                {index + 1}. {result.name}
              </li>
            </ul>
          ))}
        </div>
      )}
      {prevSection && (
        <FetchAction
          onClick={(): Promise<void> => handleFetchAction(prevSection)}
          children={"Prev"}
        />
      )}
      {nextSection && (
        <FetchAction
          onClick={(): Promise<void> => handleFetchAction(nextSection)}
          children={"Next"}
        />
      )}
    </div>
  );
}

export default App;
