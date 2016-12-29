export default class TextFileParser {
    static supportedMimeTypes = [
        "text/.*" // Can use regex
    ];

    static parse(file, callback, encoding = 'UTF-8') {
        let reader = new FileReader();
        reader.onload = function (fileLoadEvent) {
            let data = fileLoadEvent.target.result;
            callback(data);
        };
        reader.readAsText(file, encoding);
    }

    static isParseable(filetype) {
        return this.supportedMimeTypes.find(mimeType => filetype.match("^"+mimeType+"$")); // Full text match
    }
}
