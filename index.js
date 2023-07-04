
const canvas = document.getElementById("canvas");

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

function create_el(el, value = "", className = "", id = "", data_custom_array = []) {
    const new_el = document.createElement(el);
    if (value != "") new_el.setAttribute("value", value)
    if (className != "") new_el.setAttribute("class", className)
    if (id != "") new_el.setAttribute("id", id)

    data_custom_array.forEach(vl => {
        new_el.setAttribute(vl.data, vl.value);
    })
    return new_el;
}


const btn_create = document.getElementById('btn_create');
btn_create.addEventListener('click', async () => {
    // fecth json
    const res = await fetch('json/db.json');
    const data = await res.json();
    const arr_clubes = data.clubes;
    const src_model_img = "images/modelo_frente.svg"

    // to through datas
    let contador_div_group = 1;
    let contador_div_el = 0;

    const fisrt_div_group = create_el("div", "", "group", "", [{ data: "id", value: "1" }]);
    let text_model_svg = await fetch(src_model_img).then(response => response.text())
    canvas.append(fisrt_div_group)
    let actually_div_group = fisrt_div_group;
    
    arr_clubes.forEach(async (element, index, arr) => {
        let id = element.id;
        let nome = element.nome;
        let campo = element.campo;
        
        
        if (contador_div_el > 0 && contador_div_el % 10 == 0) {
            contador_div_group++;
            contador_div_el = 1;
            actually_div_group = create_el("div", "", "group", "", [{ data: "id", value: contador_div_group }]);
            canvas.append(actually_div_group);
        } else {
            contador_div_el++;
        }

        actually_div_group.innerHTML += text_model_svg;
        //console.log("El " + contador_div_el) //console.log("Gr " + contador_div_group)

                
        /* 
        let div_row1;
        let div_row2;
        if (contador_div_el == 1) {
            div_row1 = create_el("div", "", "div-row", [{ data: "div-row", value: "1" }])
            div_row2 = create_el("div", "", "div-row", [{ data: "div-row", value: "2" }])
            actually_div_group.append(div_row1)
            actually_div_group.append(div_row2)
        } */

        //let url = encodeURI(`https://ranking.camporionline.org/validate?id=${id}&clube=${nome.replace(" ", "_")}&campo=${campo}`);
        //create_qr_code(url)

        //let new_img = document.createElement("img");
        //new_img.setAttribute("src", "images/modelo_frente.svg");
        //canvas.append(new_img)




        // pegar o modelo sgv
        // alterar o nome
        // alterar o qr code
    });




});