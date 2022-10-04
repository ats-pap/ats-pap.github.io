const path = require("path");
const fs = require("fs-extra");
const scss = require("node-sass");

module.exports = env => {
    // Checks if compiling in production or development mode
    var isProd = env.production === true;
    var resolveDir = isProd ? "build-prod" : "build-dev";

    // Build-path
    const outPath = path.resolve(__dirname, `build/${resolveDir}/`);
    // Source-path
    const inPath = path.resolve(__dirname, "src/");

    console.log("Compiling in mode "+(isProd ? "production" : "development"));
    
    console.log("...Removing previous build");
    // Removes the previous build (If it existed)
    if(fs.existsSync(outPath))
        fs.rmSync(outPath, { recursive: true, force: true });

    // Creates the directory
    fs.mkdirSync(outPath,{
        recursive: true
    });

    // Compiles the scss
    console.log("...Transpiling scss to css");
    const cssFileIn = path.resolve(inPath, "styles/Main.scss");
    const cssFileOut = path.resolve(outPath, "main.css");

    // Makes the resources-folder and then writes the css in there
    fs.writeFileSync(cssFileOut, scss.renderSync({
        file: cssFileIn,
        outFile: cssFileOut,
        outputStyle: "compact"
    }).css);


    // Copys resources
    console.log("...Copying resources");
    fs.copySync(path.resolve(inPath, "resources/"), path.resolve(outPath, "resources/"));

    // Copys the index.html file
    fs.copySync(path.resolve(inPath, "index.html"), path.resolve(outPath, "index.html"));
    
    console.log("...Compiling typescript into a single js file");
    // Packages the typescript-app
    return {
        mode: isProd ? "production" : "development",
        devtool: "cheap-source-map",
        entry: path.resolve(inPath, "scripts/Appentry.ts"),
        output: {
            path: outPath,
            filename: "webapp.js"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                path: false
            }
        }
    }
}