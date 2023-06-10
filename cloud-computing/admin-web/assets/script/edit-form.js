const laporan = document.getElementById("card");
const urlParams = new URLSearchParams(window.location.search);
const idDetails = urlParams.get('id');
let arr = [];
const url = 'http://localhost:5000/report/'.concat(idDetails);

fetch(url)
.then((response) => response.json())
.then((data) => {
    arr.push(data.datas[0]);

    laporan.innerHTML= laporan_data(arr);

    $('#button-1').on('click', ()=>{
        const lokasi = document.getElementsByName('lokasi')[0].value
        const keterangan = document.getElementsByName('keterangan')[0].value
        const foto = document.getElementsByName('foto')[0].value
        const tingkat_kerusakan = document.getElementsByName('tingkat_kerusakan')[0].value
        const status_penanganan = document.getElementsByName('status_penanganan')[0].value
        const status_laporan = document.getElementsByName('status_laporan')[0].value
        
        fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                lokasi: lokasi,
                keterangan: keterangan,
                foto: foto,
                tingkat_kerusakan: tingkat_kerusakan,
                status_penanganan: status_penanganan,
                status_laporan: status_laporan
            })
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.responseCode);
            window.location.href = "./index.html";
        })
    })
});

function laporan_data(laporan_value){
    return "<article id=\"card-box\">" + laporan_value.map(laporan_values => `
        <table>
            <form id="edit" method="POST" action="${url}">
                <tr>
                    <td><label for="pelapor">Pelapor</label></td>
                    <td>: <input type="text" name="pelapor" value="${laporan_values.pelapor}" disabled></td>
                </tr>

                <tr>
                    <td><label for="lokasi">Lokasi</label></td>
                    <td>: <input type="text" name="lokasi" value="${laporan_values.lokasi}" disabled></td>
                </tr>

                <tr>
                    <td><label for="keterangan">Keterangan</label></td>
                    <td>: <input type="text" name="keterangan" value="${laporan_values.keterangan}" disabled></td>
                </tr>

                <tr>
                    <td><label for="tingkat-kerusakan">Tingkat Kerusakan</label></td>
                    <td>: <input type="text" name="tingkat_kerusakan" value="${laporan_values.tingkat_kerusakan}" disabled></td>
                </tr>
                
                
                <tr>
                    <td><label for="foto">Foto</label></td>
                    <td>: <input type="text" id="foto" name="foto" value="${laporan_values.foto}" disabled></td>
                </tr>

                <tr>
                    <td><label for="status_penanganan">Status Penanganan</label></td>
                    <td>: <select name="status_penanganan">
                            <option value="belum ditangani">Belum ditangani</option>
                            <option value="sedang ditangani">Sedang ditangani</option>
                            <option value="selesai">Selesai</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td><label for="status_laporan">Status Laporan</label></td>
                    <td>: <select name="status_laporan">
                            <option value="disapprove">Disapprove</option>
                            <option value="approve">Approve</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td><label for="tanggal_laporan">Tanggal Laporan</label></td>
                    <td>: <input type="text" name="tanggal_laporan" value="${laporan_values.tanggal_laporan}" disabled></td>
                </tr>

                <tr>
                    <td><label for="tanggal-edit">Tanggal Edit</label></td>
                    <td>: <input type="text" name="tanggal_edit" value="${laporan_values.tanggal_edit}" disabled></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <a id="button-2" href="./index.html">Kembali</a>
                        <button id="button-1" type="submit">Simpan</button>
                    </td>
                </tr>
            </form>
        </table>`).join('') + "</article>";
    }