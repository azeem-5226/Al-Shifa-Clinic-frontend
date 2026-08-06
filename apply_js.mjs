import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const originalDirs = ['app', 'components', 'lib'];
let allOriginalFiles = [];
originalDirs.forEach(dir => {
    allOriginalFiles = allOriginalFiles.concat(walk(dir));
});
allOriginalFiles.push('middleware.ts');

allOriginalFiles.forEach(originalFile => {
    if (originalFile.endsWith('.tsx') || originalFile.endsWith('.ts')) {
        const isTsx = originalFile.endsWith('.tsx');
        
        // Find corresponding js file in js_out
        // Replace first folder (e.g. 'app\...') with 'js_out\app\...'
        // Wait, esbuild might keep the folder structure exactly.
        const relPath = originalFile;
        const jsOutPath = path.join('js_out', relPath.replace(/\.tsx?$/, '.js'));
        
        if (fs.existsSync(jsOutPath)) {
            const newExt = isTsx ? '.jsx' : '.js';
            const newOriginalPath = originalFile.replace(/\.tsx?$/, newExt);
            
            // Move file
            fs.renameSync(jsOutPath, newOriginalPath);
            
            // Delete original TS file
            fs.unlinkSync(originalFile);
        }
    }
});

console.log('Conversion complete.');
