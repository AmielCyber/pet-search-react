export function decodeHtmlEntityString(encodedStr: string | null): string {
    if (!encodedStr) {
        return "No description provided.";
    }
    const tempElement = document.createElement("div");
    tempElement.innerHTML = encodedStr;
    return tempElement.textContent as string;
}
