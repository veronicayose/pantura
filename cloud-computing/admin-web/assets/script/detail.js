const laporan = document.getElementById("card");
const urlParams = new URLSearchParams(window.location.search);
const idDetails = urlParams.get('id');
let arr = [];
const url = 'http://localhost:5000/report/'.concat(idDetails);

fetch(url)
.then((response) => response.json())
.then((data) => {
    arr.push(data.datas[0]);
    laporan_data(arr);
    laporan.innerHTML= laporan_data(arr);
});

function laporan_data(laporan_value){
    return "<article id=\"card-box\">" + laporan_value.map(laporan_values => `
        <table>
            <form action="">
                <tr>
                    <td><label for="pelapor">Pelapor</label></td>
                    <td>: <input type="text" id="pelapor" name="pelapor" value="${laporan_values.pelapor}" disabled></td>
                </tr>

                <tr>
                    <td><label for="lokasi">Lokasi</label></td>
                    <td>: <input type="text" id="lokasi" name="lokasi" value="${laporan_values.lokasi}" disabled></td>
                </tr>

                <tr>
                    <td><label for="keterangan">Keterangan</label></td>
                    <td>: <input type="text" id="keterangan" name="keterangan" value="${laporan_values.keterangan}" disabled></td>
                </tr>

                <tr>
                    <td><label for="tingkat-kerusakan">Tingkat Kerusakan</label></td>
                    <td>: <input type="text" id="tingkat-kerusakan" name="tingkat-kerusakan" value="${laporan_values.tingkat_kerusakan}" disabled></td>
                </tr>
                
                
                <tr>
                    <td><label for="foto">Foto</label></td>
                    <td>: <input type="text" id="foto" name="foto" value="${laporan_values.foto}" disabled></td>
                </tr>

                <tr>
                    <td><label for="status-penanganan">Status Penanganan</label></td>
                    <td>: <input type="text" id="status-penanganan" name="status-penanganan" value="${laporan_values.status_penanganan}" disabled></td>
                </tr>

                <tr>
                    <td><label for="status-laporan">Status Laporan</label></td>
                    <td>: <input type="text" id="status-laporan" name="status-laporan" value="${laporan_values.status_laporan}" disabled></td>
                </tr>

                <tr>
                    <td><label for="tanggal-laporan">Tanggal Laporan</label></td>
                    <td>: <input type="text" id="tanggal-laporan" name="tanggal-laporan" value="${laporan_values.tanggal_laporan}" disabled></td>
                </tr>

                <tr>
                    <td><label for="tanggal-edit">Tanggal Edit</label></td>
                    <td>: <input type="text" id="tanggal-edit" name="tanggal-edit" value="${laporan_values.tanggal_edit}" disabled></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <a id="button-2" href="./index.html">Kembali</a>
                    </td>
                </tr>
            </form>
        </table>`).join('') + "</article>";
    }