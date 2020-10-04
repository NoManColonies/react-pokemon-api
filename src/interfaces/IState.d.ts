import { Dispatch, SetStateAction } from "react";

type IState<T> = [T, Dispatch<SetStateAction<T>>];

export default IState;
