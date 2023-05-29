const list_container = document.getElementById("content");
const list_value = [
    {
        gambar: '../assets/images/jalan_rusak.jpg',
        pelapor: 'John Doe',
        lokasi: '0.5284080788324474, 101.443372...',
        status_penanganan: 'done',
        tanggal: '23/05/2023',
    },
    {
        gambar: '../assets/images/jalan_rusak.jpg',
        pelapor: 'John Doe',
        lokasi: '0.5284080788324474, 101.443372...',
        status_penanganan: 'done',
        tanggal: '23/05/2023',
    },
    {
        gambar: '../assets/images/jalan_rusak.jpg',
        pelapor: 'John Doe',
        lokasi: '0.5284080788324474, 101.443372...',
        status_penanganan: 'done',
        tanggal: '23/05/2023',
    }
]

function reportList(list_value){
    return "<section id=\"card\">" + list_value.map(list_values => `
    <div class="list-card-box">
        <div>
            <img src="${list_values.gambar}">
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
        <div style="margin-left: 20px">
            <p>Tanggal: ${list_values.tanggal}</p>
            <div id="list-button">
                <a id="button-2" href="./detail.html">Lihat Detail</a>
                <a id="button-1" href="./edit.html">Ubah Laporan</a>
            </div>
        </div>
    </div>`).join('') + "</section>";
}

list_container.innerHTML= reportList(list_value);