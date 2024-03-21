const ipcRenderer = window.ipc;

const setButton = document.getElementById("btnCalculate");
setButton.addEventListener("click", async () => {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operator = document.getElementById("operator").value;
  try {
    if (isNaN(num1) || isNaN(num2)) {
      document.getElementById("display").value = "Please enter both numbers.";
      return;
    }
    const result = await ipcRenderer.invoke("calculate", {
      num1,
      num2,
      operator,
    });
    document.getElementById("display").value = result;
  } catch (error) {
    document.getElementById("display").value = `Error: ${error.message}`;
  }
});

const clearButton = document.getElementById("btnClear");
clearButton.addEventListener("click", () => {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("operator").value = "";
});

const continueButton = document.getElementById("btnContinue");
continueButton.addEventListener("click", () => {
  document.getElementById("num1").value =
    document.getElementById("display").value;
  document.getElementById("num2").value = "";
  document.getElementById("operator").value = "";
  document.getElementById("display").value = "";
});
