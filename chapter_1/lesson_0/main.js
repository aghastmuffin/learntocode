async function check(){
    document.getElementById("load").innerText = "Loading...";
    let pyodide = await loadPyodide();
    let a = document.getElementById("cin").value;
    if (a.length == 0) {
        document.getElementById("cout").innerText = "Please enter some code.";
        document.getElementById("load").innerText = "";
        return;
    }
    let pythonCode = `
def run_and_capture():
    import io
    import sys
    import contextlib
    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()
    with contextlib.redirect_stdout(buffer):
        ${a}
    sys.stdout = old_stdout
    return buffer.getvalue()
run_and_capture()
`;
    let r = await pyodide.runPythonAsync(pythonCode);
    document.getElementById("cout").innerText = r;
    document.getElementById("load").innerText = "";
}
window.onload = function() {
    var sourceElement = document.getElementById('dwnnotif');
    var targetElement = document.getElementById('spacer-1');
  
    var sourceHeight = window.getComputedStyle(sourceElement, null).getPropertyValue('height');
    targetElement.style.height = sourceHeight;
  }
function closeNotif(){
    document.getElementById("dwnnotif").remove();
    document.getElementById("spacer-1").style.display = "none";
}