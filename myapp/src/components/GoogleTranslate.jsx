import { useEffect } from "react";

export default function GoogleTranslate() {

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        textAlign: "right",
        padding: "10px"
      }}
    ></div>
  );
}