import Diagonal from "./diagonal";

let diagonal: Diagonal;

export const getDiagonal = () => {
    return diagonal;
}

export const setDiagonal = (_diagonal: Diagonal) => {
    diagonal = _diagonal;
}