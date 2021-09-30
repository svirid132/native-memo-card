export async function loadInfo(name) {
    try {
        const infoResponse = await fetch(`https://ru.wikipedia.org/api/rest_v1/page/summary/${name}`);
        const infoData = await infoResponse.json();
        if (!infoResponse.ok) {
            throw new Error("error load");
        }
        const endSeparateIndex = infoData.originalimage.source.lastIndexOf("/");
        const information = ({name: infoData.title, description: infoData.extract_html});

        const originalImg = {
            name: infoData.originalimage.source.substr(endSeparateIndex + 1),
            width: infoData.originalimage.width,
            height: infoData.originalimage.height
        }
        const ratio = originalImg.width > originalImg.height ? "width" : "height"; 
        const imgResponse = 
            await fetch(`https://ru.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=imageinfo&titles=File:${originalImg.name}&iiprop=timestamp%7Cuser%7Curl&iiurl${ratio}=1280`);
        const imgData = await imgResponse.json();
        if (!imgResponse.ok) {
            throw new Error("error load");
        }
        let imageData = null;
        for (const property in imgData.query.pages) {
            if (Number.isInteger(Number(property))) {
                const imageInfo = imgData.query.pages[property].imageinfo[0];
                imageData = {
                    src: imageInfo.thumburl,
                    width: imageInfo.thumbwidth,
                    height: imageInfo.thumbheight,
                };
                break;
            }
        }

        return {
            ...information,
            image: imageData, 
        }

    } catch (e) {
        return e;
    }   
}