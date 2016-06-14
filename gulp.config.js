module.exports = function () {
    var config = {
        tsFiles: './server/**/*.ts',
        typingFiles: './server/typings/**/*.d.ts',
        outJsFiles: './build/**/*.js',
        outDir: './build/Release' // The location of production files for uploading
    };
    
    return config;
};