let pyodide;
let micropip;
/*Micropip init, The best wasm python experience that can be provided! */
async function initPyodide() {
    try {
        pyodide = await loadPyodide();
        console.log("Pyodide loaded successfully");
        
        // Load micropip
        await pyodide.loadPackage("micropip");
        micropip = pyodide.pyimport("micropip");
        console.log("Micropip loaded successfully");
    } catch (error) {
        console.error("Error initializing Pyodide:", error);
        throw error;
    }
}

async function install(packages) {
    if (!pyodide || !micropip) {
        throw new Error("Pyodide or micropip not initialized");
    }

    // Ensure packages is always an array
    const packageList = Array.isArray(packages) ? packages : [packages];

    try {
        // Install each package
        for (const pkg of packageList) {
            console.log(`Installing package: ${pkg}`);
            await micropip.install(pkg);
            console.log(`Successfully installed ${pkg}`);
        }
    } catch (error) {
        console.error("Error installing packages:", error);
        throw error;
    }
}

async function executeCode() {
    if (!pyodide) {
        document.getElementById('output').value = "Please wait for Pyodide to load...";
        initPyodide();
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

// Example usage:
// await initPyodide();
// await install(['numpy', 'pandas']);
// await executeCode();