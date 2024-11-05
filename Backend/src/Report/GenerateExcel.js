import ExcelJS from 'exceljs'

export const generateExcel = async (req, res) => {
    const { header:headers, servers } = req.body

    console.log('Request: ', req.body);

    console.log('HEADERS: ', headers);
    console.log('Servers: ', servers);
    
    
    try {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('ReporteServidor')

        //Headers
        const headerRow = worksheet.addRow(headers)
        headerRow.eachCell((cell) => {
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
        })

        //Data Rows
        servers.forEach(server => {
            const row = headers.map(header => server[header] || '')
            const dataRow = worksheet.addRow(row)
            dataRow.eachCell((cell) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center', shrinkToFit:true}
            })
        })

        headers.forEach((header, index) => {
            worksheet.getColumn(index + 1).width = 20
        })

        const buffer = await workbook.xlsx.writeBuffer();
        console.log('Buffer: ', buffer);

        //Save
        res.setHeader('Content-Disposition', 'attachment; filename=ReporteServidor.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (err) {
        console.error('Error generating Excel:', err);
        res.status(500).json({ message: 'Error generating Excel report' });
    }
}