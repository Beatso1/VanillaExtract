const path = require('path');

// Module Data
const moduleData = {
    format54321: {
        packFilesPath: "modules/ReducedPumpkinBlur/",
        files: [
            {
                name: "pumpkinblur.png",
                inPackName: "pumpkinblur.png",
                path: "assets/minecraft/textures/misc"
            },
            {
                data: `{
                    "texture": {
                        "blur": true
                    }
                }`,
                inPackName: "pumpkinblur.png.mcmeta",
                path: "assets/minecraft/textures/misc"
            },
        ]
    },
};

// Module function
module.exports = async function(format, archive, bucket){
    // Change data based on format
    let formatData;
    if (format === 1 || format === 2 || format === 3 || format === 4 || format === 5) {
        formatData = moduleData.format54321
    } else {
        console.log('format not addressed');
        return;
    }

    // Add overlay metadata
    archive.append(formatData.files[1].data, {name: path.join(formatData.files[1].path, formatData.files[1].inPackName)});
    
    // Add pumpkin overlay
    await bucket.file(path.join("packfiles", formatData.packFilesPath, formatData.files[0].name)).download().then((data) => {
        archive.append(data[0], {name: path.join(formatData.files[0].path, formatData.files[0].inPackName)});
        return;
    });
    return;
}