const paragraphs = document.getElementsByTagName("p");
console.log("Parrafos en el documento " + paragraphs.length);

if (paragraphs.length > 0) {
  let paragraph = paragraphs[0];
  paragraph.innerText = "Bienvenidos al Bootcamp";
}
