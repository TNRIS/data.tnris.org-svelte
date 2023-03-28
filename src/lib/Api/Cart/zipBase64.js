/*
 * Generate a Base 64 encoded string from a zip file.
 * zip: A JSZip object
 * returns a Base64 string representation of the file.
 */
export const genZip64= (zip) => {
    return new Promise((resolve, reject) =>{
        let reader = new FileReader();

        try {
            zip.generateAsync({type:"blob"}).then(
            function(content) {
                reader.readAsDataURL(content);
                reader.onloadend = function() {
                    var base64data = reader.result;                
                    return resolve(base64data);
                }
            });
        } catch(err) {
            return reject("Problem uploading files.");
        }
    });
}