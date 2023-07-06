
const canvas = document.getElementById("canvas");

async function create_qr_code(data_url, index_file_svg) {
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
    qrCode.download({ name: index_file_svg, extension: "svg" });

    let svg_of_qr = await fetch(`images/name_tags/${index_file_svg}.svg`).then(res => res.text())
    
    svg_of_qr = svg_of_qr.toString().replace(`<image href="qr_code.svg" x="13" y="44" height="30" width="30" />`, `<image href="/images/qr_codes/${index_file_svg}.svg" x="13" y="44" height="30" width="30" />`)
    console.log(svg_of_qr)
    
    return svg_of_qr;
        

    new_svg_qr_code = document.getElementById("qr_code_svg");
    
    new_svg_qr_code.setAttributeNS(null, "x", "13");
    new_svg_qr_code.setAttributeNS(null, "y", "44");
    new_svg_qr_code.setAttributeNS(null, "height", "30");
    new_svg_qr_code.setAttributeNS(null, "width", "30");

    qrCode.append(new_svg_qr_code)
    canvas.append(new_div);


    /*let model_svg = document.getElementById('model_svg')
    let local_qr_code_svg = document.getElementById('qr_code_svg');
    local_qr_code_svg.innerHTML = ""
    qrCode.append(local_qr_code_svg); */
    
    return qrCode;
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
    //console.log(text_model_svg)
    canvas.append(fisrt_div_group)
    let actually_div_group = fisrt_div_group;
    
    arr_clubes.forEach(async (element, index, arr) => {
        let id = element.id;
        let nome = element.nome;
        let campo = element.campo;

        // alterar text_model 
        // qrcode
        let url = encodeURI(`https://ranking.camporionline.org/validate?id=${id}&clube=${nome.replace(" ", "_")}&campo=${campo}`);
        let qrCode = await create_qr_code(url, (index + 1));
        actually_div_group.innerHTML += qrCode;

        // nome

        
        if (contador_div_el > 0 && contador_div_el % 10 == 0) {
            contador_div_group++;
            contador_div_el = 1;
            actually_div_group = create_el("div", "", "group", "", [{ data: "id", value: contador_div_group }]);
            canvas.append(actually_div_group);
        } else {
            contador_div_el++;
        }

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

        //create_qr_code(url)

        //let new_img = document.createElement("img");
        //new_img.setAttribute("src", "images/modelo_frente.svg");
        //canvas.append(new_img)




        // pegar o modelo sgv
        // alterar o nome
        // alterar o qr code
    });




});