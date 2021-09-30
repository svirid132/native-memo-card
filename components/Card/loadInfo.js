export async function loadInfo(id, name) {

    const response = await fetch(`https://ru.wikipedia.org/api/rest_v1/page/summary/${name}`);
    const jsonData = await response.json();
    const data = {
        id: id,
        title: jsonData.title,
        image: {
            url: jsonData.originalimage.source,
            width: jsonData.originalimage.width,
            height: jsonData.originalimage.height,
        },
        text: jsonData.extract,
    };

    return data;
}
  