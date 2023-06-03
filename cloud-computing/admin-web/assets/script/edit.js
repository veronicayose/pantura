const laporan = document.getElementById("card");
const laporan_value = [
    {
        gambar: '../assets/images/jalan_rusak.jpg',
        pelapor: 'John Doe',
        lokasi: '0.5284080788324474, 101.443372...',
        keterangan: 'lorem ipsum',
        tingkat_kerusakan: 'sedang',
        status_penanganan: 'done',
        status_laporan: 'approve',
        tanggal_laporan: '23/05/2023',
        tanggal_edit: '23/05/2023',
    }
]

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
                    <td>: <input type="text" id="foto" name="foto" value="${laporan_values.gambar}" disabled></td>
                </tr>

                <tr>
                    <td><label for="status-penanganan">Status Penanganan</label></td>
                    <td>: <select name="status-penanganan" id="status-penanganan" value="${laporan_values.status_penanganan}">
                            <option value="belum ditangani">Belum ditangani</option>
                            <option value="sedang ditangani">Sedang ditangani</option>
                            <option value="selesai">Selesai</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td><label for="status-laporan">Status Laporan</label></td>
                    <td>: <select name="status-laporan" id="status-laporan" value="${laporan_values.status_laporan}">
                            <option value="disapprove">Disapprove</option>
                            <option value="approve">Approve</option>
                        </select>
                    </td>
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
                        <button id="button-1" type="submit">Submit</button>
                    </td>
                </tr>
            </form>
        </table>`).join('') + "</article>";
    }

laporan.innerHTML= laporan_data(laporan_value);