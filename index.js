const canvas = document.getElementById("canvas");

/* const fetchContentSvg = (src) => {
    fetch(src)
        .then(response => response.text())
        .then(response => {
            console.log(response)
            return response;
            
            //console.log(response)
            const span = document.createElement('span');
            span.innerHTML = response;

             const inlineSvg = span.getElementsByTagName('svg')[0];
            const new_div = document.createElement("div");
            new_div.setAttribute("class", "div-item-svg");
            new_div.append(inlineSvg)
            image.parentNode.replaceChild(new_div, image);
            return true;
        })
} */

function create_qr_code(data_url) {
    const qrCode = new QRCodeStyling({
        width: 50,
        height: 50,
        type: "svg",
        data: data_url,
        qrOptions: { typeNumber: 0, mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
        dotsOptions: { type: "extra-rounded", color: "#000000" },
        backgroundOptions: { color: "#ffffff" },
        cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
        cornersDotOptions: { type: "dot", color: "#000000" },
    });
    let new_div = document.createElement("div");
    canvas.append(new_div);

    let model_svg = document.getElementById('model_svg')
    let local_qr_code_svg = document.getElementById('qr_code_svg');
    local_qr_code_svg.innerHTML = ""


    qrCode.append(local_qr_code_svg);
    qr_code_svg.setAttributeNS(null, "x", "11")
    qr_code_svg.setAttributeNS(null, "y", "45")

    //qrCode.download({ name: data_url.split("?")[1] , extension: "svg" });
}

function create_el(el, value = "", className = "", data_custom = "") {
    const new_el = document.createElement(el);
    if (value != "") new_el.setAttribute("value", value)
    if (className != "") new_el.setAttribute("class", className)
}


const btn_create = document.getElementById('btn_create');
btn_create.addEventListener('click', async () => {
    // fecth json
    const res = await fetch('files/db.json');
    const data = await res.json();
    const arr_clubes = data.clubes;
    const src_model_img = "src/imgs/modelo_frente.svg"

    // to through datas
    let contador_div_group = 1;
    const fisrt_div_group = document.createElement("div");
    fisrt_div_group.setAttribute("class", "group")
    fisrt_div_group.setAttribute("div-group", '1')
    let actually_div_group = fisrt_div_group;

    arr_clubes.forEach(async (element, index, arr) => {
        let id = element.id;
        let nome = element.nome;
        let campo = element.campo;

        
        if (contador_div_group % 10 == 0) {
            actually_div_group = document.createElement("div")
            // criar nova divgroup
        } else {
            // divgroup continua igual
        }

        canvas.append()

        let text_model_svg = await fetch(src_model_img).then(response => response.text())
        console.log(resp)

        //let url = encodeURI(`https://ranking.camporionline.org/validate?id=${id}&clube=${nome.replace(" ", "_")}&campo=${campo}`);
        //create_qr_code(url)

        //let new_img = document.createElement("img");
        //new_img.setAttribute("src", "src/imgs/modelo_frente.svg");
        //canvas.append(new_img)




        // pegar o modelo sgv
        // alterar o nome
        // alterar o qr code
    });




});