export const addZerosToPoints = (points?: number, n = 2) => {
    const pointsStr: string = (points || "").toString();
    const templateSize = n - pointsStr.length;

    return templateSize > 0 ? `${[...Array(templateSize)].map(() => "0").join("")}${pointsStr}` : pointsStr;
};
