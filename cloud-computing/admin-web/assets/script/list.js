let list_container = document.getElementById("content");
let arr = [];
let url;

const urlParams = new URLSearchParams(window.location.search);
const searchParams = urlParams.get('search');

if (searchParams === null || searchParams === ""){
    url ='http://localhost:5000/report/';
} else {
    url ='http://localhost:5000/report/search/'.concat(searchParams);
}
fetch(url)
.then((response) => response.json())
.then((data) => {
    for (let i = 0; i < data.datas.length; i++){
        arr.push(data.datas[i]);
    };
    reportList(arr);
    list_container.innerHTML= reportList(arr);
});


function reportList(arr){
    return "<section id=\"card\">" + arr.map(list_values => `
    <div class="list-card-box">
        <div class="list-child-card-box">
            <div>
                <img src="${list_values.foto}">
            </div>
            <div style="margin-left: 20px">
                <table>
                    <tr>
                        <td>Pelapor</td>
                        <td>:</td>
                        <td>${list_values.pelapor}</td>
                    </tr>
                    <tr>
                        <td>Lokasi</td>
                        <td>:</td>
                        <td>${list_values.lokasi}</td>
                    </tr>
                    <tr>
                        <td>Status Penanganan</td>
                        <td>:</td>
                        <td>${list_values.status_penanganan}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="margin-left: 20px">
            <p>Tanggal: ${list_values.tanggal}</p>
            <div id="list-button">
                <a id="button-2" href="./detail.html?id=${list_values.id}">Lihat Detail</a>
                <a id="button-1" href="./edit.html?id=${list_values.id}">Ubah Laporan</a>
            </div>
        </div>
    </div>`).join('') + "</section>";
}

