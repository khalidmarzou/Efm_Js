function test(qte) {
  if (qte > 10) {
    return { color: "green", text: "disponible" };
  } else {
    return { color: "red", text: "indisponible" };
  }
}

console.log(test(11).color);
