let pyodide;
async function initPyodide() {
            pyodide = await loadPyodide();
            console.log("Pyodide loaded successfully");
        }
        initPyodide();

        // Function to execute the Python code
        async function executeCode() {
            if (!pyodide) {
                document.getElementById('output').value = "Please wait for Pyodide to load...";
                return;
            }

            const input = document.getElementById('input').value;
            const outputElement = document.getElementById('output');

            try {
                // Create a new output stream to capture print statements
                await pyodide.runPythonAsync(`
                    import io, sys
                    sys.stdout = io.StringIO()
                `);

                // Run the user's code
                await pyodide.runPythonAsync(input);

                // Get the captured output
                const stdout = await pyodide.runPythonAsync(`
                    sys.stdout.getvalue()
                `);

                // Reset stdout
                await pyodide.runPythonAsync(`
                    sys.stdout = sys.__stdout__
                `);

                // Display the result
                outputElement.value = stdout;

            } catch (error) {
                outputElement.value = `Error: ${error.message}`;
            }
}